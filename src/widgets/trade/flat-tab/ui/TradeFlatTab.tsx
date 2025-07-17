import { usePathname, useRouter } from 'next/navigation';

import { PATH } from '@/shared/config/path';
import { FlatTab } from '@/shared/ui/FlatTab';

export function TradeFlatTab() {
  const router = useRouter();
  const pathname = usePathname();

  const tabItems = [
    { id: 'all', label: '전체', content: null },
    { id: 'data', label: '데이터', content: null },
    { id: 'coupon', label: '쿠폰', content: null },
  ];

  const defaultValue = pathname.includes('/data')
    ? 'data'
    : pathname.includes('/coupon')
      ? 'coupon'
      : 'all';

  const handleTabChange = (tabId: string) => {
    switch (tabId) {
      case 'all':
        router.push(PATH.TRADE.MAIN);
        break;
      case 'data':
        router.push(PATH.TRADE.DATA);
        break;
      case 'coupon':
        router.push(PATH.TRADE.COUPON);
        break;
    }
  };

  return <FlatTab items={tabItems} defaultValue={defaultValue} onValueChange={handleTabChange} />;
}
