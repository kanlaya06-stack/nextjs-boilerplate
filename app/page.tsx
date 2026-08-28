import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col justify-between transition-colors">
      <nav className="p-6 flex justify-between items-center max-w-7xl w-full mx-auto">
        <div className="font-bold text-xl">3D E-Commerce Store</div>
        <ThemeToggle />
      </nav>

      <main className="max-w-4xl mx-auto px-6 text-center py-20">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          ประสบการณ์ช้อปปิ้งยุคใหม่ด้วย <span className="text-blue-600">3D Interactive</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          เลือกดูและหมุนสินค้าได้แบบ 360 องศา สมจริง ก่อนตัดสินใจเลือกใส่ตะกร้า
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition"
        >
          เข้าสู่ระบบเพื่อเข้าหน้าร้านค้า
        </Link>
      </main>

      <footer className="p-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
        © 3D Shopping Store. All rights reserved.
      </footer>
    </div>
  );
}