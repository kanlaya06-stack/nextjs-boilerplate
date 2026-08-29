import Link from 'next/link';

const products = [
  { id: '1', name: 'สินค้า A', price: 100 },
  { id: '2', name: 'สินค้า B', price: 250 },
  { id: '3', name: 'สินค้า C', price: 500 },
];

export default function MarketPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>รายการสินค้าใน Market</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ margin: '1rem 0', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h2>{product.name}</h2>
            <p>ราคา: {product.price} บาท</p>
            <Link href={`/market/product/${product.id}`} style={{ color: 'blue' }}>
              ดูรายละเอียดสินค้า
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}