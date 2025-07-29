import React from 'react';

import { MapPin } from 'lucide-react';

import { InputField } from '@/shared/ui/InputField';

// 검색 입력 필드 컴포넌트
const SearchInputField = React.memo(
  ({ keyword, onKeywordChange }: { keyword: string; onKeywordChange: (value: string) => void }) => (
    <div className="fixed max-w-[428px] mx-auto top-[70px] left-0 right-0 z-10 bg-[var(--white)] px-6 py-2 border-b border-[var(--gray-light)]">
      <InputField
        variant="address"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        readOnly={false}
        icon={<MapPin className="text-[var(--gray-dark)]" />}
        placeholder="지번, 도로명, 건물명으로 검색"
        autoFocus={true}
        className="bg-[var(--gray-light)] text-[var(--gray-dark)] placeholder-[var(--gray-dark)] w-full"
      />
    </div>
  ),
);

SearchInputField.displayName = 'SearchInputField';

export default SearchInputField;
