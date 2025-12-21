'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Providers component that sets up:
 * 1. Mock Service Worker (MSW) in development (when no API URL is configured)
 * 2. TanStack Query (React Query) for data fetching
 * 
 * To use real backend: Set NEXT_PUBLIC_API_URL in .env.local
 * To use mock data: Remove or comment out NEXT_PUBLIC_API_URL
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Check if real API URL is configured
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const useRealApi = apiUrl && apiUrl.trim() !== '' && apiUrl !== 'undefined';

      if (useRealApi) {
        console.log('🌐 Using real API:', apiUrl);
        setReady(true);
        return;
      }

      // Use MSW for mocked data in development
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        try {
          console.log('🔧 No API URL configured - initializing MSW for mocked data');
          const { setupMocks } = await import('@repo/api/mocks');
          await setupMocks();
          console.log('✅ MSW is ready - API calls will be mocked');
        } catch (error) {
          console.error('Failed to initialize MSW:', error);
        }
      }
      setReady(true);
    };

    init();
  }, []);

  if (!ready) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div>
          <div style={{ marginBottom: '8px' }}>🔄 Initializing...</div>
          <div style={{ fontSize: '14px', color: '#999' }}>
            Connecting to API...
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

