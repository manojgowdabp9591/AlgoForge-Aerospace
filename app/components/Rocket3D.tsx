import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Sparkles, Center } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// --- REUSABLE THRUSTER PLUME ---
function ThrusterPlume({ scale = 1, position = [0, 0, 0] }: { scale?: number, position?: [number, number, number] }) {
  const plumeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (plumeRef.current) {
        const flicker = 0.8 + Math.random() * 0.2; 
        plumeRef.current.scale.y = flicker * scale;
        const breath = 0.9 + Math.sin(t * 40) * 0.05; 
        plumeRef.current.scale.x = breath * scale;
        plumeRef.current.scale.z = breath * scale;
    }
  });

  return (
    <group ref={plumeRef} position={position}>
       <mesh position={[0, -1 * scale, 0]} rotation={[0, 0, 0]}>
           <coneGeometry args={[0.8 * scale, 4 * scale, 16, 1, true]} />
           <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
       </mesh>
       <mesh position={[0, -1.2 * scale, 0]} rotation={[0, 0, 0]}>
           <coneGeometry args={[1.2 * scale, 5 * scale, 16, 1, true]} />
           <meshBasicMaterial color="#00aaff" transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
       </mesh>
       <pointLight color="#00ffff" intensity={200 * scale} distance={50 * scale} decay={2} position={[0, -2, 0]} />
    </group>
  )
}

// --- CONFORMAL AERODYNAMIC LANDING LEG ---
function ConformalLeg({ material, darkMaterial }: { material: THREE.Material, darkMaterial: THREE.Material }) {
    return (
      <group>
        {/* Main aerodynamic shell stowed perfectly flush against the hull */}
        <mesh position={[0, 0, 0]} scale={[1, 1, 0.2]} material={material}>
            <cylinderGeometry args={[0.15, 0.6, 8, 32]} />
        </mesh>
        
        {/* Upper Actuator Hinge (Aerodynamic blister) */}
        <mesh position={[0, 3.9, 0.05]} scale={[1, 1, 0.3]} material={darkMaterial}>
            <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>

        {/* Base footpad folded up flush inside the shell */}
        <mesh position={[0, -3.9, 0.05]} scale={[1, 1, 0.5]} material={darkMaterial}>
            <boxGeometry args={[1.1, 0.15, 0.4]} />
        </mesh>
      </group>
    );
}

// --- COMPONENT: TECHNICAL GRID FIN ---
function GridFinAssembly({ frameMat, gridMat }: { frameMat: THREE.Material, gridMat: THREE.Material }) {
    const width = 1.8;
    const height = 1.3;
    const thickness = 0.15;
    const frameThickness = 0.1;
    
    return (
        <group>
            {/* 1. The Solid Outer Frame */}
            <mesh position={[0, height/2, 0]} material={frameMat}>
                <boxGeometry args={[width + frameThickness, frameThickness, thickness]} />
            </mesh>
            <mesh position={[0, -height/2, 0]} material={frameMat}>
                <boxGeometry args={[width + frameThickness, frameThickness, thickness]} />
            </mesh>
             <mesh position={[-width/2, 0, 0]} material={frameMat}>
                <boxGeometry args={[frameThickness, height, thickness]} />
            </mesh>
             <mesh position={[width/2, 0, 0]} material={frameMat}>
                <boxGeometry args={[frameThickness, height, thickness]} />
            </mesh>

            {/* 2. The Inner "Porous" Grid */}
            <mesh material={gridMat}>
                <boxGeometry args={[width-0.05, height-0.05, thickness*0.8, 8, 6, 1]} />
            </mesh>
        </group>
    )
}

