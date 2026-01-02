'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: how long data is considered fresh
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Cache time: how long data stays in cache after becoming unused
            gcTime: 30 * 60 * 1000, // 30 minutes (was cacheTime in v4)
            // Retry configuration
            retry: (failureCount, error: any) => {
              // Don't retry on 404s
              if (error?.status === 404) return false;
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            // Refetch on window focus for important data
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
          },
          mutations: {
            // Retry mutations once
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}