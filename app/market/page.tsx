'use client';

import { useState } from 'react';
import Link from 'next/link';

const products = [
  {
    id: '1',
    name: 'ลิปแมตต์ Velvet Touch Lip Tint',
    category: 'ลิปสติก',
    price: 159,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80',
    desc: 'ลิปทินท์เนื้อเวลเวท นุ่มฟู ติดทนนาน ไม่ตกมุกปาก เหมาะสำหรับนักศึกษาฉีดเติมระหว่างวัน',
  },
  {
    id: '2',
    name: 'กันแดด Sunscreen SPF50+ PA++++',
    category: 'บำรุงผิวหน้า',
    price: 289,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80',
    desc: 'ครีมกันแดดสูตรน้ำ บางเบา คุมมัน ไม่เยิ้มระหว่างวัน เหมาะสำหรับทำกิจกรรมกลางแจ้งในวิทยาลัย',
  },
  {
    id: '3',
    name: 'บลัชออนเนื้อครีม Soft Glow Liquid Blush',
    category: 'บลัชออน',
    price: 129,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80',
    desc: 'บลัชออนเนื้อลิควิด เกลี่ยง่าย ให้แก้มดูมีเลือดฝาดเป็นธรรมชาติ ติดทนนานตลอดวัน',
  },
  {
    id: '4',
    name: 'เซรั่มบำรุงผิวหน้า Hya B5 Hydrating Serum',
    category: 'บำรุงผิวหน้า',
    price: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    desc: 'เซรั่มไฮยาเข้มข้น เติมความชุ่มชื้นให้ผิวอิ่มฟู ลดความหมองคล้ำจากนอนดึก',
  },
  {
    id: '5',
    name: 'พาเลตต์อายแชโดว์ Daily Nude Shadow',
    category: 'แต่งตา',
    price: 249,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80',
    desc: 'อายแชโดว์โทนส้มอิฐ-น้ำตาล ใช้แต่งไปเรียนได้ทุกวัน โทนสีสุภาพติดทนนาน',
  },
  {
    id: '6',
    name: 'แป้งพัฟผสมรองพื้น Matte Coverage Powder',
    category: 'แป้งพัฟ',
    price: 199,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80',
    desc: 'แป้งพัฟคุมมัน เบลอรูขุมขน ปกปิดเรียบเนียน ไม่เป็นคราบระหว่างวัน',
  },
];

export default function MarketPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProduct3D, setSelectedProduct3D] = useState<typeof products[0] | null>(null);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Navigation Bar */}
      <nav className={`flex items-center justify-between px-8 py-4 border-b ${darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white/90'} backdrop-blur-md sticky top-0 z-40`}>
        <div className="flex items-center gap-3">
          <Link href="/" className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition">
            💄
          </Link>
          <span className="font-bold text-xl tracking-tight">College Beauty Market</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className={`text-sm font-medium hover:text-pink-500 transition ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            ← กลับหน้าแรก
          </Link>

          {/* ปุ่มสลับโหมดมืด / โหมดสว่าง */}
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

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 inline-block mb-4">
          ✨ ศูนย์รวมเครื่องสำอางและสกินแคร์ราคานักศึกษา
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
          คัดสรรคุณภาพ เพื่อความมั่นใจในทุกวัน
        </h1>
        <p className={`text-sm md:text-base max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          เลือกชมสินค้าบิวตี้ไอเทมยอดฮิต พร้อมระบบดูตัวอย่างรูปสินค้าแบบ 3D
        </p>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800 hover:border-pink-500/50 hover:shadow-pink-500/10'
                  : 'bg-white border-slate-200 hover:border-pink-300 hover:shadow-slate-300/50'
              }`}
            >
              {/* Product Image */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-800 group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-pink-500 text-white shadow-md">
                  {item.category}
                </span>

                {/* ปุ่มดู 3D บนรูปภาพ */}
                <button
                  onClick={() => setSelectedProduct3D(item)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20 hover:bg-pink-600 transition flex items-center gap-1.5 shadow-lg"
                >
                  🧊 ดู 3D
                </button>
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                    <div className="flex items-center text-amber-400 text-xs font-bold gap-1 bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/20">
                      ★ {item.rating}
                    </div>
                  </div>
                  <p className={`text-xs line-clamp-2 mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-500/10">
                  <div>
                    <span className="text-xs text-slate-400 block">ราคาพิเศษ</span>
                    <span className="text-xl font-extrabold text-pink-500">฿{item.price}</span>
                  </div>

                  <Link
                    href={`/market/product/${item.id}`}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20 hover:opacity-90 transition transform active:scale-95"
                  >
                    ดูรายละเอียดสินค้า
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 3D Product View Modal */}
      {selectedProduct3D && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-xl p-6 rounded-2xl border shadow-2xl transition-all ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧊</span>
                <h3 className="text-lg font-bold">3D Preview: {selectedProduct3D.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProduct3D(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-500/20 transition text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* 3D Model Display Box */}
            <div className="h-72 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-pink-500/30 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="w-32 h-32 border-4 border-pink-500/80 rounded-3xl animate-spin-slow flex items-center justify-center shadow-xl shadow-pink-500/40 bg-pink-500/10">
                <img
                  src={selectedProduct3D.image}
                  alt="3D Preview"
                  className="w-24 h-24 object-cover rounded-xl shadow-md"
                />
              </div>
              <p className="mt-6 text-xs text-pink-300 font-medium">
                👆 หมุนและสำรวจสินค้าแบบ 3D Interactive (360° View)
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block">ราคา</span>
                <span className="text-lg font-bold text-pink-500">฿{selectedProduct3D.price}</span>
              </div>
              <button
                onClick={() => setSelectedProduct3D(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-pink-600 hover:bg-pink-500 text-white transition shadow-md shadow-pink-600/30"
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