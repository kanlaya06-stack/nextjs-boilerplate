'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ข้อมูลสินค้า
const initialProducts = [
  {
    id: '1',
    name: 'ลิปแมตต์ Velvet Touch Lip Tint',
    category: 'ลิปสติก',
    price: 159,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
    desc: 'ลิปทินท์เนื้อเวลเวท นุ่มฟู ติดทนนาน ไม่ตกร่องปาก เหมาะสำหรับนักศึกษาเติมระหว่างวัน',
  },
  {
    id: '2',
    name: 'กันแดด Sunscreen SPF50+ PA++++',
    category: 'บำรุงผิวหน้า',
    price: 289,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
    desc: 'ครีมกันแดดสูตรน้ำ บางเบา คุมมัน ไม่เยิ้มระหว่างวัน เหมาะสำหรับทำกิจกรรมกลางแจ้ง',
  },
  {
    id: '3',
    name: 'บลัชออนเนื้อครีม Soft Glow Liquid Blush',
    category: 'บลัชออน',
    price: 129,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
    desc: 'บลัชออนเนื้อลิควิด เกลี่ยง่าย ให้แก้มดูมีเลือดฝาดเป็นธรรมชาติ ติดทนนานตลอดวัน',
  },
  {
    id: '4',
    name: 'เซรั่มบำรุงผิวหน้า Hya B5 Hydrating Serum',
    category: 'บำรุงผิวหน้า',
    price: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    desc: 'เซรั่มไฮยาเข้มข้น เติมความชุ่มชื้นให้ผิวอิ่มฟู ลดความหมองคล้ำจากนอนดึก',
  },
  {
    id: '5',
    name: 'พาเลตต์อายแชโดว์ Daily Nude Shadow',
    category: 'แต่งตา',
    price: 249,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
    desc: 'อายแชโดว์โทนส้มอิฐ-น้ำตาล ใช้แต่งไปเรียนได้ทุกวัน โทนสีสุภาพติดทนนาน',
  },
  {
    id: '6',
    name: 'แป้งฝุ่นคุมมัน Loose Translucent Powder',
    category: 'แป้งแต่งหน้า',
    price: 189,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=800&auto=format&fit=crop&q=80',
    desc: 'แป้งฝุ่นโปร่งแสงเนื้อละเอียด ช่วยเซ็ตเมคอัพคุมมันตลอดวัน หน้าไม่ดรอป ไม่เป็นคราบ',
  },
];

