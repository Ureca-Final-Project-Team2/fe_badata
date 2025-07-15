'use client';

import { InputField } from '@ui/InputField';
import { Search } from 'lucide-react';

interface SearchHeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchHeader = ({ search, setSearch }: SearchHeaderProps) => {
  return (
    <section className="mt-4 mb-6">
      <InputField
        variant="address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        readOnly={false}
        icon={<Search className="text-[var(--gray)]" />}
        placeholder="상품을 검색하세요"
        autoFocus
      />
    </section>
  );
};
