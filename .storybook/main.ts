import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
  ],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@app': path.resolve(__dirname, '../src/app'),
          '@features': path.resolve(__dirname, '../src/features'),
          '@shared': path.resolve(__dirname, '../src/shared'),
          '@components': path.resolve(__dirname, '../src/shared/components'),
          '@ui': path.resolve(__dirname, '../src/shared/components/ui'),
          '@hooks': path.resolve(__dirname, '../src/shared/hooks'),
          '@lib': path.resolve(__dirname, '../src/shared/lib'),
          '@constants': path.resolve(__dirname, '../src/shared/constants'),
          '@types': path.resolve(__dirname, '../src/shared/types'),
          '@utils': path.resolve(__dirname, '../src/shared/utils'),
          '@styles': path.resolve(__dirname, '../src/shared/styles'),
        },
      },
    });
  },
};

export default config;
