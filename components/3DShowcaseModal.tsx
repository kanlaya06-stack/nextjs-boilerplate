'use client';

import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { RotateCw, Plus, Minus, RefreshCw, X, Sparkles } from 'lucide-react';

export interface ProductData {
  name?: string;
  price?: number | string;
  modelUrl?: string;
}

export interface Product3DModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  productData?: ProductData;
}

interface ProductModelProps {
  url: string;
}

function ProductModel({ url }: ProductModelProps) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white text-sm whitespace-nowrap">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-2" />
        กำลังโหลดโมเดล 3D...
      </div>
    </Html>
  );
}

export default function Product3DModal({
  isOpen = true,
  onClose,
  productData,
}: Product3DModalProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  if (!isOpen) return null;

  const modelUrl =
    productData?.modelUrl ||
    'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb';

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.zoomIn(1.2);
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.zoomOut(1.2);
    }
  };

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      setAutoRotate(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-pink-400 font-semibold text-lg">
              <Sparkles className="w-5 h-5" />
              <span>3D Product Showcase</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {productData?.name || 'ลิปแมตต์ Velvet Touch Lip Tint'}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 3D Canvas Area */}
        <div className="relative w-full h-[320px] bg-[#05070d] rounded-xl overflow-hidden border border-slate-800/80">
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 10, 7]} intensity={1.5} />

            <Suspense fallback={<Loader />}>
              <Stage environment="city" intensity={0.6} adjustCamera={true}>
                <ProductModel url={modelUrl} />
              </Stage>
            </Suspense>

            <OrbitControls
              ref={controlsRef}
              autoRotate={autoRotate}
              autoRotateSpeed={4}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.8}
            />
          </Canvas>

          <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-slate-300 flex items-center gap-1.5 border border-white/10 pointer-events-none">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>คลิกหมุนการ์ด 3D 360°</span>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-lg border border-slate-700/50">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                autoRotate
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>หมุน</span>
            </button>

            <button
              onClick={handleZoomIn}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
              title="ขยาย"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleZoomOut}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
              title="ย่อ"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>รีเซ็ต</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">ราคา</span>
            <span className="text-2xl font-bold text-pink-500">
              ฿{productData?.price ?? '159'}
            </span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-pink-600/30"
            >
              ปิดหน้าต่าง
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

useGLTF.preload(
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb'
);