// app/page.tsx
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 max-w-sm">
        <div className="w-24 h-24 bg-blue-600 dark:bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
          <ShoppingBag className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">College Market</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          ตลาดนัดออนไลน์ศูนย์รวมสินค้าบริการ และของมือสองสำหรับนักเรียนนักศึกษาในวิทยาลัย
        </p>
      </div>

      <div className="w-full max-w-sm pb-6">
        <Link 
          href="/home" 
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95"
        >
          <span>เข้าสู่ตลาด</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}