"use client";

import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { ShoppingCart, Plus, LogOut, Store, Search, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  seller: string;
  image: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "หนังสือเรียน Basic Electronics",
    description: "หนังสือพื้นฐานวงจรอิเล็กทรอนิกส์ สภาพดีมาก ไม่มีหน้าขาด",
    price: 250,
    category: "หนังสือ/การเรียน",
    seller: "กิตติพงษ์",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
  },
  {
    id: 2,
    name: "เสื้อช็อปวิทยาลัย Size L",
    description: "เสื้อช็อปปักโลโก้วิทยาลัย ขนาด L ซักสะอาด กระดุมครบทุกเม็ด",
    price: 180,
    category: "เสื้อผ้า/เครื่องแต่งกาย",
    seller: "อนวัช",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
  },
  {
    id: 3,
    name: "ชุดวงจรไมโครคอนโทรลเลอร์",
    description: "บอร์ดทดลองพร้อมสายไฟและเซนเซอร์พื้นฐาน สภาพพร้อมใช้งาน",
    price: 420,
    category: "อุปกรณ์การเรียน",
    seller: "ธนกฤต",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
  },
  {
    id: 4,
    name: "กระเป๋าเป้ใส่โน้ตบุ๊ก 15.6 นิ้ว",
    description: "กระเป๋ากันน้ำ มีช่องใส่โน้ตบุ๊กกันกระแทก ซิปใช้งานได้ปกติ",
    price: 320,
    category: "กระเป๋า/รองเท้า",
    seller: "ศิริพร",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  },
];

export default function MarketPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const router = useRouter();

  // Form States
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCat, setNewCat] = useState("หนังสือ/การเรียน");

  const categories = ["ทั้งหมด", "หนังสือ/การเรียน", "เสื้อผ้า/เครื่องแต่งกาย", "อุปกรณ์การเรียน", "กระเป๋า/รองเท้า"];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ทั้งหมด" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice) return;
    const newProd: Product = {
      id: Date.now(),
      name: newName,
      description: newDesc || "ไม่มีรายละเอียดเพิ่มเติม",
      price: Number(newPrice),
      category: newCat,
      seller: "ผู้ใช้ปัจจุบัน",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    };
    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    setNewName("");
    setNewDesc("");
    setNewPrice("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="text-blue-600" />
          <h1 className="text-xl font-bold">College Market</h1>
        </div>

        <div className="flex-1 max-w-md mx-8 relative hidden sm:block">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="relative p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-1">
            <ShoppingCart size={20} />
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>
          </div>
          <button onClick={() => router.push("/")} className="p-2 text-red-500 hover:opacity-80">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm"
          >
            <Plus size={18} /> ลงขายสินค้า
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-lg mt-2 mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">ราคา</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">฿{product.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => setCart([...cart, product])}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    ใส่ตะกร้า
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal ดูรายละเอียดสินค้า */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-xl mb-4" />
            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-1 rounded">
              {selectedProduct.category}
            </span>
            <h3 className="text-xl font-bold mt-2">{selectedProduct.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 my-3">{selectedProduct.description}</p>
            <p className="text-sm text-gray-400 mb-4">ผู้ขาย: {selectedProduct.seller}</p>
            <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">฿{selectedProduct.price}</p>
              <button
                onClick={() => {
                  setCart([...cart, selectedProduct]);
                  setSelectedProduct(null);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal ลงขายสินค้า */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-500">✕</button>
            <h3 className="text-xl font-bold mb-4">ลงขายสินค้าใหม่</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ชื่อสินค้า</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">หมวดหมู่</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600"
                >
                  {categories.filter((c) => c !== "ทั้งหมด").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">รายละเอียดสินค้า</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ราคา (บาท)</label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-transparent border-gray-300 dark:border-gray-600"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                บันทึกลงขาย
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}