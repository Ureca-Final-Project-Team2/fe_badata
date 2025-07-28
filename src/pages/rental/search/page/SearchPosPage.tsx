'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { updateAddressUsageTime } from '@/pages/rental/search/api/apis';
import { useCreateAddressHistory } from '@/pages/rental/search/hook/useAddressHooks';
import { useDeleteAddressHistory } from '@/pages/rental/search/hook/useDeleteAddressHooks';
import { useGetAddressHistoryInfinite } from '@/pages/rental/search/hook/useGetAddressHistoryInfiniteHooks';
import { useSearchPlaces } from '@/pages/rental/search/hook/useSearchPlacesHooks';
import useThrottledScroll from '@/pages/rental/search/hook/useThrottledScrollHooks';
import AddressHistoryList from '@/pages/rental/search/ui/AddressHistoryList';
import CurrentLocationButton from '@/pages/rental/search/ui/CurrentLocationButton';
import SearchInputField from '@/pages/rental/search/ui/SearchInputField';
import SearchResults from '@/pages/rental/search/ui/SearchResults';
import {
  getAddressHistoryQueryKey,
  getAddressHistorySortBy,
} from '@/pages/rental/search/utils/sortUtils';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';

import type { PlaceSearchResult } from '@/pages/rental/search/utils/address/searchPlaces';

const SearchPosPage = () => {
  const queryClient = useQueryClient();
  const createAddressMutation = useCreateAddressHistory();
  const deleteAddressMutation = useDeleteAddressHistory();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 클라이언트 사이드에서만 정렬 기준 가져오기
  const [sortBy, setSortBy] = React.useState('lastUsed,desc');

  React.useEffect(() => {
    setSortBy(getAddressHistorySortBy());
  }, []);

  const {
    data: addressHistoryInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAddressHistoryInfinite(5, sortBy);

  // 키워드 검색 훅
  const {
    keyword,
    setKeyword,
    searchResults,
    isLoading: isSearchLoading,
    isLoadingMore,
    hasNext,
    loadNextPage,
  } = useSearchPlaces();

  // 검색 결과 선택 시 호출되는 함수
  const handleSelectPlace = useCallback(
    (place: PlaceSearchResult) => {
      console.log('선택된 장소:', place);
      createAddressMutation.mutate(place);
      setKeyword('');
    },
    [createAddressMutation, setKeyword],
  );

  // 주소 이력 클릭 시 호출되는 함수
  const handleAddressHistoryClick = useCallback(
    async (item: { addressId: number; address_name: string }) => {
      setKeyword(item.address_name);

      // 낙관적 업데이트: 클릭한 주소를 맨 위로 이동
      const currentData = queryClient.getQueryData(getAddressHistoryQueryKey());

      if (currentData && typeof currentData === 'object' && 'pages' in currentData) {
        const oldData = currentData as {
          pages: Array<{
            content?: {
              getAddressResponses?: Array<{
                addressId: number;
                address_name: string;
                id: string;
                phone: string;
                place_name: string;
                road_address_name: string;
                x: number;
                y: number;
                lastUsed?: number;
              }>;
            };
          }>;
        };

        // 클릭한 주소를 찾아서 맨 위로 이동
        const updatedPages = oldData.pages.map((page) => {
          if (page?.content?.getAddressResponses) {
            const responses = [...page.content.getAddressResponses];
            const clickedIndex = responses.findIndex((resp) => resp.addressId === item.addressId);

            if (clickedIndex !== -1) {
              // 클릭한 주소를 맨 위로 이동하고 lastUsed 업데이트
              const clickedItem = { ...responses[clickedIndex], lastUsed: Date.now() };
              responses.splice(clickedIndex, 1);
              responses.unshift(clickedItem);

              return {
                ...page,
                content: {
                  ...page.content,
                  getAddressResponses: responses,
                },
              };
            }
          }
          return page;
        });

        // 낙관적 업데이트 적용
        queryClient.setQueryData(getAddressHistoryQueryKey(), {
          ...oldData,
          pages: updatedPages,
        });
      }

      try {
        await updateAddressUsageTime(item.addressId);
      } catch (error) {
        console.error('주소 사용 시간 업데이트 실패:', error);
        // 에러 시 캐시 무효화하여 서버 데이터로 복원
        queryClient.invalidateQueries({ queryKey: getAddressHistoryQueryKey() });
      }
    },
    [setKeyword, queryClient],
  );

  // 현재 위치 클릭 핸들러
  const handleCurrentLocation = useCallback(() => {
    console.log('현재 위치로 찾기');
    // TODO: 현재 위치 기반 검색 로직 구현
  }, []);

  // 주소 삭제 핸들러
  const handleDeleteAddress = useCallback(
    (addressId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteAddressMutation.mutate(addressId);
    },
    [deleteAddressMutation],
  );

  // 키워드 변경 핸들러
  const handleKeywordChange = useCallback(
    (value: string) => {
      setKeyword(value);
    },
    [setKeyword],
  );

  // 스크롤 핸들러
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const throttledHandleScroll = useThrottledScroll(handleScroll, 100);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', throttledHandleScroll);
      return () => scrollElement.removeEventListener('scroll', throttledHandleScroll);
    }
  }, [throttledHandleScroll]);

  // 주소 이력 존재 여부
  const hasAddressHistory = useMemo(() => {
    return (
      Array.isArray(addressHistoryInfinite?.pages) &&
      addressHistoryInfinite.pages.some(
        (page) =>
          Array.isArray(page?.content?.getAddressResponses) &&
          page.content.getAddressResponses.length > 0,
      )
    );
  }, [addressHistoryInfinite?.pages]);

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
          <SearchInputField keyword={keyword} onKeywordChange={handleKeywordChange} />
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
              <CurrentLocationButton onClick={handleCurrentLocation} />

              {/* 최근 검색 주소 제목 */}
              {hasAddressHistory && (
                <h2 className="font-small-medium text-[var(--black)] mb-4">최근 검색 주소</h2>
              )}

              {/* 주소 이력 목록 */}
              <AddressHistoryList
                addressHistoryInfinite={addressHistoryInfinite ?? { pages: [] }}
                onAddressClick={handleAddressHistoryClick}
                onDelete={handleDeleteAddress}
                isFetchingNextPage={isFetchingNextPage}
              />
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default SearchPosPage;
