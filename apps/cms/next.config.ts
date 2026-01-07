import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  outputFileTracingRoot: path.resolve(__dirname, '../..'),
  transpilePackages: ['aurigami'],
  experimental: {
    externalDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  // API requests are proxied via /app/api/[...path]/route.ts to avoid CORS issues
  webpack: (config) => {
    // Add alias for workspace packages to resolve from source
    config.resolve.alias = {
      ...config.resolve.alias,
      'aurigami/layout': path.resolve(__dirname, '../../packages/ui/src/layout.ts'),
      'aurigami': path.resolve(__dirname, '../../packages/ui/src'),
    };
    
    return config;
  },
};

export default nextConfig;
