'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { Store, ArrowRight, Plus, Sparkles, ShoppingBag } from 'lucide-react';

// ส่วนจำลองโมเดล 3D ไอคอนร้านค้าการ์ดฝั่งขวา
function StoreIcon3D() {
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#93c5fd" />

      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        {/* ป้ายร้านค้า 3D สไตล์มินิมอล */}
        <RoundedBox args={[2.2, 2.2, 0.4]} radius={0.4} smoothness={4}>
          <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} />
        </RoundedBox>
        {/* สัญลักษณ์หลังคา / ตึก */}
        <RoundedBox args={[1.2, 0.4, 0.5]} position={[0, 0.4, 0.1]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[1.4, 0.8, 0.45]} position={[0, -0.3, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </RoundedBox>
      </Float>
    </group>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      
      {/* Header / Navbar */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <Store className="w-5 h-5 text-blue-600" />
          <span className="font-extrabold text-slate-900 text-sm tracking-tight">College Market 3D</span>
        </div>

        <Link href="/market">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0f172a] hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-md cursor-pointer">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>เข้าสู่ตลาด</span>
          </button>
        </Link>
      </header>

      {/* Main Hero Section */}
      <main className="max-w-7xl mx-auto w-full px-6 py-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ฝั่งซ้าย: ข้อความและปุ่มกด */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Campus Marketplace</span>
            </div>

            {/* หัวข้อหลัก */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
              ตลาดซื้อขาย<br />
              <span className="text-blue-600">มินิมอล 3D</span> สำหรับ<br />
              นักศึกษา
            </h1>

            {/* รายละเอียด */}
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              ส่งต่ออุปกรณ์การเรียน เสื้อผ้า และไอเทมมือสองภายในวิทยาลัยได้อย่างมั่นใจ สัมผัสและมุมมองสินค้า 360° ในรูปแบบเรียบง่าย
            </p>

            {/* ปุ่ม Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/market">
                <button className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer">
                  <span>สำรวจสินค้า</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/product">
                <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-sm transition-all cursor-pointer">
                  <Plus className="w-4 h-4 text-slate-500" />
                  <span>ลงขายสินค้า</span>
                </button>
              </Link>
            </div>
          </div>

          {/* ฝั่งขวา: การ์ดแสดงผล 3D Interactive */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] aspect-square bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-[36px] p-6 shadow-2xl shadow-blue-500/30 flex flex-col justify-between relative overflow-hidden group">
              
              {/* Badge มุมบนซ้ายของการ์ด */}
              <div className="z-10 self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>3D Interactive Market</span>
              </div>

              {/* Viewport แสดงโมเดล 3D */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                  <StoreIcon3D />
                </Canvas>
              </div>

              {/* ข้อความด้านล่างการ์ด */}
              <div className="z-10 text-center space-y-1">
                <h3 className="text-white font-bold text-xl tracking-wide">College Market 3D</h3>
                <p className="text-blue-100 text-xs font-light">ระบบซื้อขายแลกเปลี่ยนมือสองสำหรับนักศึกษา</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer บางๆ ด้านล่าง */}
      <footer className="py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} College Market 3D. All rights reserved.
      </footer>
    </div>
  );
}