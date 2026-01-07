// CMS-specific Jest setup
// Mock next/font/google for all CMS tests
jest.mock('next/font/google', () => ({
  Geist: jest.fn(() => ({
    className: 'mock-geist-sans',
    variable: '--font-geist-sans',
  })),
  Geist_Mono: jest.fn(() => ({
    className: 'mock-geist-mono',
    variable: '--font-geist-mono',
  })),
}));

