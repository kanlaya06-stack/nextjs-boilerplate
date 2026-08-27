'use client';

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshWobbleMaterial, Box, Torus } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Sun, Moon, Search, Plus, Compass, MessageCircle, Sparkles, X, Rotate3d, ZoomIn } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
  category: string;
  image: string;
  shape3d: 'box' | 'sphere' | 'torus';
  color3d: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'หนังสือชีววิทยา ม.ปลาย มือสอง', price: 150, seller: 'พี่เจ (เทคโนโลยีสารสนเทศ)', category: 'หนังสือ', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80', shape3d: 'box', color3d: '#3b82f6' },
  { id: 2, name: 'หูฟังบลูทูธไร้สาย พร้อมเคส', price: 350, seller: 'ฟ้า (การบัญชี)', category: 'อิเล็กทรอนิกส์', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80', shape3d: 'sphere', color3d: '#8b5cf6' },
  { id: 3, name: 'เสื้อช็อปวิทยาลัย ไซส์ L', price: 200, seller: 'บอย (ช่างยนต์)', category: 'เสื้อผ้า', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80', shape3d: 'torus', color3d: '#ec4899' },
  { id: 4, name: 'กระเป๋าเป้สะพายหลัง กันน้ำ', price: 290, seller: 'เมย์ (การตลาด)', category: 'แฟชั่น', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', shape3d: 'box', color3d: '#10b981' },
  { id: 5, name: 'เครื่องคิดเลขวิทยาศาสตร์ Casio', price: 400, seller: 'นนท์ (อิเล็กทรอนิกส์)', category: 'อุปกรณ์การเรียน', image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=400&q=80', shape3d: 'box', color3d: '#f59e0b' },
];

function InteractiveProductMesh({ shape, color }: { shape: string; color: string }) {
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        {shape === 'box' && (
          <Box ref={meshRef} args={[2, 2.8, 0.4]}>
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
          </Box>
        )}
        {shape === 'sphere' && (
          <Sphere ref={meshRef} args={[1.4, 64, 64]}>
            <MeshWobbleMaterial color={color} factor={0.3} speed={2} roughness={0.2} metalness={0.8} />
          </Sphere>
        )}
        {shape === 'torus' && (
          <Torus ref={meshRef} args={[1.2, 0.5, 32, 100]}>
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
          </Torus>
        )}
      </Float>
      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} />
    </>
  );
}

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct3D, setSelectedProduct3D] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      style={{
        backgroundColor: isDarkMode ? '#020617' : '#f8fafc',
        color: isDarkMode ? '#ffffff' : '#0f172a',
        minHeight: '100vh',
        transition: 'all 0.3s ease'
      }}
      className="font-sans relative"
    >
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div 
          style={{ backgroundColor: isDarkMode ? '#2563eb' : '#93c5fd' }}
          className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" 
        />
        <div 
          style={{ backgroundColor: isDarkMode ? '#4f46e5' : '#c084fc' }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 pb-32">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Link href="/">
            <div 
              style={{
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0',
                color: isDarkMode ? '#ffffff' : '#0f172a'
              }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-lg backdrop-blur-md"
            >
              <Store className="w-6 h-6 text-blue-500" />
              <span className="font-bold tracking-wide text-lg">College Market</span>
            </div>
          </Link>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1',
              color: isDarkMode ? '#facc15' : '#0f172a'
            }}
            className="p-3 rounded-2xl border shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Search Bar */}
        <section className="mb-8 max-w-xl mx-auto">
          <div 
            style={{
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'
            }}
            className="flex items-center rounded-2xl border shadow-xl backdrop-blur-md overflow-hidden"
          >
            <Search className="w-5 h-5 ml-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า ชื่อผู้ขาย..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
              className="w-full px-4 py-3.5 bg-transparent outline-none placeholder-slate-400"
            />
          </div>
        </section>

        {/* Product List */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">สินค้ามาใหม่</h2>
          </div>
          <span className="text-sm text-slate-400">ทั้งหมด {filteredProducts.length} รายการ</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
              }}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl border shadow-md backdrop-blur-md transition-all hover:border-blue-500/50"
            >
              {/* Product Image Clickable */}
              <div 
                onClick={() => setSelectedImage(product.image)}
                className="relative cursor-pointer group w-full sm:w-28 h-28 overflow-hidden rounded-2xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              <div className="flex-1 w-full text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {product.category}
                </span>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-slate-400 mt-0.5">{product.seller}</p>
                <p className="text-lg font-extrabold text-blue-500 mt-2">฿{product.price}</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedProduct3D(product)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-blue-400 font-medium border border-blue-500/30 shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Rotate3d className="w-4 h-4" /> ดูแบบ 3D
                </button>

                <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <MessageCircle className="w-4 h-4" /> ติดต่อซื้อ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl max-h-[80vh] z-10 overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white z-20"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedImage} alt="Product Preview" className="w-full h-full object-contain max-h-[80vh]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3D MODAL POPUP */}
      <AnimatePresence>
        {selectedProduct3D && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct3D(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1',
                color: isDarkMode ? '#ffffff' : '#0f172a'
              }}
              className="relative w-full max-w-lg rounded-3xl border shadow-2xl p-6 overflow-hidden z-10"
            >
              <button
                onClick={() => setSelectedProduct3D(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2 text-blue-500 text-sm font-semibold">
                <Rotate3d className="w-4 h-4 animate-spin" />
                <span>3D Interactive Viewer</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{selectedProduct3D.name}</h3>
              <p className="text-sm text-slate-400 mb-4">คลิกลากเมาส์เพื่อหมุนดูโมเดล 3D ได้ 360 องศา</p>

              <div className="w-full h-64 bg-slate-950/40 rounded-2xl overflow-hidden border border-white/10 relative">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <InteractiveProductMesh 
                    shape={selectedProduct3D.shape3d} 
                    color={selectedProduct3D.color3d} 
                  />
                </Canvas>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-slate-400 pointer-events-none bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
                  🖱️ คลิกลากเพื่อหมุน 3D
                </span>
              </div>

              <div className="mt-5 flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-400 block">ราคาขาย</span>
                  <span className="text-2xl font-extrabold text-blue-500">฿{selectedProduct3D.price}</span>
                </div>
                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/20 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> สนใจสั่งซื้อ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div 
          style={{
            backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
          }}
          className="flex items-center gap-2 p-2 rounded-full border shadow-2xl backdrop-blur-xl"
        >
          <Link href="/home">
            <button className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium flex items-center gap-2 text-sm shadow-md">
              <Compass className="w-4 h-4" />
              <span>สำรวจตลาด</span>
            </button>
          </Link>

          <Link href="/product">
            <button 
              style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}
              className="px-5 py-2.5 rounded-full font-medium flex items-center gap-2 text-sm hover:text-blue-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>ลงขายสินค้า</span>
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}