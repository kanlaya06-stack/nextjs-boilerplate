'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ข้อมูลสินค้าเริ่มต้น
const initialProducts = [
  {
    id: '1',
    name: 'ลิปแมตต์ Velvet Touch Lip Tint',
    category: 'ลิปสติก',
    price: 159,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80',
    desc: 'ลิปทินท์เนื้อเวลเวท นุ่มฟู ติดทนนาน ไม่ตกร่องปาก เหมาะสำหรับนักศึกษาเติมระหว่างวัน',
  },
  {
    id: '2',
    name: 'กันแดด Sunscreen SPF50+ PA++++',
    category: 'บำรุงผิวหน้า',
    price: 289,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
    desc: 'ครีมกันแดดสูตรน้ำ บางเบา คุมมัน ไม่เยิ้มระหว่างวัน เหมาะสำหรับทำกิจกรรมกลางแจ้ง',
  },
  {
    id: '3',
    name: 'บลัชออนเนื้อครีม Soft Glow Liquid Blush',
    category: 'บลัชออน',
    price: 129,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    desc: 'บลัชออนเนื้อลิควิด เกลี่ยง่าย ให้แก้มดูมีเลือดฝาดเป็นธรรมชาติ ติดทนนานตลอดวัน',
  },
  {
    id: '4',
    name: 'เซรั่มบำรุงผิวหน้า Hya B5 Hydrating Serum',
    category: 'บำรุงผิวหน้า',
    price: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    desc: 'เซรั่มไฮยาเข้มข้น เติมความชุ่มชื้นให้ผิวอิ่มฟู ลดความหมองคล้ำจากนอนดึก',
  },
  {
    id: '5',
    name: 'พาเลตต์อายแชโดว์ Daily Nude Shadow',
    category: 'แต่งตา',
    price: 249,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    desc: 'อายแชโดว์โทนส้มอิฐ-น้ำตาล ใช้แต่งไปเรียนได้ทุกวัน โทนสีสุภาพติดทนนาน',
  },
  {
    id: '6',
    name: 'สเปรย์ล็อคเมคอัพ Matte Setting Spray',
    category: 'สเปรย์เมคอัพ',
    price: 219,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1608248597260-9f018e6981f2?w=800&q=80',
    desc: 'สเปรย์ฉีดหน้าฉีดหลังแต่งหน้า ช่วยล็อคเครื่องสำอางติดทนนานตลอดวัน คุมมัน ไม่เป็นคราบ',
  },
];