// Component เรนเดอร์การ์ดโชว์สินค้า 3D ผ่าน HTML5 Canvas Pure (เสถียร 100% ไม่ Error)
function Pure3DCardViewer({ product }: { product: typeof initialProducts[0] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const angleYRef = useRef(0);
  const angleXRef = useRef(0.1);
  const isAutoRotateRef = useRef(isAutoRotate);
  isAutoRotateRef.current = isAutoRotate;
  const zoomLevelRef = useRef(zoomLevel);
  zoomLevelRef.current = zoomLevel;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = product.image;

    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
    };

    const render = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (isAutoRotateRef.current && !isDragging) {
        angleYRef.current += 0.015;
      }

      const radY = angleYRef.current;
      const radX = angleXRef.current;

      const cardWidth = 190 * zoomLevelRef.current;
      const cardHeight = 250 * zoomLevelRef.current;
      const cardDepth = 14 * zoomLevelRef.current;

      // คำนวณพิกัด 3D Perspective ของกล่องการ์ด
      const vertices = [
        { x: -cardWidth / 2, y: -cardHeight / 2, z: cardDepth / 2 },
        { x: cardWidth / 2, y: -cardHeight / 2, z: cardDepth / 2 },
        { x: cardWidth / 2, y: cardHeight / 2, z: cardDepth / 2 },
        { x: -cardWidth / 2, y: cardHeight / 2, z: cardDepth / 2 },
        { x: -cardWidth / 2, y: -cardHeight / 2, z: -cardDepth / 2 },
        { x: cardWidth / 2, y: -cardHeight / 2, z: -cardDepth / 2 },
        { x: cardWidth / 2, y: cardHeight / 2, z: -cardDepth / 2 },
        { x: -cardWidth / 2, y: cardHeight / 2, z: -cardDepth / 2 },
      ];

      // หมุนจุดแกน X และ Y
      const projected = vertices.map((v) => {
        // Rotate Y
        let x1 = v.x * Math.cos(radY) + v.z * Math.sin(radY);
        let z1 = -v.x * Math.sin(radY) + v.z * Math.cos(radY);
        let y1 = v.y;

        // Rotate X
        let y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
        let z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);

        // Perspective Projection
        const fov = 400;
        const scale = fov / (fov + z2 + 200);

        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale: scale,
          z: z2,
        };
      });

      // วาดเงาด้านล่าง
      ctx.beginPath();
      ctx.ellipse(cx, cy + 140 * zoomLevelRef.current, 90 * zoomLevelRef.current, 20 * zoomLevelRef.current, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fill();

      // วาดขอบข้างการ์ดกระจก (Glass Thickness Side)
      ctx.beginPath();
      ctx.moveTo(projected[0].x, projected[0].y);
      ctx.lineTo(projected[1].x, projected[1].y);
      ctx.lineTo(projected[5].x, projected[5].y);
      ctx.lineTo(projected[4].x, projected[4].y);
      ctx.closePath();
      ctx.fillStyle = '#d4af37'; // สีทอง
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(projected[1].x, projected[1].y);
      ctx.lineTo(projected[2].x, projected[2].y);
      ctx.lineTo(projected[6].x, projected[6].y);
      ctx.lineTo(projected[5].x, projected[5].y);
      ctx.closePath();
      ctx.fillStyle = '#b38f24';
      ctx.fill();

      // วาดแผ่นหน้าการ์ด (Front Face with Image)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(projected[0].x, projected[0].y);
      ctx.lineTo(projected[1].x, projected[1].y);
      ctx.lineTo(projected[2].x, projected[2].y);
      ctx.lineTo(projected[3].x, projected[3].y);
      ctx.closePath();
      ctx.clip();

      // เช็คการหันหน้าการ์ด
      const cosY = Math.cos(radY);
      if (cosY > 0 && img.complete && img.naturalWidth !== 0) {
        // วาดภาพสินค้าตรงกลางการ์ด
        const p0 = projected[0];
        const p1 = projected[1];
        const p3 = projected[3];

        const destW = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
        const destH = Math.sqrt(Math.pow(p3.x - p0.x, 2) + Math.pow(p3.y - p0.y, 2));

        ctx.translate(p0.x, p0.y);
        const skewAngle = Math.atan2(p1.y - p0.y, p1.x - p0.x);
        ctx.rotate(skewAngle);

        ctx.drawImage(img, 0, 0, destW, destH);
      } else {
        // ด้านหลังการ์ด (Back Metallic Cover)
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#1e293b');
        grad.addColorStop(0.5, '#ec4899');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('BEAUTY 3D', projected[0].x + 80, projected[0].y + 120);
      }
      ctx.restore();

      // กรอบทองล้อมรอบ (Gold Metallic Rim)
      ctx.beginPath();
      ctx.moveTo(projected[0].x, projected[0].y);
      ctx.lineTo(projected[1].x, projected[1].y);
      ctx.lineTo(projected[2].x, projected[2].y);
      ctx.lineTo(projected[3].x, projected[3].y);
      ctx.closePath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event Handlers ลากหมุนด้วยเมาส์ / นิ้ว
    const handleDown = (x: number, y: number) => {
      isDragging = true;
      lastMouseX = x;
      lastMouseY = y;
    };

    const handleMove = (x: number, y: number) => {
      if (!isDragging) return;
      const dx = x - lastMouseX;
      const dy = y - lastMouseY;

      angleYRef.current += dx * 0.01;
      angleXRef.current += dy * 0.005;

      // จำกัดมุมก้ม-เงย
      angleXRef.current = Math.max(-0.5, Math.min(0.5, angleXRef.current));

      lastMouseX = x;
      lastMouseY = y;
    };

    const handleUp = () => {
      isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => handleDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleUp();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) handleDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handleUp();

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [product]);

  const handleReset = () => {
    angleYRef.current = 0;
    angleXRef.current = 0.1;
    setZoomLevel(1);
  };

  return (
    <div className="relative w-full h-80 rounded-2xl bg-slate-950 border border-pink-500/30 overflow-hidden flex items-center justify-center shadow-inner">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950 text-pink-400 gap-2">
          <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold">กำลังโหลดแสดงผล 3D...</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={500}
        height={350}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="text-[10px] text-pink-300 bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-md border border-pink-500/20">
          ✨ คลิกหมุนการ์ด 3D 360°
        </span>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition backdrop-blur-md border ${
              isAutoRotate
                ? 'bg-pink-600 text-white border-pink-400'
                : 'bg-black/70 text-slate-300 border-white/20 hover:text-white'
            }`}
          >
            {isAutoRotate ? '⏸️ หยุดหมุน' : '▶️ หมุน'}
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
            className="w-7 h-7 bg-black/70 text-white rounded-lg border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-pink-600 transition"
          >
            +
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
            className="w-7 h-7 bg-black/70 text-white rounded-lg border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-pink-600 transition"
          >
            -
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 bg-black/70 text-slate-300 rounded-lg border border-white/20 text-xs font-bold hover:text-white transition"
          >
            🎯 รีเซ็ต
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MarketPage() {
  const [products, setProducts] = useState(initialProducts);
  const [darkMode, setDarkMode] = useState(true);

  const [selectedProduct3D, setSelectedProduct3D] = useState<typeof initialProducts[0] | null>(null);
  const [fullImageProduct, setFullImageProduct] = useState<typeof initialProducts[0] | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('ลิปสติก');
  const [newPrice, setNewPrice] = useState('');
  const [newRating, setNewRating] = useState('5.0');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newImage) {
      alert('กรุณากรอกข้อมูลสินค้าให้ครบถ้วนครับ');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      name: newName,
      category: newCategory,
      price: Number(newPrice),
      rating: Number(newRating) || 5.0,
      image: newImage,
      desc: newDesc || 'สินค้าคุณภาพดี คัดสรรเพื่อคุณ',
    };

    setProducts([newEntry, ...products]);
    setNewName('');
    setNewPrice('');
    setNewImage('');
    setNewDesc('');
    setShowAddForm(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <nav className={`flex items-center justify-between px-6 md:px-8 py-4 border-b ${darkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white/90'} backdrop-blur-md sticky top-0 z-40`}>
        <div className="flex items-center gap-3">
          <Link href="/" className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition">
            💄
          </Link>
          <span className="font-bold text-lg md:text-xl tracking-tight">College Beauty Market</span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-90 transition shadow-md shadow-pink-500/20 active:scale-95 flex items-center gap-1.5"
          >
            ➕ ลงสินค้าใหม่
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition transform active:scale-95 ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {darkMode ? '☀️ โหมดสว่าง' : '🌙 โหมดมืด'}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 text-center">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 inline-block mb-4">
          ✨ ศูนย์รวมเครื่องสำอางและสกินแคร์ราคานักศึกษา
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
          คัดสรรคุณภาพ เพื่อความมั่นใจในทุกวัน
        </h1>
        <p className={`text-sm md:text-base max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          คลิกที่รูปภาพเพื่อดูภาพขนาดใหญ่ หรือกดปุ่มดู 3D เพื่อสัมผัสสินค้าในมุมมอง 360 องศา
        </p>
      </div>

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
              <div 
                onClick={() => setFullImageProduct(item)}
                className="relative h-60 w-full overflow-hidden bg-slate-800 group cursor-pointer"
                title="คลิกเพื่อดูรูปภาพขนาดใหญ่"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1">
                    🔍 คลิกดูรูปใหญ่
                  </span>
                </div>

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-pink-500 text-white shadow-md z-10">
                  {item.category}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct3D(item);
                  }}
                  className="absolute bottom-3 right-3 px-3.5 py-2 rounded-xl text-xs font-bold bg-black/80 text-white backdrop-blur-md border border-white/20 hover:bg-pink-600 hover:border-pink-500 transition-all flex items-center gap-1.5 shadow-xl cursor-pointer active:scale-95 z-10"
                >
                  🧊 ดูสินค้า 3D
                </button>
              </div>

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
                    <span className="text-xs text-slate-400 block">ราคา</span>
                    <span className="text-xl font-extrabold text-pink-500">฿{item.price.toLocaleString()}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFullImageProduct(item)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95"
                  >
                    🔍 ดูรูปใหญ่
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal ดูรูปขยายใหญ่ */}
      {fullImageProduct && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setFullImageProduct(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setFullImageProduct(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-rose-600 flex items-center justify-center transition font-bold text-lg shadow-lg"
            >
              ✕
            </button>
            <img
              src={fullImageProduct.image}
              alt={fullImageProduct.name}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-slate-700"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold">{fullImageProduct.name}</h3>
              <p className="text-sm text-pink-400 font-semibold mt-1">฿{fullImageProduct.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal ดูโมเดล 3D */}
      {selectedProduct3D && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-xl p-6 rounded-3xl border shadow-2xl transition-all relative ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="text-lg font-bold leading-none">3D Product Showcase</h3>
                  <span className="text-[11px] text-pink-400 font-medium">{selectedProduct3D.name}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct3D(null)}
                className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition font-bold"
              >
                ✕
              </button>
            </div>

            <Pure3DCardViewer product={selectedProduct3D} />

            <div className="mt-5 flex justify-between items-center pt-2">
              <div>
                <span className="text-xs text-slate-400 block">ราคา</span>
                <span className="text-xl font-extrabold text-pink-500">฿{selectedProduct3D.price.toLocaleString()}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct3D(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white transition shadow-lg shadow-pink-600/30 active:scale-95"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal ฟอร์มเพิ่มสินค้า */}
      {showAddForm && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl transition-all ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span>➕</span> ลงสินค้าใหม่
              </h3>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-300">ชื่อสินค้า *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น เซรั่มบำรุงผิวสูตรเข้มข้น"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none focus:border-pink-500 transition ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-300">หมวดหมู่</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl text-sm border outline-none focus:border-pink-500 transition ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                  >
                    <option value="ลิปสติก">ลิปสติก</option>
                    <option value="บำรุงผิวหน้า">บำรุงผิวหน้า</option>
                    <option value="บลัชออน">บลัชออน</option>
                    <option value="แต่งตา">แต่งตา</option>
                    <option value="แป้งแต่งหน้า">แป้งแต่งหน้า</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-300">ราคา (บาท) *</label>
                  <input
                    type="number"
                    required
                    placeholder="เช่น 199"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none focus:border-pink-500 transition ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-300">URL รูปภาพสินค้า *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none focus:border-pink-500 transition ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-300">รายละเอียดสินค้า</label>
                <textarea
                  rows={3}
                  placeholder="กรอกรายละเอียดสั้นๆ ของสินค้า..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none focus:border-pink-500 transition ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white transition shadow-lg shadow-pink-600/30 active:scale-95"
                >
                  บันทึกสินค้า
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}