"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Helix() {
  const group = useRef<THREE.Group>(null);

  const geom = useMemo(() => {
    // Two intertwined helices (like a barber pole, but abstract)
    const g = new THREE.BufferGeometry();
    const points: number[] = [];
    const N = 560;
    const radius = 1.4;
    const height = 7;
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const angle = t * Math.PI * 12;
      const y = (t - 0.5) * height;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push(x, y, z);
    }
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    return g;
  }, []);

  const geomB = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const points: number[] = [];
    const N = 560;
    const radius = 1.4;
    const height = 7;
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const angle = t * Math.PI * 12 + Math.PI;
      const y = (t - 0.5) * height;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push(x, y, z);
    }
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    return g;
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x = Math.sin(performance.now() * 0.00025) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <points geometry={geom}>
        <pointsMaterial
          size={0.04}
          color="#c6973f"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      <points geometry={geomB}>
        <pointsMaterial
          size={0.035}
          color="#e8c97a"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 7, 8]} />
        <meshBasicMaterial color="#c6973f" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function FloatingBlades() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.z += delta * 0.08;
    }
  });
  const lines = useMemo(
    () =>
      new Array(16).fill(0).map((_, i) => ({
        angle: (i / 16) * Math.PI * 2,
        r: 3.2 + Math.sin(i * 0.7) * 0.6,
      })),
    []
  );
  return (
    <group ref={group}>
      {lines.map((l, i) => (
        <mesh
          key={i}
          position={[Math.cos(l.angle) * l.r, Math.sin(l.angle) * l.r, -0.5]}
          rotation={[0, 0, l.angle]}
        >
          <boxGeometry args={[0.8, 0.006, 0.006]} />
          <meshBasicMaterial color="#c6973f" transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroHelix() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <Helix />
        <FloatingBlades />
      </Suspense>
    </Canvas>
  );
}
