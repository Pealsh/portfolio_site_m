"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createMShape(): THREE.Shape {
  const s = new THREE.Shape();

  // "M" letterform — outer contour
  s.moveTo(-3, -3.5);
  s.lineTo(-3, 3.5);
  s.lineTo(-1.5, 3.5);
  s.lineTo(0, 1);
  s.lineTo(1.5, 3.5);
  s.lineTo(3, 3.5);
  s.lineTo(3, -3.5);
  s.lineTo(1.8, -3.5);
  s.lineTo(1.8, 1.6);
  s.lineTo(0, -1.2);
  s.lineTo(-1.8, 1.6);
  s.lineTo(-1.8, -3.5);
  s.closePath();

  return s;
}

function RotatingM() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = createMShape();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 1.8,
      bevelEnabled: true,
      bevelSize: 0.12,
      bevelThickness: 0.08,
      bevelSegments: 4,
    });
    geo.center();
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#8b5cf6"),
        metalness: 0.5,
        roughness: 0.25,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        emissive: new THREE.Color("#7c3aed"),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.12;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export default function Rotating3DM() {
  return (
    <div className="absolute inset-0 z-[20]" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -3, -5]} intensity={0.4} />
        <pointLight position={[0, 0, 8]} intensity={0.6} color="#a78bfa" />
        <RotatingM />
      </Canvas>
    </div>
  );
}
