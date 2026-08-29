'use client';

import { useState } from 'react';
import Link from 'next/link';

const featuredProducts = [
  {
    id: '1',
    name: 'Smart Watch Pro',
    category: 'Gadgets',
    price: 5900,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    desc: 'หน้าจอ AMOLED แสดงผลสีสันสดใส พร้อมระบบตรวจวัดสุขภาพ 24 ชั่วโมง',
  },
  {
    id: '2',
    name: 'Serum Glow Skin',
    category: 'Cosmetics',
    price: 1290,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    desc: 'เซรั่มบำรุงผิวล้ำลึกเพิ่มความกระจ่างใส ซึมไว ไม่เหนียวเหนอะหนะ',
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    category: 'Audio',
    price: 3490,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    desc: 'ระบบตัดเสียงรบกวน Active Noise Cancelling แบตเตอรี่ยาวนาน 30 ชม.',
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [selected3D, setSelected3D] = useState<typeof featuredProducts[0] | null>(null);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navigation Bar */}
      <nav className={`flex items-center justify-between px-8 py-4 border-b ${darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white/90'} backdrop-blur-md sticky top-0 z-40`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition">
            M
          </div>
          <span className="font-bold text-xl tracking-tight">MarketX</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/market" className={`text-sm font-medium hover:text-indigo-400 transition ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            ตลาดสินค้า
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition transform active:scale-95 ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {darkMode ? '☀️ โหมดสว่าง' : '🌙 โหมดมืด'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block mb-4">
          ✨ ประสบการณ์ช้อปปิ้งมิติใหม่
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          ค้นพบสินค้าไอที & เครื่องสำอางระดับพรีเมียม
        </h1>
        <p className={`text-base md:text-lg max-w-2xl mx-auto mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          เลือกชมสินค้าราคาพิเศษ พร้อมระบบแสดงผลแบบโมเดล 3D ให้คุณเห็นรายละเอียดสินค้าได้สมจริงทุกมุมมอง
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/market"
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:opacity-90 transition transform active:scale-95"
          >
            เข้าสู่หน้าตลาดสินค้า →
          </Link>
          <button
            onClick={() => setSelected3D(featuredProducts[0])}
            className={`px-6 py-3 rounded-xl text-sm font-semibold border transition ${
              darkMode 
                ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800' 
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
            }`}
          >
            🧊 ดูตัวอย่างสินค้า 3D
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span>🔥</span> สินค้าแนะนำไฮไลต์
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50 hover:shadow-indigo-500/10'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-slate-300/50'
              }`}
            >
              {/* Product Image */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-800 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                  {product.category}
                </span>
                <button
                  onClick={() => setSelected3D(product)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20 hover:bg-indigo-600 transition flex items-center gap-1 shadow-lg"
                >
                  🧊 ดู 3D
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className={`text-xs line-clamp-2 mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {product.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-500/10">
                  <span className="text-xl font-extrabold text-indigo-400">฿{product.price.toLocaleString()}</span>
                  <Link
                    href="/market"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    ดูรายละเอียด →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Preview Modal */}
      {selected3D && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl transition-all ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span>🧊</span> 3D Preview: {selected3D.name}
              </h3>
              <button
                onClick={() => setSelected3D(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-500/20 text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <div className="h-64 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-indigo-500/30 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-28 h-28 border-4 border-indigo-500/80 rounded-2xl animate-spin-slow flex items-center justify-center shadow-lg shadow-indigo-500/30 bg-indigo-500/10">
                <img
                  src={selected3D.image}
                  alt="3D Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              <p className="mt-4 text-xs text-indigo-300">
                👆 แสดงผลโมเดล 3D Interactive (360° View)
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-bold text-indigo-400">฿{selected3D.price.toLocaleString()}</span>
              <button
                onClick={() => setSelected3D(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}