'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Store, ArrowRight, ShieldCheck, Box, MessageSquare, Sparkles, Layers } from 'lucide-react';
import Link from 'next/link';

// 3D Model Display for Hero Section (Minimal Smooth Style)
function Hero3DItem() {
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[6, 8, 6]} intensity={2} color="#ffffff" />
      <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#93c5fd" />

      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
        <RoundedBox ref={meshRef} args={[2.2, 2.8, 0.7]} radius={0.2} smoothness={4}>
          <meshStandardMaterial 
            color="#2563eb" 
            roughness={0.2} 
            metalness={0.1} 
          />
        </RoundedBox>
      </Float>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </>
  );
}

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-6 min-h-screen flex flex-col justify-between">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3 bg-white/80 border border-slate-200/80 px-5 py-2.5 rounded-2xl backdrop-blur-md shadow-sm">
            <Store className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-base tracking-wide text-slate-900">
              College Market <span className="text-blue-600">3D</span>
            </span>
          </div>

          <Link href="/home">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-medium text-sm shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>เข้าสู่ตลาด</span>
            </motion.button>
          </Link>
        </header>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Campus Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              ตลาดซื้อขาย <br />
              <span className="text-blue-600">
                มินิมอล 3D
              </span> สำหรับนักศึกษา
            </h1>

            <p className="text-slate-500 text-base sm:text-lg max-w-lg font-normal leading-relaxed">
              ส่งต่ออุปกรณ์การเรียน เสื้อผ้า และไอเทมมือสองภายในวิทยาลัยได้อย่างมั่นใจ สัมผัสและมุมมองสินค้า 360° ในรูปแบบเรียบง่าย
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/home">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-base shadow-lg shadow-blue-500/20 flex items-center gap-3 hover:bg-blue-700 transition-all cursor-pointer"
                >
                  <span>สำรวจสินค้า</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="/product">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-base shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
                >
                  + ลงขายสินค้า
                </motion.button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60 max-w-md">
              <div>
                <h4 className="text-2xl font-bold text-slate-900">100%</h4>
                <p className="text-xs text-slate-500 mt-1">เฉพาะนักศึกษา</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-blue-600">360°</h4>
                <p className="text-xs text-slate-500 mt-1">หมุนดูสินค้า 3D</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900">Direct</h4>
                <p className="text-xs text-slate-500 mt-1">แชทตรงผู้ขาย</p>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Visual Viewer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full h-[360px] sm:h-[420px] bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col items-center justify-center">
              
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600 z-10 font-medium">
                <Box className="w-3.5 h-3.5 text-blue-600" />
                <span>3D Preview</span>
              </div>

              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Hero3DItem />
              </Canvas>

              <div className="absolute bottom-4 text-center z-10">
                <span className="text-xs text-slate-500 bg-slate-100/90 px-3.5 py-1.5 rounded-full border border-slate-200/80 backdrop-blur-sm font-medium">
                  🖱️ คลิกลากหมุนดู 3D
                </span>
              </div>
            </div>
          </motion.div>

        </main>

        {/* Feature Cards Footer */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">แสดงผล 3D</h3>
              <p className="text-xs text-slate-500 mt-0.5">หมุนชมสินค้าจำลองรอบทิศทาง</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">ปลอดภัย</h3>
              <p className="text-xs text-slate-500 mt-0.5">ซื้อขายตรงกับเพื่อนในวิทยาลัย</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">ติดต่อทันที</h3>
              <p className="text-xs text-slate-500 mt-0.5">ทักหาผู้ขายได้ง่าย ไม่มีค่าธรรมเนียม</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}