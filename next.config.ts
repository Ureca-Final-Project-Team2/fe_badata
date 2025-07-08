import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@ui': path.resolve(__dirname, './src/shared/components/ui'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@lib': path.resolve(__dirname, './src/shared/lib'),
      '@constants': path.resolve(__dirname, './src/shared/constants'),
      '@types': path.resolve(__dirname, './src/shared/types'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
      '@styles': path.resolve(__dirname, './src/shared/styles'),
    };
    return config;
  },
};

export default nextConfig;
