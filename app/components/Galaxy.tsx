"use client";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function Galaxy() {
  return (
    
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas>
        <Stars radius={425} depth={100} count={10000} factor={6} fade speed={3} />
      </Canvas>
    </div>
  );
}
