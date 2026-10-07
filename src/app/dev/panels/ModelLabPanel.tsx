"use client";

import { useState } from "react";
import { ClientModelViewer } from "@/components/features/models/ClientModelViewer";
import type { ModelOverrides } from "@/components/features/models/ModelViewer";
import {
  getModel,
  MODELS,
  type ModelAnimation,
  type ModelKey,
  type Vec3,
} from "@/packages/configs/model3d.config";
import { MODEL_FILES } from "@/packages/configs/models.manifest";
import { useCopyToClipboard } from "@/packages/hooks";

const ANIMATIONS: readonly ModelAnimation[] = [
  "none",
  "float",
  "spin",
  "float-spin",
  "entrance",
];

type Draft = {
  size: number;
  position: Vec3;
  rotation: Vec3;
  animation: ModelAnimation;
  fov: number;
  enabledEffects: readonly string[];
};

const initialDraft = (key: ModelKey): Draft => {
  const model = getModel(key);
  return {
    size: model.size,
    position: model.position,
    rotation: model.rotation,
    animation: model.animation,
    fov: model.camera.fov,
    enabledEffects: model.effects.map((e) => e.type),
  };
};

const round = (n: number) => Number(n.toFixed(3));
const fmt = (v: Vec3) => `[${v.map(round).join(", ")}]`;

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

const Slider = ({ label, value, min, max, step, onChange }: SliderProps) => (
  <label className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <input
      className="accent-primary"
      max={max}
      min={min}
      onChange={(e) => onChange(Number(e.target.value))}
      step={step}
      type="range"
      value={value}
    />
    <span className="text-right tabular-nums">{round(value)}</span>
  </label>
);

type VecSlidersProps = {
  label: string;
  value: Vec3;
  min: number;
  max: number;
  step: number;
  onChange: (value: Vec3) => void;
};

const VecSliders = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: VecSlidersProps) => (
  <>
    {(["x", "y", "z"] as const).map((axis, i) => (
      <Slider
        key={axis}
        label={`${label} ${axis}`}
        max={max}
        min={min}
        onChange={(n) => {
          const next: [number, number, number] = [...value];
          next[i] = n;
          onChange(next);
        }}
        step={step}
        value={value[i]}
      />
    ))}
  </>
);

/** One model under the lab. Remounted (via `key`) when the model changes. */
const Lab = ({ modelKey }: { modelKey: ModelKey }) => {
  const base = getModel(modelKey);
  const [draft, setDraft] = useState<Draft>(() => initialDraft(modelKey));
  const [interactive, setInteractive] = useState(true);
  const [stats, setStats] = useState(true);
  const { copy, copied } = useCopyToClipboard();

  const patch = (next: Partial<Draft>) => setDraft((d) => ({ ...d, ...next }));
  const fileInfo = MODEL_FILES.find((f) => f.file === base.file);

  const overrides: ModelOverrides = {
    size: draft.size,
    position: draft.position,
    rotation: draft.rotation,
    animation: draft.animation,
    camera: { ...base.camera, fov: draft.fov },
    effects: base.effects.filter((e) => draft.enabledEffects.includes(e.type)),
  };

  const snippet = `size: ${round(draft.size)},
position: ${fmt(draft.position)},
rotation: ${fmt(draft.rotation)},
animation: "${draft.animation}",
camera: { position: ${fmt(base.camera.position)}, fov: ${round(draft.fov)} },`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="h-136 overflow-hidden rounded-xl border border-border bg-card">
        <ClientModelViewer
          eager
          interactive={interactive}
          modelKey={modelKey}
          overrides={overrides}
          showStats={stats}
        />
      </div>

      <div className="space-y-4">
        <p className="rounded-lg border border-border bg-card p-3 text-sm">
          {fileInfo ? (
            <>
              <strong>GLB:</strong> {base.file} (
              {Math.round(fileInfo.bytes / 1024)} KB)
            </>
          ) : (
            <>
              <strong>Placeholder</strong> — drop <code>{base.file}</code> in{" "}
              <code>models-src/</code>, then{" "}
              <code>bun run models:optimize</code>.
            </>
          )}
        </p>

        <Slider
          label="size"
          max={8}
          min={0.5}
          onChange={(size) => patch({ size })}
          step={0.05}
          value={draft.size}
        />
        <Slider
          label="camera fov"
          max={80}
          min={20}
          onChange={(fov) => patch({ fov })}
          step={1}
          value={draft.fov}
        />
        <VecSliders
          label="position"
          max={3}
          min={-3}
          onChange={(position) => patch({ position })}
          step={0.05}
          value={draft.position}
        />
        <VecSliders
          label="rotation"
          max={Math.PI}
          min={-Math.PI}
          onChange={(rotation) => patch({ rotation })}
          step={0.01}
          value={draft.rotation}
        />

        <label className="flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">animation</span>
          <select
            className="rounded-md border border-border bg-background px-2 py-1"
            onChange={(e) =>
              patch({ animation: e.target.value as ModelAnimation })
            }
            value={draft.animation}
          >
            {ANIMATIONS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="space-y-1 text-sm">
          <legend className="text-muted-foreground">effects</legend>
          {base.effects.map((effect) => (
            <label key={effect.type} className="flex items-center gap-2">
              <input
                checked={draft.enabledEffects.includes(effect.type)}
                onChange={(e) =>
                  patch({
                    enabledEffects: e.target.checked
                      ? [...draft.enabledEffects, effect.type]
                      : draft.enabledEffects.filter((t) => t !== effect.type),
                  })
                }
                type="checkbox"
              />
              {effect.type}
            </label>
          ))}
        </fieldset>

        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              checked={interactive}
              onChange={(e) => setInteractive(e.target.checked)}
              type="checkbox"
            />
            orbit with mouse
          </label>
          <label className="flex items-center gap-2">
            <input
              checked={stats}
              onChange={(e) => setStats(e.target.checked)}
              type="checkbox"
            />
            fps
          </label>
        </div>

        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-3 text-xs">
          {snippet}
        </pre>
        <button
          className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          onClick={() => copy(snippet)}
          type="button"
        >
          {copied ? "Copied ✓" : `Copy values for "${modelKey}"`}
        </button>
      </div>
    </div>
  );
};

const ModelLabPanel = () => {
  const [modelKey, setModelKey] = useState<ModelKey>(MODELS[0].key);

  return (
    <>
      <div className="dev-page-header">
        <div className="dev-page-eyebrow">3D</div>
        <h1 className="dev-page-title">Model lab</h1>
        <p className="dev-page-lede">
          Tune size, position, rotation, camera and effects live, then paste the
          copied values into <code>model3d.config.ts</code>. Slots without a GLB
          show their placeholder. Dev-only — this page is not in the production
          build.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {MODELS.map((m) => (
          <button
            key={m.key}
            className={`rounded-full border px-3 py-1 text-sm ${
              m.key === modelKey
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
            onClick={() => setModelKey(m.key)}
            type="button"
          >
            {m.key}
          </button>
        ))}
      </div>

      <Lab key={modelKey} modelKey={modelKey} />
    </>
  );
};

export default ModelLabPanel;
