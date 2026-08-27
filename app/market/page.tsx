'use client';

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Cylinder, Torus, Cone } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Store, Search, PlusCircle, X, Filter, ShoppingBag, ArrowLeft, Box as BoxIcon, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'หนังสือเรียน Basic Electronics 3D',
    category: 'หนังสือ/การเรียน',
    price: 250,
    seller: 'กิตติพงษ์ (แผนกอิเล็กทรอนิกส์)',
    description: 'หนังสือพื้นฐานวงจรอิเล็กทรอนิกส์ สภาพดีมาก ไม่มีหน้าขาด อ่านจบแล้วส่งต่อให้รุ่นน้องครับ',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    type: 'book',
  },
  {
    id: '2',
    name: 'เสื้อช็อปวิทยาลัย Size L',
    category: 'เสื้อผ้า/เครื่องแต่งกาย',
    price: 180,
    seller: 'อนวัช (ช่างยนต์)',
    description: 'เสื้อช็อปปักโลโก้วิทยาลัย ขนาด L ซักสะอาดเรียบร้อย กระดุมครบทุกเม็ด',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    type: 'shirt',
  },
  {
    id: '3',
    name: 'ชุดวงจรไมโครคอนโทรลเลอร์ Arduino',
    category: 'อุปกรณ์การเรียน',
    price: 420,
    seller: 'ธนกฤต (คอมพิวเตอร์)',
    description: 'บอร์ดทดลองพร้อมสายไฟและเซนเซอร์พื้นฐาน ซื้อมาเกินโครงงาน ไม่ได้ใช้งานครับ',
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80',
    type: 'tech',
  },
  {
    id: '4',
    name: 'กระเป๋าเป้ใส่โน้ตบุ๊ก 15.6 นิ้ว',
    category: 'กระเป๋า/รองเท้า',
    price: 320,
    seller: 'ศิริพร (การบัญชี)',
    description: 'กระเป๋าเป้กันน้ำ มีช่องใส่โน้ตบุ๊กกันกระแทก ซิปใช้งานได้ปกติทุกช่อง',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    type: 'bag',
  },
];

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
        {type === 'book' && (
          <group>
            <Box args={[1.8, 2.4, 0.35]}><meshStandardMaterial color="#2563eb" roughness={0.3} /></Box>
            <Box args={[1.68, 2.3, 0.28]} position={[0.05, 0, 0]}><meshStandardMaterial color="#f8fafc" roughness={0.9} /></Box>
          </group>
        )}
        {type === 'shirt' && (
          <group>
            <Box args={[1.8, 2.2, 0.5]} position={[0, -0.1, 0]}><meshStandardMaterial color="#059669" roughness={0.4} /></Box>
            <Cone args={[0.5, 0.4, 4]} position={[0, 1.1, 0]} rotation={[0, 0, Math.PI]}><meshStandardMaterial color="#047857" /></Cone>
            <Box args={[0.6, 0.9, 0.45]} position={[-1.1, 0.5, 0]} rotation={[0, 0, -0.4]}><meshStandardMaterial color="#059669" /></Box>
            <Box args={[0.6, 0.9, 0.45]} position={[1.1, 0.5, 0]} rotation={[0, 0, 0.4]}><meshStandardMaterial color="#059669" /></Box>
          </group>
        )}
        {type === 'tech' && (
          <group>
            <Box args={[2.4, 1.6, 0.15]}><meshStandardMaterial color="#d97706" roughness={0.2} metalness={0.1} /></Box>
            <Box args={[0.8, 0.6, 0.1]} position={[-0.4, 0.2, 0.12]}><meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} /></Box>
            <Cylinder args={[0.2, 0.2, 0.4, 16]} position={[0.6, -0.2, 0.25]} rotation={[Math.PI / 2, 0, 0]}><meshStandardMaterial color="#3b82f6" metalness={0.5} /></Cylinder>
            <Cylinder args={[0.18, 0.18, 0.35, 16]} position={[0.6, 0.3, 0.22]} rotation={[Math.PI / 2, 0, 0]}><meshStandardMaterial color="#ef4444" metalness={0.5} /></Cylinder>
          </group>
        )}
        {type === 'bag' && (
          <group position={[0, -0.1, 0]}>
            <Box args={[1.7, 2.2, 0.9]}><meshStandardMaterial color="#7c3aed" roughness={0.5} /></Box>
            <Box args={[1.3, 1.1, 0.35]} position={[0, -0.4, 0.55]}><meshStandardMaterial color="#6d28d9" roughness={0.5} /></Box>
            <Torus args={[0.3, 0.08, 16, 32, Math.PI]} position={[0, 1.15, 0]}><meshStandardMaterial color="#4c1d95" /></Torus>
          </group>
        )}
      </Float>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </group>
  );
}

export default function MarketPage() {
  const router = useRouter();
  const [products] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');
  
  // สถานะเก็บรายการสินค้าที่สลับเป็นโหมด 3D
  const [active3DIds, setActive3DIds] = useState<Record<string, boolean>>({});

  const toggle3DView = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // ไม่ให้กดสลับโหมดแล้วเผลอลิงก์ไปหน้าสินค้า
    setActive3DIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = ['ทั้งหมด', 'หนังสือ/การเรียน', 'เสื้อผ้า/เครื่องแต่งกาย', 'อุปกรณ์การเรียน', 'กระเป๋า/รองเท้า'];

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* Category Filters */}
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

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => {
              const is3D = active3DIds[item.id];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  <div className="h-56 bg-slate-50 relative flex items-center justify-center border-b border-slate-100 overflow-hidden">
                    
                    {/* หมวดหมู่สินค้า */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200/80 backdrop-blur-sm text-[10px] font-semibold text-slate-600 z-10">
                      {item.category}
                    </div>

                    {/* ปุ่มสลับ รูปจริง <-> โมเดล 3D */}
                    <button
                      onClick={(e) => toggle3DView(e, item.id)}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md transition-all z-20 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                        is3D
                          ? 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700'
                          : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
                      }`}
                    >
                      {is3D ? (
                        <>
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>ดูรูปจริง</span>
                        </>
                      ) : (
                        <>
                          <BoxIcon className="w-3.5 h-3.5 text-blue-600" />
                          <span>ดู 3D</span>
                        </>
                      )}
                    </button>

                    {/* แสดงผลตามโหมดที่เลือก */}
                    {is3D ? (
                      <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }}>
                        <RealisticProduct3D type={item.type} />
                      </Canvas>
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 group-hover:text-blue-600 font-medium transition-colors bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {is3D ? '🖱️ คลิกหมุน 3D' : '🔍 คลิกดูรายละเอียด'}
                    </div>
                  </div>

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
              );
            })}
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
    </div>
  );
}