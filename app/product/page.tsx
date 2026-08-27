'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Box, Cylinder, Torus, Cone } from '@react-three/drei';
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function Preview3D({ type }: { type: string }) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {type === 'book' && (
          <group>
            <Box args={[1.8, 2.4, 0.35]}><meshStandardMaterial color="#2563eb" /></Box>
            <Box args={[1.68, 2.3, 0.28]} position={[0.05, 0, 0]}><meshStandardMaterial color="#ffffff" /></Box>
          </group>
        )}
        {type === 'shirt' && (
          <group>
            <Box args={[1.8, 2.2, 0.5]}><meshStandardMaterial color="#059669" /></Box>
            <Cone args={[0.5, 0.4, 4]} position={[0, 1.1, 0]} rotation={[0, 0, Math.PI]}><meshStandardMaterial color="#047857" /></Cone>
          </group>
        )}
        {type === 'tech' && (
          <group>
            <Box args={[2.4, 1.6, 0.15]}><meshStandardMaterial color="#d97706" /></Box>
            <Box args={[0.8, 0.6, 0.1]} position={[-0.4, 0.2, 0.12]}><meshStandardMaterial color="#1e293b" /></Box>
          </group>
        )}
        {type === 'bag' && (
          <group>
            <Box args={[1.7, 2.2, 0.9]}><meshStandardMaterial color="#7c3aed" /></Box>
            <Torus args={[0.3, 0.08, 16, 32, Math.PI]} position={[0, 1.15, 0]}><meshStandardMaterial color="#4c1d95" /></Torus>
          </group>
        )}
      </Float>
      <OrbitControls enableZoom={false} autoRotate />
    </>
  );
}

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('หนังสือ/การเรียน');
  const [type, setType] = useState('book');
  const [seller, setSeller] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>กลับหน้าตลาด</span>
        </Link>
        <h1 className="text-xl font-bold text-slate-900">ลงขายสินค้ามือสอง (3D)</h1>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-900">ลงขายสินค้าเรียบร้อยแล้ว!</h2>
            <p className="text-sm text-slate-500">สินค้าของคุณถูกเพิ่มเข้าสู่ตลาดเรียบร้อยแล้ว</p>
            <Link href="/" className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm shadow-md">
              ดูสินค้าของคุณในหน้าตลาด
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อสินค้า</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น หนังสือเรียน, เสื้อช็อป"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">หมวดหมู่</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (e.target.value === 'หนังสือ/การเรียน') setType('book');
                    else if (e.target.value === 'เสื้อผ้า/เครื่องแต่งกาย') setType('shirt');
                    else if (e.target.value === 'อุปกรณ์การเรียน') setType('tech');
                    else setType('bag');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500"
                >
                  <option value="หนังสือ/การเรียน">หนังสือ/การเรียน</option>
                  <option value="เสื้อผ้า/เครื่องแต่งกาย">เสื้อผ้า/เครื่องแต่งกาย</option>
                  <option value="อุปกรณ์การเรียน">อุปกรณ์การเรียน</option>
                  <option value="กระเป๋า/รองเท้า">กระเป๋า/รองเท้า</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ราคา (บาท)</label>
                <input
                  type="number"
                  required
                  placeholder="250"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อผู้ขาย (แผนกวิชา)</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สมชาย (แผนกช่างยนต์)"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">รายละเอียดสินค้า</label>
                <textarea
                  rows={3}
                  placeholder="ระบุสภาพสินค้า รายละเอียดการรับของ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ตัวอย่างโมเดล 3D สินค้า</label>
                <div className="h-64 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
                  <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                    <Preview3D type={type} />
                  </Canvas>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>ยืนยันการลงขาย</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}