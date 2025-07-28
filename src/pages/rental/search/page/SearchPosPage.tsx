'use client';

import { useState } from 'react';

import { MapPin, Target } from 'lucide-react';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';
import { InputField } from '@/shared/ui/InputField';

const SearchPosPage = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = (value: string) => {
    console.log('검색어 제출:', value);
    // TODO: 검색 로직 구현
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
          <h2 className="font-small-medium text-[var(--black)] mb-4">이렇게 검색해 보세요</h2>
          <div className="font-small-regular text-[var(--black)]">
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 bg-[var(--gray)] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-[var(--black)]">도로명 + 건물번호 (위례성대로 2)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 bg-[var(--gray)] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-[var(--black)]">건물명 + 번지 (방이동 44-2)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 bg-[var(--gray)] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-[var(--black)]">
                건물명, 아파트명(반포자이, 분당 주공아파트)
              </span>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default SearchPosPage;
