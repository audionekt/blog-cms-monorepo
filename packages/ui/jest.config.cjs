/** @type {import('jest').Config} */
module.exports = {
  displayName: '@repo/ui',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.js'],
  
  // TypeScript transformation
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  
  // Module resolution
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@repo/tokens$': '<rootDir>/../tokens/src/index.ts',
    '^@repo/tokens/(.*)$': '<rootDir>/../tokens/src/$1',
    '^@repo/styles$': '<rootDir>/../styles/src/index.ts',
    '^@repo/styles/(.*)$': '<rootDir>/../styles/src/$1',
    // Handle CSS imports
    '\\.(css)$': '<rootDir>/src/__mocks__/styleMock.cjs',
  },
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx}',
  ],
  
  // Files to exclude from testing
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.storybook/',
    '/dist/',
    '/build/',
    '\\.stories\\.(ts|tsx)$', // Exclude Storybook files
    'src/utils/layout\\.test\\.tsx$', // Exclude layout tests (Next.js specific)
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}', // Exclude Storybook files
    '!src/**/*.styles.tsx',       // Exclude styled-components files
    '!src/**/index.{ts,tsx}',     // Exclude barrel exports
    '!src/**/*.d.ts',              // Exclude type definitions
    '!src/utils/layout.tsx',      // Exclude Layout (Next.js specific)
    '!src/layout.ts',             // Exclude layout barrel export
    '!src/tokens/**',             // Exclude design tokens
    '!src/theme/**',              // Exclude theme system
  ],
  
  // Coverage thresholds - enforcing good test coverage
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.storybook/',
    '\\.stories\\.(ts|tsx)$',
  ],
  
  // Coverage reporters for CI
  coverageReporters: ['text', 'lcov', 'html', 'cobertura'],
  
  // Better error messages
  verbose: true,
};

