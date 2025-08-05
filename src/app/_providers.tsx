'use client';

import { useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { LocationProvider } from '@/shared/contexts/LocationContext';
import { initKakaoSdk } from '@/shared/lib/kakao';
import { queryClient } from '@/shared/lib/queryClient';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initKakaoSdk();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>{children}</LocationProvider>
    </QueryClientProvider>
  );
}
