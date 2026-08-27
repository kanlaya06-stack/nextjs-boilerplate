'use client';

import React from 'react';
import Link from 'next/link';
import { Store, ArrowRight, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function LandingHomePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between p-6">
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Store className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl text-slate-900">College Market 3D</span>
        </div>
        <Link href="/" className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all">
          เข้าสู่ตลาดซื้อขาย
        </Link>
      </header>

      <main className="max-w-4xl w-full mx-auto text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ระบบตลาดซื้อขายมือสองประจำวิทยาลัย</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          ซื้อขายสินค้ามือสองในวิทยาลัย <br />
          <span className="text-blue-600">สัมผัสประสบการณ์แบบ 3D Interactive</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          แพลตฟอร์มศูนย์กลางสำหรับนักเรียน นักศึกษา และบุคลากร ให้คุณแลกเปลี่ยน อุปกรณ์การเรียน หนังสือ และเครื่องแต่งกายได้อย่างง่ายดาย
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
            <span>ไปที่หน้าสินค้า 3D</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/product" className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">
            ลงขายสินค้าของคุณ
          </Link>
        </div>
      </main>

      <footer className="max-w-7xl w-full mx-auto text-center text-xs text-slate-400 py-6 border-t border-slate-200/60">
        © 2026 College Market 3D. All rights reserved.
      </footer>
    </div>
  );
}