'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Sun, Moon, Search, Plus, Compass, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('explore');

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      isDarkMode 
        ? 'bg-slate-950 text-white' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Gradient Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
          isDarkMode ? 'bg-blue-600/30' : 'bg-blue-400/20'
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
          isDarkMode ? 'bg-indigo-600/30' : 'bg-indigo-400/20'
        }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 pb-32">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-8">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white/80 border-slate-200 text-slate-800'
              }`}
            >
              <Store className="w-6 h-6 text-blue-500" />
              <span className="font-bold tracking-wide text-lg">College Market</span>
            </motion.div>
          </Link>

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-2xl border shadow-lg backdrop-blur-md transition-all ${
              isDarkMode 
                ? 'bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </header>

        {/* Search Bar */}
        <section className="mb-10 max-w-2xl mx-auto">
          <div className={`relative flex items-center rounded-2xl border shadow-2xl backdrop-blur-xl transition-all ${
            isDarkMode 
              ? 'bg-white/5 border-white/15 focus-within:border-blue-500' 
              : 'bg-white border-slate-200 focus-within:border-blue-500'
          }`}>
            <Search className="w-5 h-5 ml-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า ชื่อผู้ขาย หรือหมวดหมู่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-4 bg-transparent outline-none text-sm md:text-base placeholder-slate-400"
            />
          </div>
        </section>

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">สินค้ามาใหม่</h2>
          </div>
          <span className="text-xs md:text-sm text-slate-400">
            ทั้งหมด {filteredProducts.length} รายการ
          </span>
        </div>

        {/* Product List Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl border backdrop-blur-xl shadow-xl transition-all ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-blue-500/50' 
                  : 'bg-white border-slate-200 hover:border-blue-400'
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full sm:w-28 h-28 object-cover rounded-2xl shadow-md"
              />

              <div className="flex-1 w-full text-left">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                  isDarkMode 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {product.category}
                </span>
                <h3 className="font-bold text-base md:text-lg leading-snug">{product.name}</h3>
                <p className="text-xs md:text-sm text-slate-400 mt-1">{product.seller}</p>
                <p className="text-lg font-extrabold text-blue-500 mt-2">฿{product.price}</p>
              </div>

              <button className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> ติดต่อซื้อ
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Experimental Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center gap-2 p-2 rounded-full backdrop-blur-2xl border shadow-2xl transition-colors ${
            isDarkMode 
              ? 'bg-slate-900/80 border-white/10 shadow-blue-950/50' 
              : 'bg-white/90 border-slate-200 shadow-slate-300/50'
          }`}
        >
          <Link href="/home">
            <button
              onClick={() => setActiveTab('explore')}
              className={`relative px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all ${
                activeTab === 'explore' 
                  ? 'text-white bg-blue-600 shadow-lg shadow-blue-600/30' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>สำรวจตลาด</span>
            </button>
          </Link>

          <Link href="/product">
            <button
              onClick={() => setActiveTab('sell')}
              className={`relative px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium transition-all ${
                activeTab === 'sell' 
                  ? 'text-white bg-blue-600 shadow-lg shadow-blue-600/30' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>ลงขายสินค้า</span>
            </button>
          </Link>
        </motion.div>
      </div>

    </div>
  );
}