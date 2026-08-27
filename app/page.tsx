'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial, RoundedBox } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Store, ArrowRight, Sparkles, Compass, Plus, ShieldCheck, Zap, Layers } from 'lucide-react';
import Link from 'next/link';

function Hero3DElement() {
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      <pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={2} />
      
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
        <RoundedBox ref={meshRef} args={[2.2, 2.2, 2.2]} radius={0.3} smoothness={4}>
          <MeshWobbleMaterial 
            color="#2563eb" 
            factor={0.4} 
            speed={1.5} 
            roughness={0.15} 
            metalness={0.6}
          />
        </RoundedBox>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden font-sans flex flex-col justify-between">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="relative z-20 max-w-6xl mx-auto w-full px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
          <Store className="w-6 h-6 text-blue-400" />
          <span className="font-bold tracking-wide text-lg">College Market 3D</span>
        </div>

        <Link href="/home">
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer">
            <Sparkles className="w-4 h-4" />
            <span>เข้าสู่ระบบตลาด</span>
          </button>
        </Link>
      </header>

      {/* Hero Content Section */}
      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left Side: Copywriting & Actions */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Next-Gen Campus Experience
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            ตลาดซื้อขาย <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              แบบมีมิติใหม่ 3D
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
            สัมผัสประสบการณ์ซื้อขายสินค้านักศึกษาด้วยระบบโต้ตอบ 3 มิติแห่งแรก หมุนดูสินค้าได้ 360 องศา ซื้อง่าย ขายไว ปลอดภัยในรั้ววิทยาลัย
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/home">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:opacity-90 text-white font-bold text-base shadow-xl shadow-blue-600/30 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer">
                <span>สำรวจตลาดสินค้า</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <Link href="/product">
              <button className="px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer">
                <Plus className="w-5 h-5 text-blue-400" />
                <span>ลงขายสินค้า</span>
              </button>
            </Link>
          </div>

          {/* Key Features Badges */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>ยืนยันตัวตนนักศึกษา</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>แสดงผล 3D Interactive</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span>ไม่มีค่าธรรมเนียม</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: 3D Interactive Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          <div className="w-72 h-72 sm:w-96 sm:h-96 relative">
            {/* Glowing Backdrop Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/40 to-purple-600/40 blur-2xl animate-pulse" />
            
            <div className="w-full h-full bg-slate-950/50 rounded-full border border-blue-500/20 shadow-2xl overflow-hidden backdrop-blur-sm relative">
              <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
                <Hero3DElement />
              </Canvas>
              
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-400/80 pointer-events-none bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
                🖱️ หมุนดูโมเดล 3D
              </span>
            </div>
          </div>
        </motion.div>

      </main>

      {/* Bottom Bar */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <span>Interactive 3D Engine • Powered by Three.js & Next.js</span>
        <div className="flex items-center gap-6">
          <Link href="/home" className="hover:text-blue-400 transition-colors">สำรวจตลาด</Link>
          <Link href="/product" className="hover:text-blue-400 transition-colors">ลงขายสินค้า</Link>
        </div>
      </footer>

    </div>
  );
}