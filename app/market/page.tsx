'use client';

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Cylinder, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Store, Search, PlusCircle, X, Filter, ShoppingBag, ArrowLeft, Box as BoxIcon, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 💄 ปรับข้อมูลสินค้าเป็นเครื่องสำอางและบิวตี้
const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'ลิปสติก Velvet Matte Shades #04',
    category: 'ลิปสติก/ลิปบาล์ม',
    price: 159,
    seller: 'มินตรา (เอกการตลาด)',
    description: 'ลิปแมตต์เนื้อกำมะหยี่ สีโทนส้มอิฐสวยมาก สภาพ 95% ลองปาดไปแค่ครั้งเดียว ส่งต่อเพราะซื้อมาซ้ำค่ะ',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80',
    type: 'lipstick',
  },
  {
    id: '2',
    name: 'รองพื้น Hydrating Foundation SPF30',
    category: 'รองพื้น/แป้งพัฟ',
    price: 290,
    seller: 'กชกร (แผนกบัญชี)',
    description: 'รองพื้นเนื้อบางเบา งานผิวฉ่ำวาว โทนผิวขาวเหลือง (21N) เหลือประมาณ 80% ของแท้ 100% ค่ะ',
    imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&auto=format&fit=crop&q=80',
    type: 'foundation',
  },
  {
    id: '3',
    name: 'น้ำหอม Floral Eau De Parfum 50ml',
    category: 'น้ำหอม',
    price: 350,
    seller: 'ชลธิชา (คอมพิวเตอร์)',
    description: 'น้ำหอมกลิ่นฟลอรัลหอมหวานละมุน ติดทนนาน 6-8 ชม. ปริมาณเหลือเต็มขวด กดฉีดไป 2-3 ครั้งเองค่ะ',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
    type: 'perfume',
  },
  {
    id: '4',
    name: 'พาเลตต์อายแชโดว์ Earth Tone 9 สี',
    category: 'แต่งตา/บลัชออน',
    price: 199,
    seller: 'แพรวา (การจัดการ)',
    description: 'อายแชโดว์พาเลตต์โทนน้ำตาลธรรมชาติ มีทั้งเนื้อแมตต์และชิมเมอร์วิ้งๆ แต่งง่ายได้ทุกวัน สภาพดีมาก',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80',
    type: 'palette',
  },
];

