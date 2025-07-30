'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FlatTab } from '@/shared/ui/FlatTab';

interface TradeFlatTabProps {
  className?: string;
  basePath?: string;
}

export function TradeFlatTab({ className, basePath }: TradeFlatTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams?.get('page') ?? 'all';

  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'data', label: '데이터' },
    { id: 'gifticon', label: '기프티콘' },
  ];

  const handleTabChange = (tabId: string) => {
    const path = basePath ?? pathname;
    router.push(`${path}?page=${tabId}`);
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
