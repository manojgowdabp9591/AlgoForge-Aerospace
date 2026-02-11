"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float, Stars, Sparkles, Center } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// --- REUSABLE THRUSTER COMPONENT ---
function ThrusterPlume({ scale = 1, position = [0, 0, 0] }: { scale?: number, position?: [number, number, number] }) {
  const plumeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (plumeRef.current) {
        // Random flicker for thrust instability
        const flicker = 0.8 + Math.random() * 0.2; 
        plumeRef.current.scale.y = flicker * scale;
        // Breathing width
        const breath = 0.9 + Math.sin(t * 30) * 0.1; 
        plumeRef.current.scale.x = breath * scale;
        plumeRef.current.scale.z = breath * scale;
    }
  });

  return (
    <group ref={plumeRef} position={position}>
       {/* Core White Hot Flame */}
       <mesh position={[0, 0.5 * scale, 0]} rotation={[Math.PI, 0, 0]}>
           <coneGeometry args={[0.25 * scale, 2.5 * scale, 16, 1, true]} />
           <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
       </mesh>

       {/* Outer Cyan Plasma Shell */}
       <mesh position={[0, 0.2 * scale, 0]} rotation={[Math.PI, 0, 0]}>
           <coneGeometry args={[0.4 * scale, 3.5 * scale, 16, 1, true]} />
           <meshBasicMaterial color="#00ffff" transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
       </mesh>
       
       {/* High Velocity Particles (Spitting Effect) */}
       <Sparkles 
          count={20} 
          scale={[0.6 * scale, 4 * scale, 0.6 * scale]} 
          size={6} 
          speed={5} 
          opacity={0.8} 
          color="#00ffff" 
          position={[0, -1.0 * scale, 0]} 
          noise={0.5}
       />
       
       {/* Local Light for this specific engine */}
       <pointLight color="#00ffff" intensity={5 * scale} distance={3 * scale} decay={2} position={[0, -0.5, 0]} />
    </group>
  )
}


function RocketModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Animate the ship's subtle movement
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
        // Sci-fi floating roll
        groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
        groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
    }
  });

  // --- MATERIALS ---
  const matBody = new THREE.MeshStandardMaterial({
    color: "#ececec", 
    roughness: 0.3,
    metalness: 0.8,
  });

  const matDark = new THREE.MeshStandardMaterial({
    color: "#111111",
    roughness: 0.6,
    metalness: 0.5,
  });

  const matEngine = new THREE.MeshStandardMaterial({
    color: "#333333",
    roughness: 0.4,
    metalness: 1.0,
  });

  // Emissive Cyan for small lights
  const matGlow = new THREE.MeshStandardMaterial({
    color: "#00ffff",
    emissive: "#00ffff",
    emissiveIntensity: 4,
    toneMapped: false,
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]} scale={0.55}> {/* SCALED DOWN HERE */}
      
      {/* ================= CENTRAL FUSELAGE ================= */}
      <group>
        {/* Nose Cone */}
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow material={matBody}>
            <cylinderGeometry args={[0.05, 0.6, 3, 32]} />
        </mesh>

        {/* Cockpit Section */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow material={matBody}>
            <cylinderGeometry args={[0.6, 0.9, 2.5, 32]} />
        </mesh>
        
        {/* Fuel Tank */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow material={matBody}>
            <cylinderGeometry args={[0.9, 0.8, 3, 32]} />
        </mesh>

        {/* Engine Housing */}
        <mesh position={[0, -2.5, 0]} castShadow receiveShadow material={matBody}>
            <cylinderGeometry args={[0.8, 0.6, 1.5, 32]} />
        </mesh>

        {/* Cockpit Window */}
        <mesh position={[0, 3.5, 0.4]} rotation={[-0.1, 0, 0]} material={matDark}>
             <capsuleGeometry args={[0.25, 0.8, 4, 12]} />
        </mesh>

        {/* Dark Seams */}
        <mesh position={[0, 0.8, 0]} material={matDark}>
            <torusGeometry args={[0.91, 0.05, 16, 100]} />
        </mesh>
      </group>


      {/* ================= 4x BLENDED WING BOOSTERS ================= */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (Math.PI / 2) * i;
        return (
            <group key={i} rotation={[0, angle, 0]}>
                
                {/* Wing Root */}
                <mesh position={[0.8, -1.0, 0]} castShadow receiveShadow material={matBody}>
                     <boxGeometry args={[1.2, 3.5, 0.2]} />
                </mesh>

                {/* Booster Pod Group */}
                <group position={[1.4, -1.5, 0]}>
                    <mesh castShadow receiveShadow material={matBody}>
                        <cylinderGeometry args={[0.35, 0.3, 3, 24]} />
                    </mesh>
                    <mesh position={[0, 1.9, 0]} castShadow receiveShadow material={matDark}>
                        <coneGeometry args={[0.35, 0.9, 24]} />
                    </mesh>
                    {/* Booster Nozzle */}
                    <mesh position={[0, -1.6, 0]} material={matEngine}>
                        <cylinderGeometry args={[0.25, 0.2, 0.4, 24]} />
                    </mesh>

                    {/* 🔥 BOOSTER THRUSTER PLUME ADDED HERE 🔥 */}
                    <ThrusterPlume scale={0.6} position={[0, -2.0, 0]} />

                </group>

                {/* Upper Fins */}
                <mesh position={[0.6, 2.5, 0]} rotation={[0, 0, -0.5]} castShadow receiveShadow material={matBody}>
                    <boxGeometry args={[0.6, 1.0, 0.1]} />
                </mesh>
            </group>
        );
      })}


      {/* ================= MAIN ENGINE ================= */}
      <group position={[0, -3.2, 0]}>
         {/* Nozzle */}
         <mesh material={matEngine}>
            <cylinderGeometry args={[0.5, 0.8, 1.0, 32, 1, true]} />
         </mesh>
         
         {/* Inner Glow Core */}
         <mesh position={[0, 0.2, 0]} rotation={[Math.PI, 0, 0]} material={matGlow}>
            <coneGeometry args={[0.4, 0.8, 32, 1, true]} />
         </mesh>

         {/* 🔥 MAIN THRUSTER PLUME 🔥 */}
         <ThrusterPlume scale={1.2} position={[0, -1.2, 0]} />
      </group>

    </group>
  );
}

export default function Rocket3D() {
  return (
    <div className="h-full w-full bg-transparent">
      {/* Adjusted Camera Position: Moved Z back to 14 so rocket fits in view */}
      <Canvas dpr={[1, 2]} shadows camera={{ position: [8, 2, 14], fov: 35 }}>
        
        {/* --- LIGHTING UPGRADE: BRIGHTER & CLEARER --- */}
        
        {/* Stronger Ambient Light to lift shadows */}
        <ambientLight intensity={0.8} color="#ffffff" />
        
        {/* Top Down Light (Highlights Nose/Upper Body) */}
        <spotLight 
            position={[0, 20, 0]} 
            angle={0.5} 
            penumbra={0.5} 
            intensity={80} 
            color="#ffffff" 
            castShadow 
            shadow-bias={-0.0001}
        />
        
        {/* Key Light (Sun) - Boosted Intensity */}
        <spotLight position={[10, 10, 10]} angle={0.4} intensity={60} color="#fff0dd" castShadow />
        
        {/* Fill Light (Blue reflection) - Boosted */}
        <spotLight position={[-10, -5, -5]} intensity={40} color="#3b82f6" angle={1} />
        
        {/* Rim Light (Engine Glow) */}
        <pointLight position={[0, -8, 0]} intensity={30} color="#00ffff" distance={15} />

        {/* Environment */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
        <Sparkles count={100} scale={10} size={2} speed={0.2} opacity={0.4} color="#ffffff" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[-0.2, 0.2]}>
            <Center>
                <RocketModel />
            </Center>
        </Float>

        <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.8}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            minDistance={8} 
            maxDistance={25} 
        />
      </Canvas>
    </div>
  );
}