// Component สำหรับ WebGL 3D Interactive Card (คมชัด ไม่เบี้ยว ไม่ยืด)
function Real3DViewer({ product, darkMode }: { product: typeof initialProducts[0]; darkMode: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const autoRotateRef = useRef(isAutoRotate);
  autoRotateRef.current = isAutoRotate;

  const productGroupRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const scriptId = 'three-js-cdn';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initThree = () => {
      const THREE = (window as any).THREE;
      if (!THREE || !containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 4.8);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);

      // ไฟส่องสว่าง
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
      mainLight.position.set(5, 5, 5);
      scene.add(mainLight);

      const productGroup = new THREE.Group();
      productGroupRef.current = productGroup;
      scene.add(productGroup);

      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin('anonymous');

      textureLoader.load(
        product.image,
        (texture) => {
          // คำนวณอัตราส่วนภาพเพื่อให้ภาพสวย คมชัด ไม่ยืด
          const imageAspect = texture.image.width / texture.image.height;
          const cardHeight = 2.4;
          const cardWidth = cardHeight * imageAspect;

          // สร้างแผ่นการ์ด 3D ที่มีความหนา
          const geometry = new THREE.BoxGeometry(cardWidth, cardHeight, 0.08);

          // กำหนด Material แต่ละด้าน
          const frontMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.2,
            metalness: 0.1,
          });

          const backMaterial = new THREE.MeshStandardMaterial({
            color: darkMode ? 0x1e293b : 0xf1f5f9,
            roughness: 0.5,
          });

          const edgeMaterial = new THREE.MeshStandardMaterial({
            color: 0xec4899,
            roughness: 0.3,
            metalness: 0.8,
          });

          const materials = [
            edgeMaterial,  // ขวา
            edgeMaterial,  // ซ้าย
            edgeMaterial,  // บน
            edgeMaterial,  // ล่าง
            frontMaterial, // หน้า (รูปสินค้า)
            backMaterial   // หลัง
          ];

          const cardMesh = new THREE.Mesh(geometry, materials);
          cardMesh.position.y = 0.2;
          productGroup.add(cardMesh);

          // ฐานรอง 3D วงกลมด้านล่าง
          const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.15, 32);
          const pedestalMat = new THREE.MeshStandardMaterial({
            color: darkMode ? 0x334155 : 0xe2e8f0,
            roughness: 0.3,
            metalness: 0.6,
          });
          const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
          pedestalMesh.position.y = -1.25;
          productGroup.add(pedestalMesh);

          setIsLoading(false);
        },
        undefined,
        () => {
          setIsLoading(false);
        }
      );

      const domElem = renderer.domElement;

      const handlePointerDown = (x: number, y: number) => {
        isDragging = true;
        previousMousePosition = { x, y };
      };

      const handlePointerMove = (x: number, y: number) => {
        if (!isDragging || !productGroup) return;
        const deltaX = x - previousMousePosition.x;
        const deltaY = y - previousMousePosition.y;

        productGroup.rotation.y += deltaX * 0.01;
        productGroup.rotation.x += deltaY * 0.01;

        previousMousePosition = { x, y };
      };

      const handlePointerEnd = () => {
        isDragging = false;
      };

      domElem.addEventListener('mousedown', (e) => handlePointerDown(e.clientX, e.clientY));
      window.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY));
      window.addEventListener('mouseup', handlePointerEnd);

      domElem.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }
      });
      window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      });
      window.addEventListener('touchend', handlePointerEnd);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (autoRotateRef.current && !isDragging && productGroup) {
          productGroup.rotation.y += 0.012;
        }

        renderer.render(scene, camera);
      };

      animate();
    };

    if ((window as any).THREE) {
      initThree();
    } else {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => initThree();
        document.head.appendChild(script);
      } else {
        script.addEventListener('load', initThree);
      }
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [product, darkMode]);

  const handleResetView = () => {
    if (productGroupRef.current) {
      productGroupRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 4.8);
    }
  };

  const handleZoom = (delta: number) => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(3.0, Math.min(7.0, cameraRef.current.position.z + delta));
    }
  };

  return (
    <div className="relative w-full h-80 rounded-2xl bg-slate-950/80 border border-pink-500/30 overflow-hidden flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 text-pink-400 gap-3">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold">กำลังโหลดโมเดล 3D...</span>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="text-[10px] text-pink-300 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-pink-500/20">
          👆 หมุนดูสินค้า 360°
        </span>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition backdrop-blur-md border ${
              isAutoRotate
                ? 'bg-pink-600/80 text-white border-pink-400'
                : 'bg-black/60 text-slate-300 border-white/20 hover:text-white'
            }`}
          >
            {isAutoRotate ? '⏸️ หยุดหมุน' : '▶️ หมุนหมุน'}
          </button>
          
          <button
            type="button"
            onClick={() => handleZoom(-0.6)}
            className="w-7 h-7 bg-black/60 text-white rounded-lg border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-pink-600 transition"
            title="ซูมเข้า"
          >
            +
          </button>

          <button
            type="button"
            onClick={() => handleZoom(0.6)}
            className="w-7 h-7 bg-black/60 text-white rounded-lg border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-pink-600 transition"
            title="ซูมออก"
          >
            -
          </button>

          <button
            type="button"
            onClick={handleResetView}
            className="px-2.5 py-1 bg-black/60 text-slate-300 rounded-lg border border-white/20 text-xs font-bold hover:text-white transition"
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
      alert('กรุณากรอกชื่อสินค้า ราคา และลิงก์รูปภาพให้ครบถ้วนครับ');
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
          คลิกที่รูปภาพเพื่อดูภาพขนาดใหญ่ หรือกดปุ่มดู 3D เพื่อสัมผัสโมเดลสินค้า 360 องศา
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

      {selectedProduct3D && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-xl p-6 rounded-3xl border shadow-2xl transition-all relative ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛍️</span>
                <div>
                  <h3 className="text-lg font-bold leading-none">3D Interactive Viewer</h3>
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

            <Real3DViewer product={selectedProduct3D} darkMode={darkMode} />

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
                    <option value="สเปรย์เมคอัพ">สเปรย์เมคอัพ</option>
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