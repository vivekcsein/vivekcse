"use client";

import { Billboard, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { CanvasTexture, type Group, SRGBColorSpace } from "three";
import type { ThemeColors } from "@/packages/hooks";
import type { EffectProps } from "./types";

type FloatingTilesProps = EffectProps & { items: readonly string[] };

const makeLabelTexture = (label: string, colors: ThemeColors) => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = colors.card;
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = colors.foreground;
    ctx.font = `700 ${label.length > 3 ? 30 : 46}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 64, 66);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
};

type TileProps = {
  label: string;
  colors: ThemeColors;
  position: readonly [number, number, number];
  phase: number;
  motion: boolean;
  tile: number;
};

const Tile = ({ label, colors, position, phase, motion, tile }: TileProps) => {
  const group = useRef<Group>(null);
  const texture = useMemo(
    () => makeLabelTexture(label, colors),
    [label, colors],
  );
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ clock }) => {
    if (!motion || !group.current) return;
    group.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 1.2 + phase) * tile * 0.12;
  });

  return (
    <Billboard>
      <group ref={group} position={[...position]}>
        <RoundedBox args={[tile, tile, tile * 0.12]} radius={tile * 0.14}>
          <meshStandardMaterial
            color={colors.card}
            emissive={colors.primary}
            emissiveIntensity={0.25}
            metalness={0.4}
            roughness={0.35}
          />
        </RoundedBox>
        <mesh position={[0, 0, tile * 0.065]}>
          <planeGeometry args={[tile * 0.78, tile * 0.78]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </Billboard>
  );
};

/** Glass tech-logo tiles hovering around the model (React / TS / Next… in the design). */
export const FloatingTiles = ({
  colors,
  size,
  motion,
  items,
}: FloatingTilesProps) => {
  const tile = size * 0.17;
  return (
    <>
      {items.map((label, index) => {
        const angle = (index / items.length) * Math.PI * 2 + 0.5;
        const radius = size * 0.6;
        return (
          <Tile
            key={label}
            colors={colors}
            label={label}
            motion={motion}
            phase={index * 1.7}
            position={[
              Math.cos(angle) * radius,
              Math.sin(index * 2.1) * size * 0.28 + size * 0.12,
              Math.sin(angle) * radius * 0.35 + size * 0.1,
            ]}
            tile={tile}
          />
        );
      })}
    </>
  );
};
