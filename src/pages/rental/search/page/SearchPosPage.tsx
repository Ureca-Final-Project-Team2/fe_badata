'use client';

import { useState } from 'react';

import { MapPin, Target } from 'lucide-react';

import { useCreateAddressHistory } from '@/pages/rental/search/hook/useAddressHooks';
import AddressInfoSection from '@/pages/rental/search/page/AddressInfoSection';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';
import { InputField } from '@/shared/ui/InputField';

const SearchPosPage = () => {
  const [search, setSearch] = useState('');
  const createAddressMutation = useCreateAddressHistory();

  const handleSubmit = (value: string) => {
    console.log('검색어 제출:', value);

    // 주소만 전달하면 hook에서 좌표 변환 후 API 호출
    createAddressMutation.mutate(value);
  };

  const handleCurrentLocation = () => {
    console.log('현재 위치로 찾기');
    // TODO: 현재 위치 기반 검색 로직 구현
  };

  return (
    <BaseLayout
      centered
      paddingX={true}
      showHeader={true}
      showBottomNav
      header={<Header_Detail title="주소 설정" />}
    >
      <div className="w-full">
        {/* 메인 안내 문구 */}
        <h1 className="font-body-semibold text-[var(--black)] mt-5 mb-3">
          기준 주소를
          <br />
          설정해 주세요
        </h1>

        {/* 검색 입력 필드 */}
        <div className="mb-4">
          <InputField
            variant="address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(search);
              }
            }}
            readOnly={false}
            icon={<MapPin className="text-[var(--gray-dark)]" />}
            placeholder="지번, 도로명, 건물명으로 검색"
            autoFocus={true}
            className="bg-[var(--gray-light)] text-[var(--gray-dark)] placeholder-[var(--gray-dark)] w-full"
          />
        </div>

        {/* 현재 위치로 찾기 버튼 */}
        <button
          onClick={handleCurrentLocation}
          className="w-full bg-[var(--white)] border border-[var(--gray)] rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-[var(--gray-light)] transition-colors"
        >
          <Target className="w-5 h-5 text-[var(--gray-dark)]" />
          <span className="text-[var(--gray-dark)] font-label-semibold">현재 위치로 찾기</span>
        </button>

        {/* 검색 예시 섹션 */}
        <div className="mt-8">
          <AddressInfoSection />
        </div>
      </div>
    </BaseLayout>
  );
};

export default SearchPosPage;
