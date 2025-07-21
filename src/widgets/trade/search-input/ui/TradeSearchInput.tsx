import { useRouter } from 'next/navigation';

import { Search } from 'lucide-react';

import { PATH } from '@/shared/config/path';
import { InputField } from '@/shared/ui/InputField';

export function TradeSearchInput() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push(PATH.TRADE.SEARCH);
  };

  return (
    <div className="my-4">
      <div onClick={handleSearchClick}>
        <InputField
          variant="address"
          readOnly
          icon={<Search className="text-[var(--gray)]" />}
          placeholder="상품을 검색하세요"
        />
      </div>
    </div>
  );
}
