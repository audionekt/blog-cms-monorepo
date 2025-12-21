import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Providers } from '../providers';

// Mock the @repo/api/mocks module
jest.mock('@repo/api/mocks', () => ({
  setupMocks: jest.fn().mockResolvedValue(undefined),
}));

// Mock TanStack Query components
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn().mockImplementation(() => ({
    // Mock QueryClient methods if needed
  })),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-provider">{children}</div>
  ),
}));

jest.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => <div data-testid="react-query-devtools">Devtools</div>,
}));

describe('Providers', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe('in development mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('shows loading state initially', () => {
      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      expect(screen.getByText(/initializing/i)).toBeInTheDocument();
      expect(screen.getByText(/connecting to api/i)).toBeInTheDocument();
    });

    it('initializes MSW in development mode', async () => {
      const { setupMocks } = require('@repo/api/mocks');

      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(setupMocks).toHaveBeenCalled();
      });
    });

    it('renders children after MSW is ready', async () => {
      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Child')).toBeInTheDocument();
      });
    });

    it('wraps children with QueryClientProvider', async () => {
      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByTestId('query-provider')).toBeInTheDocument();
      });
    });

    it('renders React Query Devtools in development', async () => {
      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByTestId('react-query-devtools')).toBeInTheDocument();
      });
    });

    it('handles MSW initialization errors gracefully', async () => {
      const { setupMocks } = require('@repo/api/mocks');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      setupMocks.mockRejectedValueOnce(new Error('MSW init failed'));

      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Child')).toBeInTheDocument();
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to initialize MSW:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('logs success message when MSW initializes', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('MSW is ready')
        );
      });

      consoleLogSpy.mockRestore();
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
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Child')).toBeInTheDocument();
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

    it('does not initialize MSW in production', async () => {
      const { setupMocks } = require('@repo/api/mocks');

      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Child')).toBeInTheDocument();
      });

      expect(setupMocks).not.toHaveBeenCalled();
    });

    it('renders children immediately in production', async () => {
      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      // Should not show loading state
      expect(screen.queryByText(/initializing/i)).not.toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Test Child')).toBeInTheDocument();
      });
    });

    it('does not render React Query Devtools in production', async () => {
      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Child')).toBeInTheDocument();
      });

      expect(screen.queryByTestId('react-query-devtools')).not.toBeInTheDocument();
    });
  });

  describe('loading state UI', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('displays loading spinner emoji', () => {
      render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      expect(screen.getByText(/🔄/)).toBeInTheDocument();
    });

    it('has proper loading state styles', () => {
      const { container } = render(
        <Providers>
          <div>Test Child</div>
        </Providers>
      );

      const loadingDiv = container.querySelector('div[style*="height: 100vh"]');
      expect(loadingDiv).toBeInTheDocument();
    });
  });

  describe('QueryClientProvider configuration', () => {
    it('wraps children with query provider', async () => {
      render(
        <Providers>
          <div data-testid="child-content">Child Content</div>
        </Providers>
      );

      await waitFor(() => {
        const queryProvider = screen.getByTestId('query-provider');
        expect(queryProvider).toBeInTheDocument();
        expect(screen.getByTestId('child-content')).toBeInTheDocument();
      });
    });
  });
});

