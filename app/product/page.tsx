'use client';

import React, { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Box, Cylinder, Torus, Cone } from '@react-three/drei';
import { ArrowLeft, ShieldCheck, MessageSquare, Share2, Heart, Store, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Mock Data สินค้า
const PRODUCTS_DATA: Record<string, any> = {
  '1': {
    id: '1',
    name: 'หนังสือเรียน Basic Electronics 3D Edition',
    category: 'หนังสือ/การเรียน',
    price: 250,
    condition: 'สภาพ 95% (มีไฮไลท์นิดหน่อย)',
    seller: 'กิตติพงษ์ (แผนกอิเล็กทรอนิกส์)',
    description: 'หนังสือพื้นฐานวงจรอิเล็กทรอนิกส์ สภาพดีมาก ไม่มีหน้าขาด เนื้อหาครอบคลุมทฤษฎีและการทดลองวงจร เหมาะสำหรับนักศึกษาแผนกช่างไฟฟ้าและอิเล็กทรอนิกส์ อ่านจบแล้วส่งต่อให้รุ่นน้องครับ',
    type: 'book',
    postedDate: '2 ชั่วโมงที่แล้ว',
    location: 'ตึกแผนกอิเล็กทรอนิกส์',
  },
  '2': {
    id: '2',
    name: 'เสื้อช็อปวิทยาลัย Size L',
    category: 'เสื้อผ้า/เครื่องแต่งกาย',
    price: 180,
    condition: 'มือสอง สภาพดี',
    seller: 'อนวัช (ช่างยนต์)',
    description: 'เสื้อช็อปปักโลโก้วิทยาลัย ขนาด L ซักสะอาดเรียบร้อย กระดุมครบทุกเม็ด ไม่มีรอยขาด นัดรับได้ที่หน้าตึกช่างยนต์ครับ',
    type: 'shirt',
    postedDate: '5 ชั่วโมงที่แล้ว',
    location: 'ตึกช่างยนต์',
  },
  '3': {
    id: '3',
    name: 'ชุดวงจรไมโครคอนโทรลเลอร์ Arduino',
    category: 'อุปกรณ์การเรียน',
    price: 420,
    condition: 'ของใหม่ Unbox',
    seller: 'ธนกฤต (คอมพิวเตอร์)',
    description: 'บอร์ดทดลองพร้อมสายไฟและเซนเซอร์พื้นฐาน ซื้อมาเกินโครงงาน ไม่เคยผ่านการใช้งาน อุปกรณ์ครบกล่องพร้อมต่อใช้งาน',
    type: 'tech',
    postedDate: '1 วันที่แล้ว',
    location: 'ตึกคอมพิวเตอร์',
  },
  '4': {
    id: '4',
    name: 'กระเป๋าเป้ใส่โน้ตบุ๊ก 15.6 นิ้ว',
    category: 'กระเป๋า/รองเท้า',
    price: 320,
    condition: 'สภาพ 90%',
    seller: 'ศิริพร (การบัญชี)',
    description: 'กระเป๋าเป้กันน้ำ มีช่องใส่โน้ตบุ๊กกันกระแทก ซิปใช้งานได้ปกติทุกช่อง มีช่องใส่ขวดน้ำด้านข้าง นัดรับที่โรงอาหารวิทยาลัย',
    type: 'bag',
    postedDate: '2 วันที่แล้ว',
    location: 'โรงอาหารกลาง',
  },
};

function RealisticProduct3D({ type }: { type: string }) {
  const groupRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
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
      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} />
    </group>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const product = PRODUCTS_DATA[productId] || PRODUCTS_DATA['1'];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200/80 px-6 py-4 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าร้านค้า</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-rose-500 transition-all">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 3D Viewport */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm overflow-hidden relative">
            <div className="h-[420px] bg-slate-50 rounded-2xl relative flex items-center justify-center">
              <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }}>
                <RealisticProduct3D type={product.type} />
              </Canvas>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-slate-200/80 px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 shadow-sm flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span>คลิกลากเพื่อหมุน 3D หรือใช้นิ้วขยายดูรายละเอียด</span>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                  {product.category}
                </span>
                <span className="text-xs text-slate-400">{product.postedDate}</span>
              </div>

              <h1 className="text-2xl font-black text-slate-900 leading-snug">{product.name}</h1>
              <div className="text-3xl font-black text-blue-600">฿{product.price}</div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">สภาพสินค้า</span>
                  <span className="font-semibold text-slate-700">{product.condition}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">สถานที่นัดรับ</span>
                  <span className="font-semibold text-slate-700">{product.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <h3 className="text-xs font-bold text-slate-800">รายละเอียดสินค้า</h3>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {product.description}
                </p>
              </div>

              {/* Seller Info Card */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
                  {product.seller[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{product.seller}</h4>
                  <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> ยืนยันตัวตนด้วยรหัสนักศึกษาแล้ว
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => alert(`ส่งข้อความหาผู้ขาย: ${product.seller}`)}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer pt-3"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ทักแชทคุยกับผู้ขาย</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}