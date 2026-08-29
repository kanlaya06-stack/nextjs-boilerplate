'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [show3DModal, setShow3DModal] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Navigation Bar */}
      <nav className={`flex items-center justify-between px-8 py-4 border-b ${darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white/80'} backdrop-blur-md sticky top-0 z-40`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xl">
            M
          </div>
          <span className="font-bold text-xl tracking-wide">MarketX</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/market" className="hover:text-indigo-400 font-medium transition">
            ตลาดสินค้า
          </Link>
          
          {/* Toggle Dark/Light Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border ${darkMode ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-200 border-slate-300 text-slate-700'} hover:scale-105 transition`}
            title="เปลี่ยนโหมดธีม"
          >
            {darkMode ? '☀️ โหมดสว่าง' : '🌙 โหมดมืด'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-mx-auto px-6 py-20 text-center flex flex-col items-center">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
          ✨ ประสบการณ์ช้อปปิ้งมิติใหม่
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          ค้นพบสินค้าไอที & เครื่องสำอางระดับพรีเมียม
        </h1>
        <p className={`max-w-2xl text-lg mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          เลือกชมสินค้าราคาพิเศษ พร้อมระบบแสดงผลแบบ โมเดล 3D ให้คุณเห็นรายละเอียดสินค้าได้สมจริงทุกมุมมอง
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/market"
            className="px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:opacity-90 transition transform hover:-translate-y-0.5"
          >
            เข้าสู่หน้าตลาดสินค้า →
          </Link>

          <button
            onClick={() => setShow3DModal(true)}
            className={`px-8 py-3.5 rounded-xl font-semibold border ${darkMode ? 'border-slate-700 bg-slate-900 hover:bg-slate-800' : 'border-slate-300 bg-white hover:bg-slate-100'} transition flex items-center gap-2`}
          >
            🧊 ดูตัวอย่างสินค้า 3D
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8">สินค้าแนะนำไฮไลต์</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: '1', name: 'Smart Watch Pro', price: '฿5,900', desc: 'หน้าจอ AMOLED แสดงผลสีสันสดใส', category: 'Gadgets' },
            { id: '2', name: 'Serum Glow Skin', price: '฿1,290', desc: 'เซรั่มบำรุงผิวล้ำลึกเพิ่มความกระจ่างใส', category: 'Cosmetics' },
            { id: '3', name: 'Wireless Headphones', price: '฿3,450', desc: 'ระบบตัดเสียงรบกวน Active Noise Cancelling', category: 'Audio' }
          ].map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition hover:shadow-xl ${darkMode ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}
            >
              <div className="h-40 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-4xl mb-4">
                🛍️
              </div>
              <span className="text-xs font-medium text-indigo-400">{item.category}</span>
              <h3 className="text-lg font-bold mt-1">{item.name}</h3>
              <p className={`text-sm mt-1 mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-indigo-400">{item.price}</span>
                <Link
                  href="/market"
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Viewer Modal Preview */}
      {show3DModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl p-6 rounded-2xl border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                🧊 3D Product Interactive Preview
              </h3>
              <button
                onClick={() => setShow3DModal(false)}
                className="p-1 rounded-lg hover:bg-slate-500/20"
              >
                ✕
              </button>
            </div>
            
            {/* Box แสดงโมเดลจำลอง */}
            <div className="h-72 rounded-xl bg-gradient-to-b from-indigo-950 to-slate-900 border border-indigo-500/30 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="w-28 h-28 border-4 border-indigo-400 rounded-2xl animate-spin-slow flex items-center justify-center shadow-lg shadow-indigo-500/50">
                <span className="text-4xl">📱</span>
              </div>
              <p className="mt-4 text-xs text-indigo-300">หมุนและซูมวัตถุได้แบบ Interactive (3D Canvas)</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShow3DModal(false)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 font-medium transition"
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