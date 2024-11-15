import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '', // Port kullanılmıyorsa boş bırakabilirsiniz
        pathname: '/api/character/avatar/**', // İlgili alt yolları belirtin
      },
    ],
  },
};

export default nextConfig;
