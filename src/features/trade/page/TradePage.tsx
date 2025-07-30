'use client';

import { useSearchParams } from 'next/navigation';

import DataPage from '@/features/trade/data/page/DataPage';
import GifticonPage from '@/features/trade/gifticon/page/GifticonPage';
import AllPage from '@/features/trade/page/AllPage';

export default function TradePage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('page') ?? 'all';

  if (currentTab === 'data') return <DataPage />;
  if (currentTab === 'gifticon') return <GifticonPage />;
  return <AllPage />;
}
