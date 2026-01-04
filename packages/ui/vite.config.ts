import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import baseConfig from '../../vite.config.base';

// Extend the base config with package-specific settings
export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      dts({
        include: ['src/**/*'],
        exclude: [
          'src/**/*.test.tsx',
          'src/**/*.test.ts',
          'src/**/*.stories.tsx',
          'src/**/*.styles.tsx',  // Exclude styled-components files from types
          'src/utils/layout.tsx',  // Exclude Layout (uses Next.js fonts)
        ],
        rollupTypes: false,
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Aurigami',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'styled-components', 'next', 'next/navigation'],
      },
    },
  })
);

