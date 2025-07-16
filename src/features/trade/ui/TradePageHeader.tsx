import { PATH } from '@shared/constants/path';
import { FlatTab } from '@ui/FlatTab';
import { InputField } from '@ui/InputField';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function TradePageHeader() {
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

  const handleSearchClick = () => {
    router.push(PATH.TRADE.SEARCH);
  };

  return (
    <div className="py-4 bg-white">
      <FlatTab items={tabItems} defaultValue={defaultValue} onValueChange={handleTabChange} />
      <div className="mt-4 px-6">
        <div onClick={handleSearchClick}>
          <InputField
            variant="address"
            readOnly
            icon={<Search className="text-[var(--gray)]" />}
            placeholder="상품을 검색하세요"
          />
        </div>
      </div>
    </div>
  );
}
