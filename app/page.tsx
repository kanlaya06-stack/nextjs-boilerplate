'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Store, ArrowRight, ShieldCheck, Box, MessageSquare, Sparkles, Layers } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Background Subtle Light Blobs */}
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
              <span className="text-blue-600">มินิมอล 3D</span> สำหรับนักศึกษา
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
                <p className="text-xs text-slate-500 mt-1">มุมมอง 3 มิติ</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900">Direct</h4>
                <p className="text-xs text-slate-500 mt-1">แชทตรงผู้ขาย</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full h-[360px] sm:h-[420px] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl shadow-blue-500/20 overflow-hidden flex flex-col items-center justify-center p-8 text-white text-center">
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs text-white z-10 font-medium">
                <Box className="w-3.5 h-3.5" />
                <span>3D Interactive Market</span>
              </div>

              <motion.div 
                animate={{ rotate: [0, 5, -5, 0], y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl flex items-center justify-center shadow-2xl my-auto"
              >
                <Store className="w-16 h-16 text-white" />
              </motion.div>

              <div className="space-y-1">
                <h3 className="font-bold text-lg">College Market 3D</h3>
                <p className="text-xs text-blue-100 opacity-90">ระบบซื้อขายแลกเปลี่ยนมือสองสำหรับนักศึกษา</p>
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
            <div className="p-3 ro'use client';

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Cylinder, Sphere, Torus, Cone } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, Search, PlusCircle, X, ShieldCheck, 
  Filter, ShoppingBag, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

// Mock Data รายการสินค้า 3D
const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'หนังสือเรียน Basic Electronics 3D',
    category: 'หนังสือ/การเรียน',
    price: 250,
    condition: 'สภาพ 95% (มีไฮไลท์นิดหน่อย)',
    seller: 'กิตติพงษ์ (แผนกอิเล็กทรอนิกส์)',
    description: 'หนังสือพื้นฐานวงจรอิเล็กทรอนิกส์ สภาพดีมาก ไม่มีหน้าขาด อ่านจบแล้วส่งต่อให้รุ่นน้องครับ',
    type: 'book',
  },
  {
    id: '2',
    name: 'เสื้อช็อปวิทยาลัย Size L',
    category: 'เสื้อผ้า/เครื่องแต่งกาย',
    price: 180,
    condition: 'มือสอง สภาพดี',
    seller: 'อนวัช (ช่างยนต์)',
    description: 'เสื้อช็อปปักโลโก้วิทยาลัย ขนาด L ซักสะอาดเรียบร้อย กระดุมครบทุกเม็ด',
    type: 'shirt',
  },
  {
    id: '3',
    name: 'ชุดวงจรไมโครคอนโทรลเลอร์ Arduino',
    category: 'อุปกรณ์การเรียน',
    price: 420,
    condition: 'ของใหม่ Unbox',
    seller: 'ธนกฤต (คอมพิวเตอร์)',
    description: 'บอร์ดทดลองพร้อมสายไฟและเซนเซอร์พื้นฐาน ซื้อมาเกินโครงงาน ไม่ได้ใช้งานครับ',
    type: 'tech',
  },
  {
    id: '4',
    name: 'กระเป๋าเป้ใส่โน้ตบุ๊ก 15.6 นิ้ว',
    category: 'กระเป๋า/รองเท้า',
    price: 320,
    condition: 'สภาพ 90%',
    seller: 'ศิริพร (การบัญชี)',
    description: 'กระเป๋าเป้กันน้ำ มีช่องใส่โน้ตบุ๊กกันกระแทก ซิปใช้งานได้ปกติทุกช่อง',
    type: 'bag',
  },
];

