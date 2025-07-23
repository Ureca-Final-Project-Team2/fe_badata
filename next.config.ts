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
    ],
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
