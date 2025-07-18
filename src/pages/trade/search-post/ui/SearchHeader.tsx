'use client';

import { Search } from 'lucide-react';

import { InputField } from '@/shared/ui/InputField';

interface SearchHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onSubmit: (value: string) => void;
}

export const SearchHeader = ({ search, setSearch, onSubmit }: SearchHeaderProps) => {
  return (
    <section className="mt-4 mb-6">
      <InputField
        variant="address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit(search);
          }
        }}
        readOnly={false}
        icon={<Search className="text-[var(--gray)]" />}
        placeholder="상품을 검색하세요"
        autoFocus
      />
    </section>
  );
};
