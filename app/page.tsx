'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, Search, PlusCircle, X, 
  Filter, ShoppingBag, ArrowRight, Box as BoxIcon, Eye, Loader2
} from 'lucide-react';
import Link from 'next/link';

// Mock Data สินค้า - กำหนด Path ของไฟล์โมเดล .glb จริงไว้ใน modelUrl
const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'หนังสือเรียน Basic Electronics 3D',
    category: 'หนังสือ/การเรียน',
    price: 250,
    condition: 'สภาพ 95%',
    seller: 'กิตติพงษ์ (แผนกอิเล็กทรอนิกส์)',
    description: 'หนังสือพื้นฐานวงจรอิเล็กทรอนิกส์ สภาพดีมาก อ่านจบแล้วส่งต่อครับ',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    // วางไฟล์ .glb ไว้ที่ public/models/book.glb
    modelUrl: '/models/book.glb', 
  },
  {
    id: '2',
    name: 'เสื้อช็อปวิทยาลัย Size L',
    category: 'เสื้อผ้า/เครื่องแต่งกาย',
    price: 180,
    condition: 'มือสอง สภาพดี',
    seller: 'อนวัช (ช่างยนต์)',
    description: 'เสื้อช็อปปักโลโก้วิทยาลัย ขนาด L ซักสะอาดเรียบร้อย กระดุมครบทุกเม็ด',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    modelUrl: '/models/shirt.glb',
  },
  {
    id: '3',
    name: 'ชุดวงจรไมโครคอนโทรลเลอร์ Arduino',
    category: 'อุปกรณ์การเรียน',
    price: 420,
    condition: 'ของใหม่ Unbox',
    seller: 'ธนกฤต (คอมพิวเตอร์)',
    description: 'บอร์ดทดลองพร้อมสายไฟและเซนเซอร์พื้นฐาน ซื้อมาเกินโครงงาน ไม่ได้ใช้งานครับ',
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80',
    modelUrl: '/models/arduino.glb',
  },
  {
    id: '4',
    name: 'กระเป๋าเป้ใส่โน้ตบุ๊ก 15.6 นิ้ว',
    category: 'กระเป๋า/รองเท้า',
    price: 320,
    condition: 'สภาพ 90%',
    seller: 'ศิริพร (การบัญชี)',
    description: 'กระเป๋าเป้กันน้ำ มีช่องใส่โน้ตบุ๊กกันกระแทก ซิปใช้งานได้ปกติทุกช่อง',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    modelUrl: '/models/backpack.glb',
  },
];

// Component สำหรับโหลดและแสดงผลไฟล์โมเดล .glb / .gltf
function ModelViewer({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  
  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

// ตัวโหลดระหว่างรอไฟล์ 3D ดาวน์โหลด
function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-xs font-semibold whitespace-nowrap">กำลังโหลดโมเดล 3D...</span>
      </div>
    </Html>
  );
}

export default function MarketplacePage() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<typeof INITIAL_PRODUCTS[0] | null>(null);
  const [viewMode, setViewMode] = useState<'image' | '3d'>('3d');

  const categories = ['ทั้งหมด', 'หนังสือ/การเรียน', 'เสื้อผ้า/เครื่องแต่งกาย', 'อุปกรณ์การเรียน', 'กระเป๋า/รองเท้า'];

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-20">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
                College Market <span className="text-blue-600 text-xs px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 font-bold">GLTF 3D</span>
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
        
        {/* Categories */}
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

        {/* Grid สินค้า */}
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
                onClick={() => {
                  setActiveProduct(item);
                  setViewMode('3d');
                }}
                className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                {/* 2D Real Image Display */}
                <div className="h-52 bg-slate-100 relative overflow-hidden border-b border-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200/80 backdrop-blur-sm text-[10px] font-semibold text-slate-700 z-10 shadow-sm">
                    {item.category}
                  </div>
                  
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
                      <BoxIcon className="w-4 h-4 text-blue-600" />
                      เปิดดูโมเดล 3D
                    </span>
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
          </div>
        )}
      </main>

      {/* Modal Popup แสดงผลโมเดล 3D (.glb) */}
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
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* 3D Canvas / Image Viewer Area */}
                <div className="h-72 md:h-full bg-slate-50 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-100 min-h-[320px]">
                  
                  {/* Mode Switcher */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-1">
                    <button
                      onClick={() => setViewMode('3d')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        viewMode === '3d' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <BoxIcon className="w-3.5 h-3.5" />
                      <span>โมเดล 3D</span>
                    </button>
                    <button
                      onClick={() => setViewMode('image')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        viewMode === 'image' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>รูปถ่ายจริง</span>
                    </button>
                  </div>

                  {/* Render 3D GLTF File */}
                  {viewMode === '3d' ? (
                    <>
                      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[5, 10, 5]} intensity={2} />
                        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
                        
                        <Suspense fallback={<CanvasLoader />}>
                          <ModelViewer modelUrl={activeProduct.modelUrl} />
                        </Suspense>

                        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} />
                      </Canvas>

                      <span className="absolute bottom-3 text-[11px] text-slate-400 bg-white/90 px-3 py-1 rounded-full border border-slate-200/60 backdrop-blur-sm pointer-events-none">
                        🖱️ ซูม/หมุนดูโมเดล 3D ได้ 360°
                      </span>
                    </>
                  ) : (
                    <img
                      src={activeProduct.imageUrl}
                      alt={activeProduct.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Content Info */}
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
                    <span>ติดต่อผู้ขาย</span>
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