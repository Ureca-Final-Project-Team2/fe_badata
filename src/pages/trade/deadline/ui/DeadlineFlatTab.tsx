import { usePathname, useRouter } from 'next/navigation';

import { PATH } from '@/shared/config/path';
import { FlatTab } from '@/shared/ui/FlatTab';

interface DeadlineFlatTabProps {
  className?: string;
}
export function DeadlineFlatTab({ className }: DeadlineFlatTabProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabItems = [
    { id: 'all', label: '전체', content: null },
    { id: 'data', label: '데이터', content: null },
    { id: 'gifticon', label: '기프티콘', content: null },
  ];

  const defaultValue = pathname?.includes('/deadline/data')
    ? 'data'
    : pathname?.includes('/deadline/gifticon')
      ? 'gifticon'
      : 'all';

  const handleTabChange = (tabId: string) => {
    switch (tabId) {
      case 'all':
        router.push(PATH.TRADE.DEADLINE);
        break;
      case 'data':
        router.push(PATH.TRADE.DEADLINE_DATA);
        break;
      case 'gifticon':
        router.push(PATH.TRADE.DEADLINE_GIFTICON);
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