// 🎨 ปรับการเรนเดอร์โมเดล 3D ให้เป็นทรงเครื่องสำอาง
function CosmeticsProduct3D({ type }: { type: string }) {
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
      <directionalLight position={[-5, -4, -4]} intensity={0.8} color="#fbcfe8" />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* โมเดลลิปสติก */}
        {type === 'lipstick' && (
          <group position={[0, -0.2, 0]}>
            <Cylinder args={[0.35, 0.35, 1.2, 32]} position={[0, -0.4, 0]}>
              <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.22, 0.22, 0.5, 32]} position={[0, 0.2, 0]}>
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
            </Cylinder>
            <Cylinder args={[0.2, 0.05, 0.6, 32]} position={[0, 0.65, 0]} rotation={[0, 0, -0.2]}>
              <meshStandardMaterial color="#be123c" roughness={0.3} />
            </Cylinder>
          </group>
        )}

        {/* โมเดลขวดรองพื้น */}
        {type === 'foundation' && (
          <group position={[0, -0.1, 0]}>
            <Cylinder args={[0.55, 0.55, 1.6, 32]} position={[0, -0.2, 0]}>
              <meshStandardMaterial color="#fde68a" roughness={0.4} transparent opacity={0.9} />
            </Cylinder>
            <Cylinder args={[0.3, 0.3, 0.4, 32]} position={[0, 0.7, 0]}>
              <meshStandardMaterial color="#0f172a" metalness={0.5} />
            </Cylinder>
            <Box args={[0.15, 0.25, 0.3]} position={[0.15, 0.8, 0]}>
              <meshStandardMaterial color="#0f172a" />
            </Box>
          </group>
        )}

        {/* โมเดลขวดน้ำหอม */}
        {type === 'perfume' && (
          <group position={[0, -0.1, 0]}>
            <Box args={[1.2, 1.4, 0.7]} position={[0, -0.2, 0]}>
              <meshStandardMaterial color="#f472b6" roughness={0.1} metalness={0.1} transparent opacity={0.75} />
            </Box>
            <Cylinder args={[0.2, 0.2, 0.3, 32]} position={[0, 0.65, 0]}>
              <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
            </Cylinder>
            <Sphere args={[0.28, 32, 32]} position={[0, 1.05, 0]}>
              <meshStandardMaterial color="#ffffff" roughness={0.1} transparent opacity={0.8} />
            </Sphere>
          </group>
        )}

        {/* โมเดลตลับแป้ง/ตลับพาเลตต์ */}
        {type === 'palette' && (
          <group position={[0, 0, 0]} rotation={[0.4, 0, 0]}>
            <Box args={[1.8, 1.4, 0.25]}>
              <meshStandardMaterial color="#fb7185" roughness={0.3} />
            </Box>
            <Box args={[1.6, 1.2, 0.05]} position={[0, 0, 0.13]}>
              <meshStandardMaterial color="#fff1f2" roughness={0.5} />
            </Box>
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
  const [active3DIds, setActive3DIds] = useState<Record<string, boolean>>({});

  const toggle3DView = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActive3DIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 💄 ปรับหมวดหมู่สินค้า
  const categories = ['ทั้งหมด', 'ลิปสติก/ลิปบาล์ม', 'รองพื้น/แป้งพัฟ', 'น้ำหอม', 'แต่งตา/บลัชออน'];

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fff5f7] text-slate-800 font-sans pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl border border-pink-200 hover:bg-pink-50 text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="p-2.5 rounded-xl bg-pink-500 text-white shadow-md shadow-pink-500/20">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
                Beauty Market <span className="text-pink-600 text-xs px-2 py-0.5 rounded-md bg-pink-50 border border-pink-200 font-bold">3D</span>
              </h1>
              <p className="text-xs text-slate-500">ตลาดส่งต่อเครื่องสำอางและสกินแคร์มือสอง</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาเครื่องสำอาง หรือผู้ขาย..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-pink-50/50 border border-pink-100 focus:border-pink-400 focus:bg-white text-sm outline-none transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <Link href="/product">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm shadow-md shadow-pink-500/20 transition-all cursor-pointer">
              <PlusCircle className="w-4 h-4" />
              <span>ส่งต่อเครื่องสำอาง</span>
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-pink-400 mr-2 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-white border border-pink-100 text-slate-600 hover:bg-pink-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-b border-pink-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pink-500" />
            <span>รายการสินค้าทั้งหมด</span>
            <span className="text-xs bg-pink-100 text-pink-700 font-medium px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} รายการ
            </span>
          </h2>
        </div>

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
                  className="bg-white border border-pink-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
                >
                  <div className="h-56 bg-pink-50/30 relative flex items-center justify-center border-b border-pink-50 overflow-hidden">
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 border border-pink-100 backdrop-blur-sm text-[10px] font-semibold text-pink-600 z-10">
                      {item.category}
                    </div>

                    <button
                      onClick={(e) => toggle3DView(e, item.id)}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md transition-all z-20 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                        is3D
                          ? 'bg-pink-500 text-white border-pink-400 hover:bg-pink-600'
                          : 'bg-white/90 text-slate-700 border-pink-100 hover:bg-white'
                      }`}
                    >
                      {is3D ? (
                        <>
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>ดูรูปจริง</span>
                        </>
                      ) : (
                        <>
                          <BoxIcon className="w-3.5 h-3.5 text-pink-500" />
                          <span>ดู 3D</span>
                        </>
                      )}
                    </button>

                    {is3D ? (
                      <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }}>
                        <CosmeticsProduct3D type={item.type} />
                      </Canvas>
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 group-hover:text-pink-500 font-medium transition-colors bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {is3D ? '🖱️ คลิกหมุน 3D' : '🔍 คลิกดูรายละเอียด'}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-pink-500 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-pink-50 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block">ราคา</span>
                        <span className="text-lg font-extrabold text-pink-500">฿{item.price}</span>
                      </div>
                      <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg">
                        {item.seller.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-pink-100 rounded-3xl p-8 space-y-3">
            <p className="text-slate-400 font-medium text-base">ไม่พบสินค้าเครื่องสำอางที่คุณค้นหา</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('ทั้งหมด'); }}
              className="text-xs text-pink-500 font-semibold hover:underline"
            >
              ล้างการค้นหาทั้งหมด
            </button>
          </div>
        )}
      </main>
    </div>
  );
}