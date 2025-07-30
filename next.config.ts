import type { NextConfig } from 'next';

import path from 'path';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'badatabucket.s3.ap-northeast-2.amazonaws.com',
      'images.unsplash.com',
      'manuals.plus',
      'cdn.imweb.me',
      'imgnews.pstatic.net',
      'img.danawa.com',
      'ae-pic-a1.aliexpress-media.com',
      'search.pstatic.net',
      'ldb-phinf.pstatic.net',
      'ae01.alicdn.com',
      'k.kakaocdn.net',
      'img1.kakaocdn.net',
      't1.kakaocdn.net',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default nextConfig;
