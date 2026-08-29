import Link from 'next/link';

const cosmeticsProducts = [
  { id: '1', name: 'ลิปแมตต์ Velvet Touch Lip Tint', category: 'ลิปสติก', price: 159, rating: '4.8', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60', description: 'ลิปทินท์เนื้อเว็ลเว็ท นุ่มฟู ติดทนนาน ไม่ตกล็องปาก เหมาะสำหรับใช้นักศึกษาฉีดเติมระหว่างวัน' },
  { id: '2', name: 'กันแดด Sunscreen SPF50+ PA++++', category: 'บำรุงผิวหน้า', price: 289, rating: '4.9', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60', description: 'ครีมกันแดดสูตรน้ำ บางเบา คุมมัน ไม่เยิ้มระหว่างวัน เหมาะสำหรับทำกิจกรรมกลางแจ้งในวิทยาลัย' },
  { id: '3', name: 'บลัชออนเนื้อครีม Soft Glow Liquid Blush', category: 'บลัชออน', price: 129, rating: '4.7', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=60', description: 'บลัชออนเนื้อลิควิด เกลี่ยง่าย ให้แก้มดูมีเลือดฝาดเป็นธรรมชาติ ติดทนนานตลอดวัน' },
  { id: '4', name: 'แป้งพัฟคุมมัน Matte Perfection Powder', category: 'แป้งแต่งหน้า', price: 199, rating: '4.6', image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500&auto=format&fit=crop&q=60', description: 'แป้งผสมรองพื้น ช่วยปกปิดรอยสิวและควบคุมความมันยาวนาน 12 ชั่วโมง หน้าไม่ดรอประหว่างวัน' },
  { id: '5', name: 'เซรั่มบำรุงผิวหน้า Hya B5 Hydrating Serum', category: 'บำรุงผิวหน้า', price: 350, rating: '5.0', image: 'https://images.unsplash.com/photo-1608248597261-83325803746f?w=500&auto=format&fit=crop&q=60', description: 'เซรั่มไฮยาบำรุงผิวล้ำลึก ช่วยให้ผิวนุ่มชุ่มชื้น ลดความหมองคล้ำจากการนอนดึกช่วงสอบ' },
  { id: '6', name: 'พาเลทอายแชโดว์ Everyday Nude Palette', category: 'อายแชโดว์', price: 249, rating: '4.8', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=60', description: 'พาเลทแต่งตา 9 ช่อง โทนสีน้ำตาล-ส้มอิฐ ใช้แต่งหน้าได้ทุกวันทั้งลุคนักศึกษาและลุคไปเที่ยว' },
];

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = cosmeticsProducts.find((item) => item.id === id) || cosmeticsProducts[0];

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <Link href="/market" style={{ color: '#ec4899', textDecoration: 'none', fontWeight: 'bold' }}>
        &larr; กลับหน้า Market
      </Link>

      <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '12px' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: '#be185d', backgroundColor: '#fce7f3', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontWeight: 'bold' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '1.5rem', marginTop: '0.75rem', color: '#111827' }}>{product.name}</h1>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#db2777', margin: '0.5rem 0' }}>฿{product.price}</p>
            <p style={{ color: '#4b5563', lineHeight: '1.5' }}>{product.description}</p>
          </div>

          <button style={{
            width: '100%',
            backgroundColor: '#ec4899',
            color: '#ffffff',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem',
          }}>
            สั่งซื้อสินค้าทันที
          </button>
        </div>
      </div>
    </main>
  );
}