'use client';

import { useEffect, useRef, useState } from 'react';

import { MapPin, Target, X } from 'lucide-react';

import { useCreateAddressHistory } from '@/pages/rental/search/hook/useAddressHooks';
import { useDeleteAddressHistory } from '@/pages/rental/search/hook/useDeleteAddressHooks';
import { useGetAddressHistoryInfinite } from '@/pages/rental/search/hook/useGetAddressHistoryInfiniteHooks';
import AddressInfoSection from '@/pages/rental/search/page/AddressInfoSection';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';
import { InputField } from '@/shared/ui/InputField';

const SearchPosPage = () => {
  const [search, setSearch] = useState('');
  const createAddressMutation = useCreateAddressHistory();
  const deleteAddressMutation = useDeleteAddressHistory();
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    data: addressHistoryInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAddressHistoryInfinite(10, 'createdAt,desc');

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100px 전에 로드

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
      <div className="w-full h-full flex flex-col">
        {/* 고정 영역 */}
        <div className="flex-shrink-0">
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

          {/* 최근 검색 주소 제목 */}
          {addressHistoryInfinite?.pages &&
            addressHistoryInfinite.pages.some((page) => page.getAddressResponses.length > 0) && (
              <h2 className="font-small-medium text-[var(--black)] mt-8">최근 검색 주소</h2>
            )}
        </div>

        {/* 스크롤 영역 */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto mt-8"
          style={{ maxHeight: 'calc(100vh - 300px)' }}
        >
          {addressHistoryInfinite?.pages &&
          addressHistoryInfinite.pages.some((page) => page.getAddressResponses.length > 0) ? (
            // 주소 이력이 있는 경우 - 리스트로 표시
            <div>
              <div className="space-y-2">
                {addressHistoryInfinite.pages.map((page) =>
                  page.getAddressResponses.map((item) => (
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
                  )),
                )}
                {/* 무한스크롤 로딩 표시 */}
                {isFetchingNextPage && (
                  <div className="text-center py-4">
                    <p className="text-[var(--gray-dark)]">로딩 중...</p>
                  </div>
                )}
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
