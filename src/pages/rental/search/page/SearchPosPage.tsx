'use client';

import { useEffect, useRef } from 'react';

import { MapPin, Target, X } from 'lucide-react';

import { useCreateAddressHistory } from '@/pages/rental/search/hook/useAddressHooks';
import { useDeleteAddressHistory } from '@/pages/rental/search/hook/useDeleteAddressHooks';
import { useGetAddressHistoryInfinite } from '@/pages/rental/search/hook/useGetAddressHistoryInfiniteHooks';
import { useSearchPlaces } from '@/pages/rental/search/hook/useSearchPlacesHooks';
import AddressInfoSection from '@/pages/rental/search/page/AddressInfoSection';
import SearchResults from '@/pages/rental/search/ui/SearchResults';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';
import { InputField } from '@/shared/ui/InputField';

import type { PlaceSearchResult } from '@/pages/rental/search/utils/address/searchPlaces';

const SearchPosPage = () => {
  const createAddressMutation = useCreateAddressHistory();
  const deleteAddressMutation = useDeleteAddressHistory();
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    data: addressHistoryInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAddressHistoryInfinite(10, 'createdAt,desc');

  // 키워드 검색 훅
  const {
    keyword,
    setKeyword,
    searchResults,
    isLoading: isSearchLoading,
    handleSearchFocus,
    handleSearchBlur,
  } = useSearchPlaces();

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

  // 검색 결과 선택 시 호출되는 함수
  const handleSelectPlace = (place: PlaceSearchResult) => {
    console.log('선택된 장소:', place);

    // 선택된 장소를 주소 이력에 추가
    createAddressMutation.mutate(place.place_name);

    // 검색 모드 종료
    setKeyword('');
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
        {/* 고정 영역 - 검색창 */}
        <div className="flex-shrink-0">
          {/* 검색 입력 필드 - BaseLayout 내부에 고정 */}
          <div className="fixed max-w-[428px] mx-auto top-[70px] left-0 right-0 z-10 bg-[var(--white)] px-6 py-2 border-b border-[var(--gray-light)]">
            <InputField
              variant="address"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              readOnly={false}
              icon={<MapPin className="text-[var(--gray-dark)]" />}
              placeholder="지번, 도로명, 건물명으로 검색"
              autoFocus={true}
              className="bg-[var(--gray-light)] text-[var(--gray-dark)] placeholder-[var(--gray-dark)] w-full"
            />
          </div>
        </div>

        {/* 스크롤 영역 - 목록만 (검색창 아래 여백 추가) */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pt-20">
          {keyword.trim() ? (
            // 검색어가 있을 때 - 검색 결과 표시
            <SearchResults
              results={searchResults}
              isLoading={isSearchLoading}
              onSelectPlace={handleSelectPlace}
            />
          ) : (
            // 검색어가 없을 때 - 현재 위치 버튼과 최근 검색 주소 표시
            <>
              {/* 현재 위치로 찾기 버튼 */}
              <button
                onClick={handleCurrentLocation}
                className="w-full bg-[var(--white)] border border-[var(--gray)] rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-[var(--gray-light)] transition-colors mb-8"
              >
                <Target className="w-5 h-5 text-[var(--gray-dark)]" />
                <span className="text-[var(--gray-dark)] font-label-semibold">
                  현재 위치로 찾기
                </span>
              </button>

              {/* 최근 검색 주소 제목 */}
              {addressHistoryInfinite?.pages &&
                addressHistoryInfinite.pages.some(
                  (page) => page.getAddressResponses.length > 0,
                ) && <h2 className="font-small-medium text-[var(--black)] mb-4">최근 검색 주소</h2>}

              {/* 주소 이력 목록 */}
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
                          onClick={() => setKeyword(item.detailAddress)}
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
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default SearchPosPage;
