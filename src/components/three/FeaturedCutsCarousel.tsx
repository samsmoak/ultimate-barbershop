"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Cut } from "@/types";

type CardProps = {
  cut: Cut;
  position: [number, number, number];
  rotationY: number;
  focus: boolean;
  onHover: (v: boolean) => void;
};

function Card({ cut, position, rotationY, focus, onHover }: CardProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, cut.src);
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const targetScale = focus ? 1.1 : 1;
    const s = THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.1);
    mesh.current.scale.set(s, s, s);

    // Float bob
    mesh.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.08;
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={() => onHover(false)}
      >
        <planeGeometry args={[2.2, 2.9, 1, 1]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* Gold frame */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.2, 2.9)]} />
        <lineBasicMaterial color={focus ? "#e8c97a" : "#c6973f"} />
      </lineSegments>
    </group>
  );
}

function Scene({ cuts }: { cuts: Cut[] }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragOrigin = useRef({ x: 0, rotY: 0 });

  const positions = useMemo(() => {
    const radius = 4.2;
    return cuts.map((_, i) => {
      const angle = (i / cuts.length) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      return { position: [x, 0, z] as [number, number, number], rotationY: angle + Math.PI };
    });
  }, [cuts]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (!dragging && hovered === null) {
      group.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group
      ref={group}
      onPointerDown={(e) => {
        setDragging(true);
        dragOrigin.current = {
          x: e.clientX,
          rotY: group.current?.rotation.y ?? 0,
        };
      }}
      onPointerMove={(e) => {
        if (!dragging || !group.current) return;
        const dx = e.clientX - dragOrigin.current.x;
        group.current.rotation.y = dragOrigin.current.rotY + dx * 0.004;
      }}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      {cuts.map((cut, i) => (
        <Card
          key={cut.id}
          cut={cut}
          position={positions[i].position}
          rotationY={positions[i].rotationY}
          focus={hovered === i}
          onHover={(v) => setHovered(v ? i : null)}
        />
      ))}
    </group>
  );
}

export default function FeaturedCutsCarousel({ cuts }: { cuts: Cut[] }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <Scene cuts={cuts} />
      </Suspense>
    </Canvas>
  );
}
