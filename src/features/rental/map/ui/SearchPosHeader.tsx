'use client';

import { useRouter } from 'next/navigation';

import { Search } from 'lucide-react';

import { InputField } from '@/shared/ui/InputField';

interface SearchPosHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  onSubmit: (value: string) => void;
  isSearchPage?: boolean;
}

export const SearchPosHeader = ({
  search,
  setSearch,
  onSubmit,
  isSearchPage = false,
}: SearchPosHeaderProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (!isSearchPage) {
      router.push('/rental/search-pos');
    }
  };

  return (
    <div onClick={handleClick} className={isSearchPage ? '' : 'cursor-pointer'}>
      <InputField
        variant="address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit(search);
          }
        }}
        readOnly={!isSearchPage}
        icon={<Search className="text-[var(--gray-dark)]" />}
        placeholder="지번, 도로명, 건물명으로 검색"
        autoFocus={isSearchPage}
        className="bg-[var(--gray-light)] text-[var(--gray-dark)] placeholder-[var(--gray-dark)] w-[350px] flex-shrink-0"
      />
    </div>
  );
};
