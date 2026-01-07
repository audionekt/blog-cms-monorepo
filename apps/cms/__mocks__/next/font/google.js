// Manual mock for next/font/google
module.exports = {
  Geist: jest.fn(() => ({
    className: 'mock-geist-sans',
    variable: '--font-geist-sans',
  })),
  Geist_Mono: jest.fn(() => ({
    className: 'mock-geist-mono',
    variable: '--font-geist-mono',
  })),
};

