import { usePathname, useRouter } from 'next/navigation';

import { PATH } from '@/shared/config/path';
import { FlatTab } from '@/shared/ui/FlatTab';

interface TradeFlatTabProps {
  className?: string;
}
export function TradeFlatTab({ className }: TradeFlatTabProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabItems = [
    { id: 'all', label: '전체', content: null },
    { id: 'data', label: '데이터', content: null },
    { id: 'gifticon', label: '기프티콘', content: null },
  ];

  const defaultValue = pathname?.includes('/data')
    ? 'data'
    : pathname?.includes('/gifticon')
      ? 'gifticon'
      : 'all';

  const handleTabChange = (tabId: string) => {
    switch (tabId) {
      case 'all':
        router.push(PATH.TRADE.MAIN);
        break;
      case 'data':
        router.push(PATH.TRADE.DATA);
        break;
      case 'gifticon':
        router.push(PATH.TRADE.GIFTICON);
        break;
    }
  };

  return (
    <FlatTab
      items={tabItems}
      defaultValue={defaultValue}
      onValueChange={handleTabChange}
      className={className}
    />
  );
}
