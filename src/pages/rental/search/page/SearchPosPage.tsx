'use client';

import { useEffect, useRef } from 'react';

import { MapPin, Phone, Target, X } from 'lucide-react';

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
  } = useGetAddressHistoryInfinite(5, 'createdAt,desc');

  // 키워드 검색 훅
  const {
    keyword,
    setKeyword,
    searchResults,
    isLoading: isSearchLoading,
    isLoadingMore,
    hasNext,
    loadNextPage,
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

    // 선택된 장소를 주소 이력에 추가 (전체 정보 전달)
    createAddressMutation.mutate(place);

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
              isLoadingMore={isLoadingMore}
              hasNext={hasNext}
              onSelectPlace={handleSelectPlace}
              onLoadMore={loadNextPage}
              keyword={keyword.trim()}
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
                  (page) => page?.content?.getAddressResponses?.length > 0,
                ) && <h2 className="font-small-medium text-[var(--black)] mb-4">최근 검색 주소</h2>}

              {/* 주소 이력 목록 */}
              {addressHistoryInfinite?.pages &&
              addressHistoryInfinite.pages.some(
                (page) => page?.content?.getAddressResponses?.length > 0,
              ) ? (
                // 주소 이력이 있는 경우 - 리스트로 표시
                <div>
                  <div className="space-y-2">
                    {addressHistoryInfinite.pages.map((page) =>
                      page?.content?.getAddressResponses?.map((item) => (
                        <div
                          key={item.addressId}
                          className="p-3 border-b border-[var(--gray-light)] cursor-pointer hover:bg-[var(--gray-light)] transition-colors"
                          onClick={() => setKeyword(item.address_name)}
                        >
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-[var(--gray-dark)] mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              {/* 장소명 */}
                              <h3 className="text-[var(--black)] font-small-semibold mb-1 truncate">
                                {item.place_name}
                              </h3>

                              {/* 도로명 주소 */}
                              {item.road_address_name && (
                                <p className="text-[var(--gray-dark)] font-small-regular mb-1">
                                  {item.road_address_name}
                                </p>
                              )}

                              {/* 지번 주소 */}
                              <p className="text-[var(--gray-dark)] font-small-regular mb-1">
                                지번 {item.address_name}
                              </p>

                              {/* 전화번호 */}
                              {item.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-[var(--main-5)]" />
                                  <span className="text-[var(--main-5)] font-small-semibold">
                                    {item.phone}
                                  </span>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={(e) => handleDeleteAddress(item.addressId, e)}
                              className="p-1 hover:bg-[var(--gray-light)] rounded transition-colors flex-shrink-0"
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
