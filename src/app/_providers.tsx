'use client';

import { useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { initKakaoSdk } from '@/shared/lib/kakao';
import { queryClient } from '@/shared/lib/queryClient';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initKakaoSdk();
  }, []);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
