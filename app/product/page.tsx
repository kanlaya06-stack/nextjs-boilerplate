// app/product/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';

export default function AddProductPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-3">
        <Link href="/home" className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-lg">ลงประกาศขายสินค้า</h1>
      </header>

      <main className="max-w-md mx-auto p-4 pb-12">
        {submitted ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-4 my-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h2 className="text-xl font-bold">ลงขายสำเร็จ!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              สินค้าของคุณถูกเพิ่มลงในตลาดเรียบร้อยแล้ว
            </p>
            <Link 
              href="/home" 
              className="inline-block w-full py-3 bg-blue-600 text-white rounded-2xl font-medium text-sm transition-all"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">รูปภาพสินค้า</label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center bg-white dark:bg-slate-900 cursor-pointer hover:border-blue-500 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 dark:text-slate-400">กดเพื่ออัปโหลดรูปภาพสินค้า</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">ชื่อสินค้า</label>
              <input 
                required 
                type="text" 
                placeholder="เช่น หนังสือเรียน, เสื้อช็อป..." 
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">หมวดหมู่</label>
              <select className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>อุปกรณ์การเรียน / หนังสือ</option>
                <option>เสื้อผ้า / เครื่องแต่งกายวิทยาลัย</option>
                <option>อุปกรณ์อิเล็กทรอนิกส์</option>
                <option>ของใช้ทั่วไป</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">ราคา (บาท)</label>
              <input 
                required 
                type="number" 
                placeholder="0.00" 
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">ชื่อผู้ขาย / แผนกวิชา</label>
              <input 
                required 
                type="text" 
                placeholder="เช่น ช่างยนต์ ปี 2, บัญชี ปี 3" 
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">ช่องทางติดต่อ (LINE / เบอร์โทรศัพท์)</label>
              <input 
                required 
                type="text" 
                placeholder="เช่น ID Line หรือ เบอร์โทร" 
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl shadow-lg shadow-blue-500/25 transition-all active:scale-95 text-sm mt-4"
            >
              ยืนยันการลงขาย
            </button>
          </form>
        )}
      </main>
    </div>
  );
}