function AlgoForgeHeavy() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
        groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.02;
        groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.02;
    }
  });

  // --- MATERIALS ---
  const matCarbon = new THREE.MeshStandardMaterial({ color: "#111112", roughness: 0.4, metalness: 0.3 });
  const matWhite = new THREE.MeshStandardMaterial({ color: "#e8e8e8", roughness: 0.8, metalness: 0.1 });
  const matMechanical = new THREE.MeshStandardMaterial({ color: "#a0a0a0", roughness: 0.5, metalness: 0.8 });
  const matDarkAccent = new THREE.MeshStandardMaterial({ color: "#222222", roughness: 0.7, metalness: 0.5 });
  
  const matGridMesh = new THREE.MeshStandardMaterial({ 
      color: "#c0c0c0", 
      roughness: 0.1, 
      metalness: 1.0,
      wireframe: true, 
      wireframeLinewidth: 2 
  });
  
  const matLattice = new THREE.MeshStandardMaterial({ color: "#888888", roughness: 0.2, metalness: 0.9, wireframe: true });
  const matEngineInner = new THREE.MeshBasicMaterial({ color: "#00ffff" });
  const matTitanium = new THREE.MeshStandardMaterial({ color: "#55504a", roughness: 0.3, metalness: 0.8 });

  const RADIUS = 2.0;
  
  return (
    <group ref={groupRef}>
      
      {/* 1. FIRST STAGE */}
      <mesh position={[0, 17.5, 0]} castShadow receiveShadow material={matCarbon}>
          <cylinderGeometry args={[RADIUS, RADIUS, 35, 64]} />
      </mesh>

      {/* 2. AERODYNAMIC STOWED LANDING LEGS */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (Math.PI / 2) * i + (Math.PI / 4);
        const x = (RADIUS + 0.08) * Math.cos(angle);
        const z = (RADIUS + 0.08) * Math.sin(angle);
        return (
          <group key={`leg-${i}`} position={[x, 4, z]} rotation={[0, -angle + Math.PI/2, 0]}>
             <ConformalLeg material={matMechanical} darkMaterial={matDarkAccent} />
          </group>
        );
      })}

      {/* 3. DETAILED GRID FINS */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (Math.PI / 2) * i;
        const x = (RADIUS + 0.2) * Math.cos(angle);
        const z = (RADIUS + 0.2) * Math.sin(angle);
        return (
          <group key={`fin-${i}`} position={[x, 33.5, z]} rotation={[Math.PI / 2, -angle, 0]}>
             <GridFinAssembly frameMat={matMechanical} gridMat={matGridMesh} />
          </group>
        );
      })}

      {/* 4. INTERSTAGE LATTICE */}
      <mesh position={[0, 36.5, 0]} material={matLattice}>
          <cylinderGeometry args={[RADIUS, RADIUS, 3, 16, 3]} />
      </mesh>

      {/* 5. SECOND STAGE */}
      <mesh position={[0, 43, 0]} castShadow receiveShadow material={matWhite}>
          <cylinderGeometry args={[RADIUS, RADIUS, 10, 64]} />
      </mesh>

      {/* 6. PAYLOAD FAIRING */}
      <group position={[0, 48, 0]}>
         <mesh position={[0, 2, 0]} castShadow receiveShadow material={matWhite}>
             <cylinderGeometry args={[2.25, RADIUS, 4, 64]} />
         </mesh>
         <mesh position={[0, 8, 0]} castShadow receiveShadow material={matWhite}>
             <cylinderGeometry args={[0.1, 2.25, 8, 64]} />
         </mesh>
         <mesh position={[0, 12.2, 0]} material={matWhite}>
             <sphereGeometry args={[0.1, 16, 16]} />
         </mesh>
      </group>

      {/* 7. 15-ENGINE CLUSTER */}
      <group position={[0, -0.6, 0]}>
        {[0, 1, 2].map((i) => {
          const angle = ((Math.PI * 2) / 3) * i;
          return (
            <group key={`inner-eng-${i}`} position={[0.55 * Math.cos(angle), 0, 0.55 * Math.sin(angle)]}>
              <mesh material={matTitanium}><cylinderGeometry args={[0.35, 0.1, 1.2, 16]} /></mesh>
              <mesh position={[0, -0.61, 0]} rotation={[Math.PI/2, 0, 0]} material={matEngineInner}><circleGeometry args={[0.32, 16]} /></mesh>
            </group>
          );
        })}
        {[...Array(12)].map((_, i) => {
          const angle = ((Math.PI * 2) / 12) * i;
          return (
            <group key={`outer-eng-${i}`} position={[1.45 * Math.cos(angle), 0, 1.45 * Math.sin(angle)]}>
              <mesh material={matTitanium}><cylinderGeometry args={[0.35, 0.1, 1.2, 16]} /></mesh>
              <mesh position={[0, -0.61, 0]} rotation={[Math.PI/2, 0, 0]} material={matEngineInner}><circleGeometry args={[0.32, 16]} /></mesh>
            </group>
          );
        })}
      </group>

      {/* GIANT THRUST PLUME */}
      <ThrusterPlume scale={2.5} position={[0, -1.2, 0]} />

    </group>
  );
}

export default function Rocket3D() {
  return (
    <div className="h-full w-full min-h-[600px] bg-black rounded-xl overflow-hidden relative">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [20, 10, 35], fov: 40 }}>
        
        <ambientLight intensity={0.5} color="#ffffff" />
        <spotLight position={[30, 30, 30]} angle={0.4} intensity={8000} color="#fff0dd" castShadow />
        <spotLight position={[-30, 10, -30]} intensity={4000} color="#3b82f6" angle={1} />
        <pointLight position={[0, -5, 0]} intensity={2000} color="#00ffff" distance={50} />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Sparkles count={150} scale={[10, 30, 10]} size={2} speed={0.2} opacity={0.4} color="#00ffff" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <Center>
                {/* Increased scale from 0.15 to 0.25 to make the rocket much larger */}
                <group scale={0.25}>
                    <AlgoForgeHeavy />
                </group>
            </Center>
        </Float>

        <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.1}
            minDistance={10} 
            maxDistance={50} 
        />
      </Canvas>
    </div>
  );
}
