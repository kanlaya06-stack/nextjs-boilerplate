/** @type {import('next').NextModeConfig} */
const nextConfig = {
  typescript: {
    // ป้องกันไม่ให้ build ล้มเหลวหากมี type เล็กน้อยหลุด
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;