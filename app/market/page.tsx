import Link from 'next/link';

// ข้อมูลสินค้าเครื่องสำอางสมบูรณ์
const cosmeticsProducts = [
  {
    id: '1',
    name: 'ลิปแมตต์ Velvet Touch Lip Tint',
    category: 'ลิปสติก',
    price: 159,
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60',
    description: 'ลิปทินท์เนื้อเว็ลเว็ท นุ่มฟู ติดทนนาน ไม่ตกล็องปาก เหมาะสำหรับใช้นักศึกษาฉีดเติมระหว่างวัน',
  },
  {
    id: '2',
    name: 'กันแดด Sunscreen SPF50+ PA++++',
    category: 'บำรุงผิวหน้า',
    price: 289,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60',
    description: 'ครีมกันแดดสูตรน้ำ บางเบา คุมมัน ไม่เยิ้มระหว่างวัน เหมาะสำหรับทำกิจกรรมกลางแจ้งในวิทยาลัย',
  },
  {
    id: '3',
    name: 'บลัชออนเนื้อครีม Soft Glow Liquid Blush',
    category: 'บลัชออน',
    price: 129,
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=60',
    description: 'บลัชออนเนื้อลิควิด เกลี่ยง่าย ให้แก้มดูมีเลือดฝาดเป็นธรรมชาติ ติดทนนานตลอดวัน',
  },
  {
    id: '4',
    name: 'แป้งพัฟคุมมัน Matte Perfection Powder',
    category: 'แป้งแต่งหน้า',
    price: 199,
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500&auto=format&fit=crop&q=60',
    description: 'แป้งผสมรองพื้น ช่วยปกปิดรอยสิวและควบคุมความมันยาวนาน 12 ชั่วโมง หน้าไม่ดรอประหว่างวัน',
  },
  {
    id: '5',
    name: 'เซรั่มบำรุงผิวหน้า Hya B5 Hydrating Serum',
    category: 'บำรุงผิวหน้า',
    price: 350,
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1608248597261-83325803746f?w=500&auto=format&fit=crop&q=60',
    description: 'เซรั่มไฮยาบำรุงผิวล้ำลึก ช่วยให้ผิวนุ่มชุ่มชื้น ลดความหมองคล้ำจากการนอนดึกช่วงสอบ',
  },
  {
    id: '6',
    name: 'พาเลทอายแชโดว์ Everyday Nude Palette',
    category: 'อายแชโดว์',
    price: 249,
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=60',
    description: 'พาเลทแต่งตา 9 ช่อง โทนสีน้ำตาล-ส้มอิฐ ใช้แต่งหน้าได้ทุกวันทั้งลุคนักศึกษาและลุคไปเที่ยว',
  },
];

export default function MarketPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#111827' }}>💄 College Beauty Market</h1>
        <p style={{ color: '#6b7280' }}>ศูนย์รวมเครื่องสำอางและสกินแคร์ราคานักศึกษา</p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {cosmeticsProducts.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#fce7f3', color: '#be185d', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontWeight: 'bold' }}>
                  {product.category}
                </span>
                <h2 style={{ fontSize: '1.125rem', marginTop: '0.5rem', marginBottom: '0.25rem', color: '#1f2937' }}>
                  {product.name}
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#db2777' }}>
                    ฿{product.price}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#f59e0b', fontWeight: 'bold' }}>
                    ★ {product.rating}
                  </span>
                </div>

                <Link href={`/market/product/${product.id}`} style={{
                  display: 'block',
                  textAlign: 'center',
                  backgroundColor: '#ec4899',
                  color: '#ffffff',
                  padding: '0.625rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}>
                  ดูรายละเอียดสินค้า
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}