import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { updateAddressUsageTime } from '@/features/rental/search/api/apis';
import { useCreateAddressHistory } from '@/features/rental/search/hook/useAddressHooks';
import { useDeleteAddressHistory } from '@/features/rental/search/hook/useDeleteAddressHooks';
import { useGetAddressHistoryInfinite } from '@/features/rental/search/hook/useGetAddressHistoryInfiniteHooks';
import { useSearchPlaces } from '@/features/rental/search/hook/useSearchPlacesHooks';
import useThrottledScroll from '@/features/rental/search/hook/useThrottledScrollHooks';
import { isLoggedIn } from '@/features/rental/search/utils/auth/isLoggedIn';

import type { PlaceSearchResult } from '@/features/rental/search/utils/address/searchPlaces';

export const useSearchPos = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const createAddressMutation = useCreateAddressHistory();
  const deleteAddressMutation = useDeleteAddressHistory();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 로그인 상태에 따라 정렬 결정
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const sort = isAuthenticated ? 'createdAt,desc' : 'lastUsed,desc';

  // 로그인 상태 감지
  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const {
    data: addressHistoryInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetAddressHistoryInfinite(5, sort);

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
      createAddressMutation.mutate(place, {
        onSuccess: () => {
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['addressHistory', 5, sort] });
            refetch();
          }, 500);
        },
      });

      const searchParams = new URLSearchParams({
        lat: place.y.toString(),
        lng: place.x.toString(),
        address: place.road_address_name || place.address_name,
        placeName: place.place_name,
      });

      router.push(`/rental?${searchParams.toString()}`);
    },
    [createAddressMutation, refetch, sort, queryClient, router],
  );

  // 주소 이력 클릭 시 호출되는 함수
  const handleAddressHistoryClick = useCallback(
    async (item: { addressId: number; address_name: string }) => {
      setKeyword(item.address_name);

      const queryKey = ['addressHistory', 5, sort];
      const currentData = queryClient.getQueryData(queryKey);

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

        const updatedPages = oldData.pages.map((page) => {
          if (page?.content?.getAddressResponses) {
            const responses = [...page.content.getAddressResponses];
            const clickedIndex = responses.findIndex((resp) => resp.addressId === item.addressId);

            if (clickedIndex !== -1) {
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

        queryClient.setQueryData(queryKey, {
          ...oldData,
          pages: updatedPages,
        });
      }

      try {
        await updateAddressUsageTime(item.addressId);
      } catch (error) {
        console.error('주소 사용 시간 업데이트 실패:', error);
        queryClient.invalidateQueries({ queryKey });
      }
    },
    [setKeyword, queryClient, sort],
  );

  // 주소 삭제 핸들러
  const handleDeleteAddress = useCallback(
    (addressId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteAddressMutation.mutate(addressId, {
        onSuccess: () => {
          refetch();
        },
      });
    },
    [deleteAddressMutation, refetch],
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

  return {
    // 상태
    keyword,
    searchResults,
    addressHistoryInfinite,
    hasAddressHistory,
    isSearchLoading,
    isLoadingMore,
    isFetchingNextPage,
    hasNext,
    hasNextPage,

    // 핸들러
    handleSelectPlace,
    handleAddressHistoryClick,
    handleDeleteAddress,
    handleKeywordChange,
    loadNextPage,

    // refs
    scrollRef,
  };
};
