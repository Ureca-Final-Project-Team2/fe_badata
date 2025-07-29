import { useRouter, useSearchParams } from 'next/navigation';

import { PATH } from '@/shared/config/path';
import { FlatTab } from '@/shared/ui/FlatTab';

interface TrendingFlatTabProps {
  className?: string;
}

export function TrendingFlatTab({ className }: TrendingFlatTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ?? 'all';

  const tabItems = [
    { id: 'all', label: '전체', content: null },
    { id: 'data', label: '데이터', content: null },
    { id: 'gifticon', label: '기프티콘', content: null },
  ];

  const handleTabChange = (tabId: string) => {
    router.push(`${PATH.TRADE.TRENDING}?page=${tabId}`);
  };

  return (
    <FlatTab
      items={tabItems}
      defaultValue={tabItems.find((tab) => tab.id === page)?.id ?? 'all'}
      onValueChange={handleTabChange}
      className={className}
    />
  );
}
