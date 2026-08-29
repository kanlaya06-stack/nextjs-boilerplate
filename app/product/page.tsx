'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/market');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-6 flex justify-center items-center">
      <div className="w-full max-w-xl bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl">
        <Link href="/market" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="w-4 h-4" /> กลับไปหน้าร้านค้า
        </Link>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-slate-900">ลงขายสินค้าสำเร็จ!</h2>
            <p className="text-slate-500 text-sm">กำลังนำคุณกลับไปที่หน้าร้านค้า...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">ลงขายสินค้ามือสอง</h1>
              <p className="text-xs text-slate-500 mt-1">กรอกข้อมูลสินค้าเพื่อให้เพื่อนๆ ในวิทยาลัยติดต่อขอซื้อ</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อสินค้า</label>
                <input required type="text" placeholder="เช่น หนังสือเรียน Electronics" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">หมวดหมู่</label>
                  <select className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500">
                    <option>หนังสือ/การเรียน</option>
                    <option>เสื้อผ้า/เครื่องแต่งกาย</option>
                    <option>อุปกรณ์การเรียน</option>
                    <option>กระเป๋า/รองเท้า</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ราคา (บาท)</label>
                  <input required type="number" placeholder="250" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">รายละเอียดสินค้า</label>
                <textarea rows={3} placeholder="บอกสภาพสินค้า เหตุผลที่ส่งต่อ..." className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">รูปถ่ายสินค้า</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs text-slate-500">อัปโหลดรูปภาพสินค้า</span>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all">
              บันทึกและลงขาย
            </button>
          </form>
        )}
      </div>
    </div>
  );
}