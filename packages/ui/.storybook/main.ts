import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    'msw-storybook-addon',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['./public'],
  viteFinal: async (config) => {
    // Set unique cache directory to avoid conflicts
    config.cacheDir = path.join(__dirname, '../node_modules/.vite-storybook');

    // Remove dts plugin from Storybook (not needed for preview builds)
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin: any) => plugin && plugin.name !== 'vite:dts'
      );
    }

    // Configure alias for workspace packages
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@repo/styles': path.resolve(__dirname, '../../styles/src'),
      '@repo/tokens': path.resolve(__dirname, '../../tokens/src'),
      '@repo/api': path.resolve(__dirname, '../../api/src'),
      // Mock Next.js font imports for Storybook
      'next/font/google': path.resolve(__dirname, './mocks/next-font-google.js'),
    };

    return config;
  },
};

export default config;
