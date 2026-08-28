import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'College Market 3D - ตลาดซื้อขายมือสองประจำวิทยาลัย',
  description: 'แพลตฟอร์มซื้อขายมือสอง 3D สำหรับนักเรียนและบุคลากร',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="antialiased bg-[#f8fafc]">{children}</body>
    </html>
  );
}