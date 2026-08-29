'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Cylinder, Torus, Cone } from '@react-three/drei';
import { ArrowLeft, MessageCircle, ShieldCheck, User, Box as BoxIcon, Image as ImageIcon } from 'lucide-react';

const PRODUCTS_DATA: Record<string, any> = {
  '1': {
    name: 'หนังสือเรียน Basic Electronics 3D',
    category: 'หนังสือ/การเรียน',
    price: 250,
    seller: 'กิตติพงษ์ (แผนกอิเล็กทรอนิกส์)',
    description: 'หนังสือพื้นฐานวงจรอิเล็กทรอนิกส์ สภาพดีมาก ไม่มีหน้าขาด อ่านจบแล้วส่งต่อให้รุ่นน้องครับ',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    type: 'book',
  },
  '2': {
    name: 'เสื้อช็อปวิทยาลัย Size L',
    category: 'เสื้อผ้า/เครื่องแต่งกาย',
    price: 180,
    seller: 'อนวัช (ช่างยนต์)',
    description: 'เสื้อช็อปปักโลโก้วิทยาลัย ขนาด L ซักสะอาดเรียบร้อย กระดุมครบทุกเม็ด',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    type: 'shirt',
  },
  '3': {
    name: 'ชุดวงจรไมโครคอนโทรลเลอร์ Arduino',
    category: 'อุปกรณ์การเรียน',
    price: 420,
    seller: 'ธนกฤต (คอมพิวเตอร์)',
    description: 'บอร์ดทดลองพร้อมสายไฟและเซนเซอร์พื้นฐาน ซื้อมาเกินโครงงาน ไม่ได้ใช้งานครับ',
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80',
    type: 'tech',
  },
  '4': {
    name: 'กระเป๋าเป้ใส่โน้ตบุ๊ก 15.6 นิ้ว',
    category: 'กระเป๋า/รองเท้า',
    price: 320,
    seller: 'ศิริพร (การบัญชี)',
    description: 'กระเป๋าเป้กันน้ำ มีช่องใส่โน้ตบุ๊กกันกระแทก ซิปใช้งานได้ปกติทุกช่อง',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    type: 'bag',
  },
};

function Product3DView({ type }: { type: string }) {
  const groupRef = useRef<any>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
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
          </group>
        )}
        {type === 'tech' && (
          <group>
            <Box args={[2.4, 1.6, 0.15]}><meshStandardMaterial color="#d97706" roughness={0.2} metalness={0.1} /></Box>
            <Cylinder args={[0.2, 0.2, 0.4, 16]} position={[0.6, -0.2, 0.25]} rotation={[Math.PI / 2, 0, 0]}><meshStandardMaterial color="#3b82f6" metalness={0.5} /></Cylinder>
          </group>
        )}
        {type === 'bag' && (
          <group position={[0, -0.1, 0]}>
            <Box args={[1.7, 2.2, 0.9]}><meshStandardMaterial color="#7c3aed" roughness={0.5} /></Box>
            <Torus args={[0.3, 0.08, 16, 32, Math.PI]} position={[0, 1.15, 0]}><meshStandardMaterial color="#4c1d95" /></Torus>
          </group>
        )}
      </Float>
      <OrbitControls enableZoom={true} />
    </group>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = PRODUCTS_DATA[id] || PRODUCTS_DATA['1'];
  const [is3DView, setIs3DView] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/market" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-4 h-4" /> กลับไปหน้าร้านค้า
        </Link>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* ฝั่งแสดงผลภาพ/3D */}
          <div className="h-80 bg-slate-50 rounded-2xl relative overflow-hidden border border-slate-100 flex items-center justify-center">
            <button
              onClick={() => setIs3DView(!is3DView)}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-slate-700 border border-slate-200 shadow-sm z-20 flex items-center gap-1.5 cursor-pointer"
            >
              {is3DView ? <><ImageIcon className="w-4 h-4" /> ดูรูปจริง</> : <><BoxIcon className="w-4 h-4 text-blue-600" /> ดูโมเดล 3D</>}
            </button>

            {is3DView ? (
              <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                <Product3DView type={product.type} />
              </Canvas>
            ) : (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            )}
          </div>

          {/* ฝั่งรายละเอียดสินค้า */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                {product.category}
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-2">{product.name}</h1>
              <div className="text-3xl font-black text-blue-600 mt-2">฿{product.price}</div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <User className="w-4 h-4 text-blue-600" />
                <span>ผู้ขาย: {product.seller}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ยืนยันตัวตนผ่านระบบวิทยาลัยแล้ว</span>
              </div>
            </div>

            <button 
              onClick={() => alert(`ติดต่อนัดรับสินค้ากับ ${product.seller}`)}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span>ทักแชตติดต่อผู้ขาย</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}