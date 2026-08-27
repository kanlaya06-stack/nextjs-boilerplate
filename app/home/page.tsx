'use client';

import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshWobbleMaterial, Box, Torus } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Sun, Moon, Search, Plus, Compass, MessageCircle, Sparkles, X, Rotate3d, ZoomIn } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
  category: string;
  image: string;
  shape3d: 'box' | 'sphere' | 'torus';
  color3d: string;
}

const mockProducts: Product[] = [
  { 
    id: 1, 
    name: 'หนังสือชีววิทยา ม.ปลาย มือสอง', 
    price: 150, 
    seller: 'พี่เจ (เทคโนโลยีสารสนเทศ)', 
    category: 'หนังสือ', 
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80', 
    shape3d: 'box', 
    color3d: '#2563eb' // สีฟ้าหนังสือ
  },
  { 
    id: 2, 
    name: 'หูฟังบลูทูธไร้สาย พร้อมเคส', 
    price: 350, 
    seller: 'ฟ้า (การบัญชี)', 
    category: 'อิเล็กทรอนิกส์', 
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80', 
    shape3d: 'box', 
    color3d: '#7c3aed' // สีม่วงไอที
  },
  { 
    id: 3, 
    name: 'เสื้อช็อปวิทยาลัย ไซส์ L', 
    price: 200, 
    seller: 'บอย (ช่างยนต์)', 
    category: 'เสื้อผ้า', 
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80', 
    shape3d: 'box', 
    color3d: '#1e3a8a' // สีน้ำเงินกรมท่าเสื้อช็อป
  },
  { 
    id: 4, 
    name: 'กระเป๋าเป้สะพายหลัง กันน้ำ', 
    price: 290, 
    seller: 'เมย์ (การตลาด)', 
    category: 'แฟชั่น', 
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', 
    shape3d: 'box', 
    color3d: '#059669' // สีเขียวกระเป๋า
  },
  { 
    id: 5, 
    name: 'เครื่องคิดเลขวิทยาศาสตร์ Casio', 
    price: 400, 
    seller: 'นนท์ (อิเล็กทรอนิกส์)', 
    category: 'อุปกรณ์การเรียน', 
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=400&q=80', 
    shape3d: 'box', 
    color3d: '#d97706' // สีส้มเครื่องคิดเลข
  },
];

function InteractiveProductMesh({ shape, color }: { shape: string; color: string }) {
  const meshRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      {/* เพิ่มความสว่างของแสงโดยรอบ */}
      <ambientLight intensity={1.5} />
      
      {/* ปรับทิศทางแสงไฟส่องเข้าหน้ากล่อง */}
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <directionalLight position={[0, -5, 5]} intensity={1.0} />

      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Box ref={meshRef} args={[1.8, 2.4, 0.6]}>
          <meshStandardMaterial 
            color={color} 
            roughness={0.2} 
            metalness={0.1} 
          />
        </Box>
      </Float>
      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} />
    </>
  );
}