'use me';
'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Sphere, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Plus, Compass, ShoppingBag, Layers, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

// --- 3D Background & Interactive Hero Objects ---
function Floating3DScene() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* 3D Floating Mesh */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.2} position={[0, 0, 0]}>
          <MeshWobbleMaterial 
            color="#3b82f6" 
            attach="material" 
            factor={0.4} 
            speed={2} 
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </>
  );
}

export default function ImmersiveMarketplace() {
  const [activeTab, setActiveTab] = useState('explore');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Experimental Radial Nav Options
  const navItems = [
    { id: 'explore', label: 'สำรวจตลาด', icon: Compass, href: '/home' },
    { id: 'sell', label: 'ลงขายสินค้า', icon: Plus, href: '/product' },
    { id: 'category', label: 'หมวดหมู่ 3D', icon: Layers, href: '#' },
    { id: 'search', label: 'ค้นหาด่วน', icon: Search, href: '#' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
      
      {/* --- 1. 3D Canvas Background --- */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Floating3DScene />
        </Canvas>
      </div>

      {/* --- Overlay Content --- */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen p-6 md:p-12 pointer-events-none">
        
        {/* Header */}
        <header className="flex justify-between items-center pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 backdrop-blur-md bg-white/10 px-5 py-2.5 rounded-2xl border border-white/20 shadow-2xl"
          >
            <Store className="w-6 h-6 text-blue-400" />
            <span className="font-bold tracking-wide text-lg">College Market 3D</span>
          </motion.div>

          <Link href="/home" className="pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> เข้าสู่ระบบตลาด
            </motion.button>
          </Link>
        </header>

        {/* Hero Text / Immersive Overlay */}
        <main className="my-auto max-w-2xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-medium inline-block mb-4">
              Next-Gen Campus Experience
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-blue-400 leading-tight">
              ตลาดซื้อขาย <br /> แบบมีมิติใหม่
            </h1>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed">
              สัมผัสประสบการณ์ซื้อขายสินค้ามือสองในวิทยาลัยด้วยระบบโต้ตอบ 3 มิติ และเมนูการนำทางสุดล้ำ
            </p>
          </motion.div>
        </main>

        {/* Footer Info */}
        <footer className="text-xs text-slate-500 pointer-events-auto">
          Interactive 3D Engine • Powered by Three.js & Next.js
        </footer>
      </div>

      {/* --- 2. Experimental Floating Radial Navigation --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 p-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-950/50"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link key={item.id} href={item.href}>
                <motion.button
                  onClick={() => setActiveTab(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              </Link>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}