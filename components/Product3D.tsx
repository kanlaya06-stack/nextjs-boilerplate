"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface Product3DProps {
  color?: string;
  shape?: string;
}

export default function Product3D({ color = "#3b82f6", shape = "box" }: Product3DProps) {
  return (
    <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <mesh rotation={[0.4, 0.2, 0]}>
          {shape === "sphere" ? (
            <sphereGeometry args={[1.2, 32, 32]} />
          ) : shape === "torus" ? (
            <torusGeometry args={[1, 0.4, 16, 100]} />
          ) : (
            <boxGeometry args={[1.5, 1.5, 1.5]} />
          )}
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
        </mesh>
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} />
      </Canvas>
      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
        หมุนดูแบบ 3D ได้
      </div>
    </div>
  );
}