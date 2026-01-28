"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Rocket() {
  return (
    <mesh>
      <cylinderGeometry args={[0.2, 0.3, 2, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default function Rocket3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />
        <Rocket />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}
