"use client";
import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

function Earth() {
  return (
    <Sphere args={[1, 64, 64]}>
      <meshStandardMaterial color="blue" />
    </Sphere>
  );
}

export default function EarthOrbit() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Earth />
      </Canvas>
    </div>
  );
}
