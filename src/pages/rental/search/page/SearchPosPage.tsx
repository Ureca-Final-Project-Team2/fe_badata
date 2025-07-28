'use client';

import { useState } from 'react';

import { MapPin, Target, X } from 'lucide-react';

import { useCreateAddressHistory } from '@/pages/rental/search/hook/useAddressHooks';
import { useDeleteAddressHistory } from '@/pages/rental/search/hook/useDeleteAddressHooks';
import { useGetAddressHistory } from '@/pages/rental/search/hook/useGetAddressHistoryHooks';
import AddressInfoSection from '@/pages/rental/search/page/AddressInfoSection';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';
import { InputField } from '@/shared/ui/InputField';

const SearchPosPage = () => {
  const [search, setSearch] = useState('');
  const createAddressMutation = useCreateAddressHistory();
  const deleteAddressMutation = useDeleteAddressHistory();
  const { data: addressHistory } = useGetAddressHistory(0, 10, 'createdAt,desc');

  const handleSubmit = (value: string) => {
    console.log('검색어 제출:', value);

    // 주소만 전달하면 hook에서 좌표 변환 후 API 호출
    createAddressMutation.mutate(value);
  };

  const handleCurrentLocation = () => {
    console.log('현재 위치로 찾기');
    // TODO: 현재 위치 기반 검색 로직 구현
  };

  const handleDeleteAddress = (addressId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    deleteAddressMutation.mutate(addressId);
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

        {/* 주소 이력 또는 검색 예시 섹션 */}
        <div className="mt-8">
          {addressHistory?.getAddressResponses && addressHistory.getAddressResponses.length > 0 ? (
            // 주소 이력이 있는 경우 - 리스트로 표시
            <div>
              <h2 className="font-small-medium text-[var(--black)] mb-4">최근 검색 주소</h2>
              <div className="space-y-2">
                {addressHistory.getAddressResponses.map((item) => (
                  <div
                    key={item.addressId}
                    className="p-2 border-b border-[var(--gray-light)] cursor-pointer transition-colors"
                    onClick={() => setSearch(item.detailAddress)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[var(--gray-dark)] font-small-regular">
                        {item.detailAddress}
                      </p>
                      <button
                        onClick={(e) => handleDeleteAddress(item.addressId, e)}
                        className="p-1 hover:bg-[var(--gray-light)] rounded transition-colors"
                      >
                        <X className="w-3 h-3 text-[var(--gray)]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // 주소 이력이 없는 경우 - 검색 예시 표시
            <AddressInfoSection />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default SearchPosPage;