// Component สร้างโมเดล 3D แต่ละรูปทรง
function RealisticProduct3D({ type }: { type: string }) {
  const groupRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-5, -4, -4]} intensity={0.8} color="#93c5fd" />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* โมเดลหนังสือ 3D */}
        {type === 'book' && (
          <group>
            {/* ตัวปกหนังสือ */}
            <Box args={[1.8, 2.4, 0.35]}>
              <meshStandardMaterial color="#2563eb" roughness={0.3} />
            </Box>
            {/* สันกระดาษข้างใน */}
            <Box args={[1.68, 2.3, 0.28]} position={[0.05, 0, 0]}>
              <meshStandardMaterial color="#f8fafc" roughness={0.9} />
            </Box>
          </group>
        )}

        {/* โมเดลเสื้อช็อป 3D */}
        {type === 'shirt' && (
          <group>
            {/* ลำตัวเสื้อ */}
            <Box args={[1.8, 2.2, 0.5]} position={[0, -0.1, 0]}>
              <meshStandardMaterial color="#059669" roughness={0.4} />
            </Box>
            {/* ปกเสื้อ */}
            <Cone args={[0.5, 0.4, 4]} position={[0, 1.1, 0]} rotation={[0, 0, Math.PI]}>
              <meshStandardMaterial color="#047857" />
            </Cone>
            {/* แขนเสื้อซ้าย-ขวา */}
            <Box args={[0.6, 0.9, 0.45]} position={[-1.1, 0.5, 0]} rotation={[0, 0, -0.4]}>
              <meshStandardMaterial color="#059669" />
            </Box>
            <Box args={[0.6, 0.9, 0.45]} position={[1.1, 0.5, 0]} rotation={[0, 0, 0.4]}>
              <meshStandardMaterial color="#059669" />
            </Box>
          </group>
        )}

        {/* โมเดลบอร์ดอิเล็กทรอนิกส์ 3D */}
        {type === 'tech' && (
          <group>
            {/* แผงวงจรหลัก */}
            <Box args={[2.4, 1.6, 0.15]}>
              <meshStandardMaterial color="#d97706" roughness={0.2} metalness={0.1} />
            </Box>
            {/* ชิป IC 3D */}
            <Box args={[0.8, 0.6, 0.1]} position={[-0.4, 0.2, 0.12]}>
              <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
            </Box>
            {/* ตัวเก็บประจุทรงกระบอก */}
            <Cylinder args={[0.2, 0.2, 0.4, 16]} position={[0.6, -0.2, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#3b82f6" metalness={0.5} />
            </Cylinder>
            <Cylinder args={[0.18, 0.18, 0.35, 16]} position={[0.6, 0.3, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#ef4444" metalness={0.5} />
            </Cylinder>
          </group>
        )}

        {/* โมเดลกระเป๋าเป้ 3D */}
        {type === 'bag' && (
          <group position={[0, -0.1, 0]}>
            {/* กระเป๋าใบใหญ่ */}
            <Box args={[1.7, 2.2, 0.9]}>
              <meshStandardMaterial color="#7c3aed" roughness={0.5} />
            </Box>
            {/* ช่องกระเป๋าหน้า */}
            <Box args={[1.3, 1.1, 0.35]} position={[0, -0.4, 0.55]}>
              <meshStandardMaterial color="#6d28d9" roughness={0.5} />
            </Box>
            {/* หูหิ้วกระเป๋า */}
            <Torus args={[0.3, 0.08, 16, 32, Math.PI]} position={[0, 1.15, 0]}>
              <meshStandardMaterial color="#4c1d95" />
            </Torus>
          </group>
        )}
      </Float>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </group>
  );
}

export default function MarketplacePage() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<typeof INITIAL_PRODUCTS[0] | null>(null);

  const categories = ['ทั้งหมด', 'หนังสือ/การเรียน', 'เสื้อผ้า/เครื่องแต่งกาย', 'อุปกรณ์การเรียน', 'กระเป๋า/รองเท้า'];

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-500 selection:text-white pb-20">
      
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
                College Market <span className="text-blue-600 text-xs px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 font-bold">3D</span>
              </h1>
              <p className="text-xs text-slate-500">ตลาดซื้อขายมือสองภายในวิทยาลัย</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า หรือผู้ขาย..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 border border-transparent focus:border-blue-500 focus:bg-white text-sm outline-none transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <Link href="/product">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer">
              <PlusCircle className="w-4 h-4" />
              <span>ลงขายสินค้า</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <span>รายการสินค้าทั้งหมด</span>
            <span className="text-xs bg-slate-200 text-slate-700 font-medium px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} รายการ
            </span>
          </h2>
        </div>

        {/* Product Cards */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveProduct(item)}
                className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                {/* 3D Model Display Canvas */}
                <div className="h-52 bg-slate-50 relative flex items-center justify-center border-b border-slate-100">
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200/80 backdrop-blur-sm text-[10px] font-semibold text-slate-600 z-10">
                    {item.category}
                  </div>
                  <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }}>
                    <RealisticProduct3D type={item.type} />
                  </Canvas>
                  <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 group-hover:text-blue-600 font-medium transition-colors">
                    🖱️ หมุนดู 3D
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">ราคา</span>
                      <span className="text-lg font-extrabold text-blue-600">฿{item.price}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {item.seller.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200/80 rounded-3xl p-8 space-y-3">
            <p className="text-slate-400 font-medium text-base">ไม่พบสินค้าที่คุณค้นหา</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('ทั้งหมด'); }}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              ล้างการค้นหาทั้งหมด
            </button>
          </div>
        )}
      </main>

      {/* Modal Popup */}
      <AnimatePresence>
        {activeProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative border border-slate-100"
            >
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-full bg-slate-50 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-100 min-h-[280px]">
                  <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }}>
                    <RealisticProduct3D type={activeProduct.type} />
                  </Canvas>
                  <span className="absolute bottom-3 text-xs text-slate-400 bg-white/80 px-3 py-1 rounded-full border border-slate-200/60 backdrop-blur-sm">
                    คลิกลากเพื่อหมุนสินค้า 3D
                  </span>
                </div>

                <div className="p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60">
                      {activeProduct.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">{activeProduct.name}</h3>
                    <p className="text-2xl font-extrabold text-blue-600">฿{activeProduct.price}</p>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {activeProduct.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 pt-2">
                      <p>✨ <strong>สภาพสินค้า:</strong> {activeProduct.condition}</p>
                      <p>👤 <strong>ผู้ขาย:</strong> {activeProduct.seller}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`ติดต่อผู้ขาย: ${activeProduct.seller}`)}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>แชทติดต่อผู้ซื้อขาย</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
    </div>
  );
}