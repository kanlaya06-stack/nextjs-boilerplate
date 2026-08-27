'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox, Sparkles as ThreeSparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Store, ArrowRight, ShieldCheck, Box, MessageSquare, Sparkles, Layers, Zap } from 'lucide-react';
import Link from 'next/link';

// 3D Model Display for Hero Section
function Hero3DItem() {
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 8, 5]} intensity={3} color="#60a5fa" />
      <directionalLight position={[-5, -5, -5]} intensity={2} color="#a855f7" />
      <pointLight position={[0, 0, 3]} intensity={1.5} color="#38bdf8" />

      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
        <RoundedBox ref={meshRef} args={[2.2, 2.8, 0.7]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color="#2563eb" 
            roughness={0.15} 
            metalness={0.6} 
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>
      </Float>

      <ThreeSparkles count={40} scale={6} size={3} speed={0.4} opacity={0.6} color="#38bdf8" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* Background Neon Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 min-h-screen flex flex-col justify-between">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-xl shadow-lg">
            <Store className="w-6 h-6 text-blue-400" />
            <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
              COLLEGE MARKET 3D
            </span>
          </div>

          <Link href="/home">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-sm shadow-lg shadow-blue-500/25 border border-blue-400/30 hover:shadow-blue-500/40 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>เข้าสู่ระบบตลาด</span>
            </motion.button>
          </Link>
        </header>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>NEXT-GEN CAMPUS MARKETPLACE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              ตลาดซื้อขาย <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
                ประสบการณ์ 3D มิติใหม่
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              แพลตฟอร์มส่งต่อสินค้ามือสองสำหรับนักศึกษายุคใหม่ ซื้อขายง่าย ปลอดภัย สัมผัสสินค้าได้รอบทิศทาง 360° ก่อนตัดสินใจซื้อ
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/home">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-bold text-base shadow-xl shadow-blue-600/30 flex items-center gap-3 border border-blue-400/30 cursor-pointer"
                >
                  <span>สำรวจตลาดสินค้า</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="/product">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-semibold text-base backdrop-blur-xl transition-all cursor-pointer"
                >
                  + ลงขายสินค้าฟรี
                </motion.button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <h4 className="text-2xl font-bold text-white">100%</h4>
                <p className="text-xs text-slate-400 mt-1">เด็กในวิทยาลัย</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-blue-400">360°</h4>
                <p className="text-xs text-slate-400 mt-1">Interactive 3D</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-purple-400">Direct</h4>
                <p className="text-xs text-slate-400 mt-1">แชทตรงทันที</p>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Visual Viewer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Glow Aura behind Canvas */}
            <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-blue-600/40 to-purple-600/40 rounded-full blur-[80px] animate-pulse" />

            <div className="relative w-full h-[380px] sm:h-[450px] bg-slate-900/40 border border-white/15 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center">
              
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-blue-300 z-10">
                <Box className="w-3.5 h-3.5" />
                <span>3D Interactive Preview</span>
              </div>

              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Hero3DItem />
              </Canvas>

              <div className="absolute bottom-4 text-center z-10">
                <span className="text-xs text-slate-400 bg-slate-950/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                  🖱️ คลิกลากหมุนดูสินค้า 3D
                </span>
              </div>
            </div>
          </motion.div>

        </main>

        {/* Feature Cards Footer */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">ระบบแสดงผล 3D</h3>
              <p className="text-xs text-slate-400 mt-0.5">หมุนชมสินค้าจำลองสมจริง 360 องศา</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">ชุมชนนักศึกษา</h3>
              <p className="text-xs text-slate-400 mt-0.5">ซื้อขายกันเองภายในวิทยาลัย มั่นใจได้</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">ติดต่อซื้อง่าย</h3>
              <p className="text-xs text-slate-400 mt-0.5">กดทักหาผู้ขายได้ทันทีแบบไม่มีค่าธรรมเนียม</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}