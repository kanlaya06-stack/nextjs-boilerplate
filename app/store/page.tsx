"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ThemeToggle from "@/components/ThemeToggle";
import { ShoppingCart, Plus, LogOut, Box } from "lucide-react";
import { useRouter } from "next/navigation";

const Product3D = dynamic(() => import("@/components/Product3D"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />,
});

interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  shape: string;
  image: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "3D Cubical Smart Box", price: 1290, color: "#3b82f6", shape: "box", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 2, name: "Orbital Sound Sphere", price: 2490, color: "#ef4444", shape: "sphere", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 3, name: "Futuristic Ring Gadget", price: 3500, color: "#10b981", shape: "torus", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500" },
  { id: 4, name: "Pro Gaming Cube", price: 4990, color: "#8b5cf6", shape: "box", image: "https://images.unsplash.com/photo-1608248597261-833258657640?w=500" },
];

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Product[]>([]);
  const [selected3DProduct, setSelected3DProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const router = useRouter();

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newColor, setNewColor] = useState("#3b82f6");
  const [newShape, setNewShape] = useState("box");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) router.push("/login");
    else setUser(savedUser);
  }, [router]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice) return;
    const newProd: Product = {
      id: Date.now(),
      name: newName,
      price: Number(newPrice),
      color: newColor,
      shape: newShape,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    };
    setProducts((prev) => [newProd, ...prev]);
    setIsAddModalOpen(false);
    setNewName("");
    setNewPrice("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="text-blue-600" />
          <h1 className="text-xl font-bold">3D Store</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">ยินดีต้อนรับ, {user}</span>
          <ThemeToggle />
          <div className="relative p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-1">
            <ShoppingCart size={20} />
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>
          </div>
          <button onClick={() => { localStorage.removeItem("user"); router.push("/"); }} className="p-2 text-red-500">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">รายการสินค้า (3D Viewable)</h2>
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
            <Plus size={18} /> ลงขายสินค้าเอง
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-4">฿{product.price.toLocaleString()}</p>
                <div className="flex gap-2">
                  <button onClick={() => setSelected3DProduct(product)} className="flex-1 border border-blue-600 text-blue-600 dark:text-blue-400 py-2 rounded-lg text-sm font-medium">ดูรูป 3D</button>
                  <button onClick={() => setCart((prev) => [...prev, product])} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">ใส่ตะกร้า</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selected3DProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 relative">
            <button onClick={() => setSelected3DProduct(null)} className="absolute top-4 right-4 text-gray-500">✕</button>
            <h3 className="text-xl font-bold mb-4">{selected3DProduct.name} - 3D View</h3>
            <Product3D color={selected3DProduct.color} shape={selected3DProduct.shape} />
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-500">✕</button>
            <h3 className="text-xl font-bold mb-4">ลงขายสินค้าใหม่</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input type="text" placeholder="ชื่อสินค้า" required value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600" />
              <input type="number" placeholder="ราคา" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600" />
              <select value={newShape} onChange={(e) => setNewShape(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600">
                <option value="box">กล่อง (Box)</option>
                <option value="sphere">ทรงกลม (Sphere)</option>
                <option value="torus">วงแหวน (Torus)</option>
              </select>
              <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="w-full h-10 border rounded-lg p-1 bg-transparent border-gray-300 dark:border-gray-600" />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">บันทึกลงขาย</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}