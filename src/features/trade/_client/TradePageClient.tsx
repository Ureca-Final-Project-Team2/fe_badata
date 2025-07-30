'use client';

import { useSearchParams } from 'next/navigation';

import AllPage from '@/features/trade/all/page/AllPage';
import DataPage from '@/features/trade/data/page/DataPage';
import GifticonPage from '@/features/trade/gifticon/page/GifticonPage';

export default function TradePageClient() {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('page') ?? 'all';

  if (currentTab === 'data') return <DataPage />;
  if (currentTab === 'gifticon') return <GifticonPage />;
  return <AllPage />;
}
