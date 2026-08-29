import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <main style={{ padding: '2rem' }}>
      <Link href="/market" style={{ color: 'blue' }}>
        &larr; กลับหน้า Market
      </Link>
      <h1 style={{ marginTop: '1rem' }}>รายละเอียดสินค้า</h1>
      <p>รหัสสินค้า (Product ID): <strong>{id}</strong></p>
    </main>
  );
}