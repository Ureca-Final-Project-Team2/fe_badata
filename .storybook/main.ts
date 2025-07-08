import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = {
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
    };
    return config;
  },
};

export default config;
