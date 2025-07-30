'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { PATH } from '@/shared/config/path';
import { FlatTab } from '@/shared/ui/FlatTab';

interface TradeFlatTabProps {
  className?: string;
}

export function TradeFlatTab({ className }: TradeFlatTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ?? 'all';

  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'data', label: '데이터' },
    { id: 'gifticon', label: '기프티콘' },
  ];

  const handleTabChange = (tabId: string) => {
    router.push(`${PATH.TRADE.MAIN}?page=${tabId}`);
  };

  return (
    <FlatTab
      items={tabs}
      defaultValue={tabs.find((tab) => tab.id === page)?.id ?? 'all'}
      onValueChange={handleTabChange}
      className={className}
    />
  );
}
