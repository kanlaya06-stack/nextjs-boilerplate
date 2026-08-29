import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>ยินดีต้อนรับสู่เว็บไซต์</h1>
      <p>ไปที่หน้าตลาดเพื่อดูสินค้าทั้งหมด</p>
      <Link href="/market" style={{ color: 'blue', textDecoration: 'underline' }}>
        ไปที่หน้า Market
      </Link>
    </main>
  );
}