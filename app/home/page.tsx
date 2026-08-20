'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Sun, Moon, Search, Plus, Compass, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      style={{
        backgroundColor: isDarkMode ? '#020617' : '#f8fafc',
        color: isDarkMode ? '#ffffff' : '#0f172a',
        minHeight: '100vh',
        transition: 'all 0.3s ease'
      }}
      className="font-sans relative"
    >
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div 
          style={{ backgroundColor: isDarkMode ? '#2563eb' : '#93c5fd' }}
          className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" 
        />
        <div 
          style={{ backgroundColor: isDarkMode ? '#4f46e5' : '#c084fc' }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 pb-32">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Link href="/">
            <div 
              style={{
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0',
                color: isDarkMode ? '#ffffff' : '#0f172a'
              }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-lg backdrop-blur-md"
            >
              <Store className="w-6 h-6 text-blue-500" />
              <span className="font-bold tracking-wide text-lg">College Market</span>
            </div>
          </Link>

          {/* Switch Theme Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1',
              color: isDarkMode ? '#facc15' : '#0f172a'
            }}
            className="p-3 rounded-2xl border shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Search Bar */}
        <section className="mb-8 max-w-xl mx-auto">
          <div 
            style={{
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'
            }}
            className="flex items-center rounded-2xl border shadow-xl backdrop-blur-md overflow-hidden"
          >
            <Search className="w-5 h-5 ml-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า ชื่อผู้ขาย..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
              className="w-full px-4 py-3.5 bg-transparent outline-none placeholder-slate-400"
            />
          </div>
        </section>

        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">สินค้ามาใหม่</h2>
          </div>
          <span className="text-sm text-slate-400">ทั้งหมด {filteredProducts.length} รายการ</span>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
              }}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl border shadow-md backdrop-blur-md transition-all hover:border-blue-500/50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full sm:w-28 h-28 object-cover rounded-2xl"
              />

              <div className="flex-1 w-full text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {product.category}
                </span>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-slate-400 mt-0.5">{product.seller}</p>
                <p className="text-lg font-extrabold text-blue-500 mt-2">฿{product.price}</p>
              </div>

              <button className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> ติดต่อซื้อ
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div 
          style={{
            backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'
          }}
          className="flex items-center gap-2 p-2 rounded-full border shadow-2xl backdrop-blur-xl"
        >
          <Link href="/home">
            <button className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium flex items-center gap-2 text-sm shadow-md">
              <Compass className="w-4 h-4" />
              <span>สำรวจตลาด</span>
            </button>
          </Link>

          <Link href="/product">
            <button 
              style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}
              className="px-5 py-2.5 rounded-full font-medium flex items-center gap-2 text-sm hover:text-blue-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>ลงขายสินค้า</span>
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}