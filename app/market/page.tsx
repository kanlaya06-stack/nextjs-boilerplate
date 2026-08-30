'use client';

import { useState } from 'react';
import Product3DModal from '@/components/3DShowcaseModal';

export default function MarketPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors"
      >
        เปิดดูสินค้า 3D
      </button>

      <Product3DModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productData={{
          name: 'ลิปแมตต์ Velvet Touch Lip Tint',
          price: 159,
          // เมื่อใส่ไฟล์ .glb ใน public/models/lipstick.glb ให้เปิดใช้งานบรรทัดนี้:
          // modelUrl: '/models/lipstick.glb',
        }}
      />
    </main>
  );
}