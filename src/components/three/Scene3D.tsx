import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import type { Furniture } from '../../types';

/* ─── Furniture 3D Model ─── */
function FurnitureModel({ furniture }: { furniture: Furniture }) {
  const groupRef = useRef<THREE.Group>(null);
  const mainColor = useMemo(() => new THREE.Color(furniture.color), [furniture.color]);
  const darkColor = useMemo(() => mainColor.clone().multiplyScalar(0.5), [mainColor]);

  const cat = furniture.category || '';

  // Chair / Armchair
  if (cat.includes('Chaise') || cat.includes('Fauteuil')) {
    return (
      <group ref={groupRef}>
        {/* Seat */}
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.55, 0.06, 0.5]} />
          <meshStandardMaterial color={mainColor} roughness={0.6} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.76, -0.23]} castShadow>
          <boxGeometry args={[0.55, 0.55, 0.04]} />
          <meshStandardMaterial color={mainColor} roughness={0.6} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.26, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
          <meshStandardMaterial color={darkColor} roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Star base + casters */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (Math.PI * 2 / 5) * i;
          return (
            <group key={i}>
              <mesh
                position={[Math.sin(angle) * 0.13, 0.06, Math.cos(angle) * 0.13]}
                rotation={[0, angle, 0]}
              >
                <boxGeometry args={[0.03, 0.03, 0.3]} />
                <meshStandardMaterial color={darkColor} roughness={0.3} metalness={0.7} />
              </mesh>
              <mesh position={[Math.sin(angle) * 0.28, 0.025, Math.cos(angle) * 0.28]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
              </mesh>
            </group>
          );
        })}
      </group>
    );
  }

  // Desk / Table
  if (cat.includes('Bureau') || cat.includes('Table')) {
    const w = (furniture.dimensions?.w || 160) / 100;
    const d = (furniture.dimensions?.d || 80) / 100;
    const legs: [number, number][] = [
      [-w / 2 + 0.05, -d / 2 + 0.05],
      [w / 2 - 0.05, -d / 2 + 0.05],
      [-w / 2 + 0.05, d / 2 - 0.05],
      [w / 2 - 0.05, d / 2 - 0.05],
    ];
    return (
      <group ref={groupRef}>
        <mesh position={[0, 0.74, 0]} castShadow>
          <boxGeometry args={[w, 0.04, d]} />
          <meshStandardMaterial color={mainColor} roughness={0.4} metalness={0.1} />
        </mesh>
        {legs.map(([x, z], i) => (
          <mesh key={i} position={[x, 0.36, z]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.72, 8]} />
            <meshStandardMaterial color={darkColor} roughness={0.3} metalness={0.7} />
          </mesh>
        ))}
      </group>
    );
  }

  // Cabinet / Shelf
  if (cat.includes('Armoire') || cat.includes('Étagère')) {
    const w = (furniture.dimensions?.w || 90) / 100;
    const h = (furniture.dimensions?.h || 200) / 100;
    const d = (furniture.dimensions?.d || 45) / 100;
    return (
      <group ref={groupRef}>
        <mesh position={[0, h / 2, 0]} castShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={mainColor} roughness={0.5} metalness={0.3} />
        </mesh>
        {[1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[0, (h / 5) * i, 0]}>
            <boxGeometry args={[w - 0.03, 0.015, d - 0.02]} />
            <meshStandardMaterial color={darkColor} roughness={0.4} />
          </mesh>
        ))}
      </group>
    );
  }

  // Default box
  const w = (furniture.dimensions?.w || 50) / 100;
  const h = (furniture.dimensions?.h || 60) / 100;
  const d = (furniture.dimensions?.d || 50) / 100;
  return (
    <mesh ref={groupRef as any} position={[0, h / 2, 0]} castShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={mainColor} roughness={0.4} metalness={0.2} />
    </mesh>
  );
}

/* ─── Scene wrapper ─── */
interface SceneProps {
  furniture?: Furniture | null;
  className?: string;
}

export default function Scene3D({ furniture, className }: SceneProps) {
  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Canvas
        shadows
        camera={{ position: [6, 5, 6], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#222233" />
        <directionalLight
          position={[4, 8, 4]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-3, 5, -2]} intensity={0.3} color="#c8e630" />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>

        {/* Grid */}
        <Grid
          position={[0, 0.005, 0]}
          args={[14, 14]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#1a1a1a"
          sectionSize={4}
          sectionThickness={1}
          sectionColor="#222"
          fadeDistance={20}
          infiniteGrid={false}
        />

        {/* Furniture */}
        {furniture && <FurnitureModel furniture={furniture} />}

        {/* Controls */}
        <OrbitControls
          target={[0, 0.8, 0]}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={4}
          maxDistance={20}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
