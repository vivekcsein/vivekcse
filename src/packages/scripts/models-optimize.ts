/**
 * models-optimize.ts — turns a raw designer GLB into a web-ready one.
 *
 *   bun run models:optimize                 # every registry model that has a raw file
 *   bun run models:optimize hero-workstation   # one model, by key (or file name)
 *
 * Reads  models-src/<file>      (raw export from Blender — keep these)
 * Writes public/models/<file>   (what the site serves)
 *
 * Per-model options live in model3d.config.ts (`optimize`). Steps:
 *   drop   delete materials you don't want (e.g. a baked-in backdrop plane)
 *   dedup  share identical meshes/materials
 *   flatten + join   merge everything that shares a material → few draw calls
 *   weld   merge duplicate vertices
 *   simplify   reduce triangles (meshoptimizer), if `simplify` is set
 *   quantize   smaller vertex data (plain glTF, no decoder needed)
 *   prune  remove anything now unused
 *
 * No Draco / Meshopt *compression* on purpose: it needs a WASM decoder at
 * runtime, which the strict CSP in secure-export.ts does not allow.
 */

import { existsSync } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { type Document, NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import {
  dedup,
  flatten,
  join,
  prune,
  quantize,
  simplify,
  textureCompress,
  weld,
} from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import { MODELS, type Model3D } from "../configs/model3d.config";
import { MODELS_DIR, syncManifest } from "./models-sync";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "models-src");

const stats = (doc: Document) => {
  let triangles = 0;
  let primitives = 0;
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      primitives += 1;
      const indices = prim.getIndices();
      const position = prim.getAttribute("POSITION");
      triangles += indices
        ? indices.getCount() / 3
        : (position?.getCount() ?? 0) / 3;
    }
  }
  return { triangles: Math.round(triangles), primitives };
};

const fmt = (n: number) => n.toLocaleString("en-US");
const mb = (bytes: number) => `${(bytes / 1_048_576).toFixed(2)} MB`;

const dropMaterials = (doc: Document, names: readonly string[]) => {
  if (names.length === 0) return 0;
  let removed = 0;
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const name = prim.getMaterial()?.getName() ?? "";
      if (names.includes(name)) {
        prim.dispose();
        removed += 1;
      }
    }
  }
  // Nodes whose mesh lost every primitive would be empty meshes.
  for (const node of doc.getRoot().listNodes()) {
    const mesh = node.getMesh();
    if (mesh && mesh.listPrimitives().length === 0) node.setMesh(null);
  }
  return removed;
};

const optimize = async (model: Model3D) => {
  const input = path.join(SRC_DIR, model.file);
  const output = path.join(MODELS_DIR, model.file);

  if (!existsSync(input)) {
    console.log(
      `  · ${model.key}: no raw file at models-src/${model.file} — skipped`,
    );
    return;
  }

  await MeshoptSimplifier.ready;
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
  const doc = await io.read(input);
  const before = stats(doc);
  const inBytes = (await stat(input)).size;
  const opts = model.optimize ?? {};

  const removed = dropMaterials(doc, opts.drop ?? []);

  const steps = [dedup(), flatten(), join(), weld()];
  if (opts.simplify !== undefined && opts.simplify < 1) {
    steps.push(
      simplify({
        simplifier: MeshoptSimplifier,
        ratio: opts.simplify,
        error: 0.001,
      }),
    );
  }
  steps.push(prune(), quantize());

  if (opts.maxTexture && doc.getRoot().listTextures().length > 0) {
    try {
      const sharp = (await import("sharp")).default;
      steps.push(
        textureCompress({
          encoder: sharp,
          resize: [opts.maxTexture, opts.maxTexture],
        }),
      );
    } catch {
      console.warn(
        "  ⚠ `sharp` not available — textures left at original size",
      );
    }
  }

  await doc.transform(...steps);

  await mkdir(MODELS_DIR, { recursive: true });
  await io.write(output, doc);

  const after = stats(doc);
  const outBytes = (await stat(output)).size;
  console.log(`  ✓ ${model.key}  (${model.file})`);
  console.log(`      size       ${mb(inBytes)} → ${mb(outBytes)}`);
  console.log(
    `      triangles  ${fmt(before.triangles)} → ${fmt(after.triangles)}`,
  );
  console.log(
    `      draw calls ${fmt(before.primitives)} → ${fmt(after.primitives)}`,
  );
  if (removed > 0)
    console.log(
      `      dropped    ${removed} primitive(s) (${(opts.drop ?? []).join(", ")})`,
    );
};

const run = async () => {
  const arg = process.argv[2];
  const targets = arg
    ? MODELS.filter((m) => m.key === arg || m.file === arg)
    : MODELS;

  if (targets.length === 0) {
    console.error(
      `No registry model matches "${arg}". Keys: ${MODELS.map((m) => m.key).join(", ")}`,
    );
    process.exit(1);
  }

  console.log("[models] optimizing");
  for (const model of targets) await optimize(model);

  await syncManifest(true);
  console.log("[models] manifest updated");
};

run().catch((error: unknown) => {
  console.error("[models] optimize failed:", error);
  process.exit(1);
});
