// app/home/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Sun, Moon, Search, Store } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
  category: string;
  image: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'หนังสือชีววิทยา ม.ปลาย มือสอง', price: 150, seller: 'พี่เจ (แผนกเทคโนโลยีสารสนเทศ)', category: 'หนังสือ', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80' },
  { id: 2, name: 'หูฟังบลูทูธไร้สาย พร้อมเคส', price: 350, seller: 'ฟ้า (แผนกการบัญชี)', category: 'อิเล็กทรอนิกส์', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80' },
  { id: 3, name: 'เสื้อช็อปวิทยาลัย ไซส์ L', price: 200, seller: 'บอย (แผนกช่างยนต์)', category: 'เสื้อผ้า', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80' },
  { id: 4, name: 'กระเป๋าเป้สะพายหลัง กันน้ำ', price: 290, seller: 'เมย์ (แผนกการตลาด)', category: 'แฟชั่น', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { id: 5, name: 'เครื่องคิดเลขวิทยาศาสตร์ Casio', price: 400, seller: 'นนท์ (แผนกอิเล็กทรอนิกส์)', category: 'อุปกรณ์การเรียน', image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=400&q=80' },
];

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-24">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="font-bold text-lg">College Market</h1>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:opacity-80 transition-all"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </header>

        {/* Search Bar */}
        <main className="max-w-md mx-auto p-4 space-y-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="ค้นหาสินค้าหรือชื่อผู้ขาย..." 
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
            />
          </div>

          {/* Product Feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">สินค้ามาใหม่</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">ทั้งหมด 5 รายการ</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockProducts.map((product) => (
                <div key={product.id} className="flex bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="ml-3 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-sm line-clamp-1 mt-1">{product.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product.seller}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400">฿{product.price}</span>
                      <button className="text-xs px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-medium active:scale-95 transition-transform">
                        ติดต่อซื้อ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Link 
            href="/product" 
            className="flex items-center gap-2 px-5 py-3.5 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/40 font-medium text-sm transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>ลงขายสินค้า</span>
          </Link>
        </div>

      </div>
    </div>
  );
}