"use client";

import { RoundedBox } from "@react-three/drei";
import type { ReactNode } from "react";
import type {
  Model3D,
  PlaceholderKind,
} from "@/packages/configs/model3d.config";
import type { ThemeColors } from "@/packages/hooks";
import { Motion } from "./Motion";

type PlaceholderModelProps = {
  model: Model3D;
  colors: ThemeColors;
  motion: boolean;
};

type ShapeProps = { colors: ThemeColors };

const Body = ({ colors }: ShapeProps) => (
  <meshStandardMaterial color={colors.card} metalness={0.55} roughness={0.4} />
);

const Glow = ({ colors }: ShapeProps) => (
  <meshStandardMaterial
    color={colors.primary}
    emissive={colors.primary}
    emissiveIntensity={1.4}
    toneMapped={false}
  />
);

// Every shape fits a ~1-unit box; <PlaceholderModel> scales it to `model.size`.
const SHAPES: Record<PlaceholderKind, (props: ShapeProps) => ReactNode> = {
  workstation: ({ colors }) => (
    <>
      <RoundedBox args={[1, 0.05, 0.5]} position={[0, -0.22, 0]} radius={0.02}>
        <Body colors={colors} />
      </RoundedBox>
      <RoundedBox
        args={[0.46, 0.28, 0.02]}
        position={[0, 0.02, -0.1]}
        radius={0.01}
      >
        <Body colors={colors} />
      </RoundedBox>
      <mesh position={[0, 0.02, -0.088]}>
        <planeGeometry args={[0.42, 0.24]} />
        <Glow colors={colors} />
      </mesh>
      <mesh position={[0, -0.12, -0.1]}>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <Body colors={colors} />
      </mesh>
      <RoundedBox
        args={[0.34, 0.012, 0.1]}
        position={[0, -0.19, 0.08]}
        radius={0.004}
      >
        <Body colors={colors} />
      </RoundedBox>
    </>
  ),
  avatar: ({ colors }) => (
    <>
      <mesh position={[0, -0.2, 0]}>
        <capsuleGeometry args={[0.2, 0.36, 8, 16]} />
        <Body colors={colors} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <sphereGeometry args={[0.17, 24, 24]} />
        <Body colors={colors} />
      </mesh>
      <mesh position={[0, -0.02, 0.17]}>
        <boxGeometry args={[0.16, 0.02, 0.02]} />
        <Glow colors={colors} />
      </mesh>
    </>
  ),
  laptop: ({ colors }) => (
    <>
      <RoundedBox
        args={[0.8, 0.03, 0.55]}
        position={[0, -0.2, 0.05]}
        radius={0.012}
      >
        <Body colors={colors} />
      </RoundedBox>
      <group position={[0, -0.18, -0.22]} rotation={[-0.22, 0, 0]}>
        <RoundedBox
          args={[0.8, 0.52, 0.025]}
          position={[0, 0.26, 0]}
          radius={0.012}
        >
          <Body colors={colors} />
        </RoundedBox>
        <mesh position={[0, 0.26, 0.014]}>
          <planeGeometry args={[0.72, 0.44]} />
          <Glow colors={colors} />
        </mesh>
      </group>
    </>
  ),
  server: ({ colors }) => (
    <>
      {[-0.3, -0.05, 0.2].map((y) => (
        <group key={y} position={[0, y, 0]}>
          <RoundedBox args={[0.7, 0.2, 0.46]} radius={0.015}>
            <Body colors={colors} />
          </RoundedBox>
          <mesh position={[0.22, 0, 0.235]}>
            <boxGeometry args={[0.16, 0.02, 0.01]} />
            <Glow colors={colors} />
          </mesh>
        </group>
      ))}
    </>
  ),
  database: ({ colors }) => (
    <>
      {[-0.28, -0.04, 0.2].map((y) => (
        <group key={y} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.36, 0.36, 0.2, 40]} />
            <Body colors={colors} />
          </mesh>
          <mesh position={[0, 0.108, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.36, 0.008, 8, 64]} />
            <Glow colors={colors} />
          </mesh>
        </group>
      ))}
    </>
  ),
  phone: ({ colors }) => (
    <group rotation={[0, 0, 0.12]}>
      <RoundedBox args={[0.36, 0.72, 0.04]} radius={0.04}>
        <Body colors={colors} />
      </RoundedBox>
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[0.31, 0.65]} />
        <Glow colors={colors} />
      </mesh>
    </group>
  ),
  globe: ({ colors }) => (
    <>
      <mesh>
        <sphereGeometry args={[0.4, 40, 40]} />
        <Body colors={colors} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.42, 3]} />
        <meshBasicMaterial
          color={colors.primary}
          opacity={0.5}
          toneMapped={false}
          transparent
          wireframe
        />
      </mesh>
    </>
  ),
};

/**
 * Procedural stand-in for a GLB that hasn't been exported yet (or failed to
 * load). Same size / position / animation as the real thing, so layouts and
 * effects can be tuned before the model exists.
 */
export const PlaceholderModel = ({
  model,
  colors,
  motion,
}: PlaceholderModelProps) => {
  const Shape = SHAPES[model.placeholder];
  return (
    <group position={[...model.position]} rotation={[...model.rotation]}>
      <Motion enabled={motion} preset={model.animation}>
        <group scale={model.size}>
          <Shape colors={colors} />
        </group>
      </Motion>
    </group>
  );
};
