import React from 'react';
import { render, screen, waitFor } from '../../test-utils';
import { Providers } from '../providers';

// Mock TanStack Query
jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    QueryClient: jest.fn().mockImplementation(() => ({
      mount: jest.fn(),
      unmount: jest.fn(),
      clear: jest.fn(),
    })),
  };
});

// Mock TanStack Query Devtools
jest.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => <div data-testid="react-query-devtools">Devtools</div>,
}));

// Mock MSW
jest.mock('@repo/api/mocks', () => ({
  setupMocks: jest.fn().mockResolvedValue(undefined),
}));

describe('CMS Providers', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    jest.clearAllMocks();
  });

  describe('in development mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('shows loading state initially', () => {
      render(
        <Providers>
          <div>Child content</div>
        </Providers>
      );

      expect(screen.getByText(/initializing CMS/i)).toBeInTheDocument();
    });

    it('renders children after initialization', async () => {
      render(
        <Providers>
          <div>Child content</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Child content')).toBeInTheDocument();
      });
    });

    it('renders React Query Devtools in development', async () => {
      render(
        <Providers>
          <div>Child content</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByTestId('react-query-devtools')).toBeInTheDocument();
      });
    });
  });

  describe('with real API configured', () => {
    const originalApiUrl = process.env.NEXT_PUBLIC_API_URL;

    beforeEach(() => {
      process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
    });

    afterEach(() => {
      process.env.NEXT_PUBLIC_API_URL = originalApiUrl;
    });

    it('uses real API when URL is configured', async () => {
      const { setupMocks } = require('@repo/api/mocks');
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      render(
        <Providers>
          <div>Child content</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Child content')).toBeInTheDocument();
      });

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Using real API'),
        'https://api.example.com'
      );
      expect(setupMocks).not.toHaveBeenCalled();

      consoleLogSpy.mockRestore();
    });
  });

  describe('in production mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('does not render React Query Devtools in production', async () => {
      render(
        <Providers>
          <div>Child content</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Child content')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('react-query-devtools')).not.toBeInTheDocument();
    });

    it('renders children immediately in production', async () => {
      render(
        <Providers>
          <div>Child content</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Child content')).toBeInTheDocument();
      });
    });
  });
});

