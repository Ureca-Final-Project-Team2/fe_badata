import { useState } from 'react';
import { Search } from 'lucide-react';
import { FlatTab } from '@ui/FlatTab';
import { InputField } from '@ui/InputField';

export function TradePageHeader() {
  const [search, setSearch] = useState('');

  const tabItems = [
    { id: 'all', label: '전체', content: null },
    { id: 'data', label: '데이터', content: null },
    { id: 'coupon', label: '쿠폰', content: null },
  ];

  return (
    <div className="py-4 bg-white">
      <FlatTab items={tabItems} defaultValue="all" />
      <div className="mt-4 px-6">
        <InputField
          variant="address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="text-[var(--gray)]" />}
          placeholder="상품을 검색하세요"
        />
      </div>
    </div>
  );
}
