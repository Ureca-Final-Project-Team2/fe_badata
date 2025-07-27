import { useCallback, useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchStoreList } from '@/pages/rental/map/api/apis';

import type {
  FetchStoreListParams,
  StoreCardProps,
  StoreListItem,
} from '@/pages/rental/map/lib/types';

export interface UseStoreListParams extends Omit<FetchStoreListParams, 'page'> {
  enabled?: boolean;
}

export const useStoreList = (params: UseStoreListParams) => {
  return useInfiniteQuery({
    queryKey: ['storeList', params],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('🔍 StoreList API 요청:', {
        ...params,
        page: pageParam,
        size: 10,
      });

      const response = await fetchStoreList({
        ...params,
        page: pageParam,
        size: 10, // 10개씩 고정
      });

      console.log('📦 StoreList API 응답:', response);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      // hasNext가 true이면 다음 페이지 번호 반환, false이면 undefined 반환
      return lastPage.hasNext ? allPages.length : undefined;
    },
    initialPageParam: 0,
    enabled: params.enabled ?? true,
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
  });
};

// 모든 페이지의 스토어들을 하나의 배열로 합치는 헬퍼 함수
export const flattenStoreList = (data: unknown): StoreListItem[] => {
  return (
    (data as { pages?: { showStoreResponses: StoreListItem[] }[] })?.pages?.flatMap(
      (page) => page.showStoreResponses,
    ) ?? []
  );
};

// 무한 스크롤을 위한 스크롤 감지 훅
export const useInfiniteScroll = (
  hasNextPage: boolean | undefined,
  fetchNextPage: () => void,
  isFetchingNextPage: boolean,
) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 && // 하단 1000px 전에 미리 로드
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { handleScroll };
};

// 스토어 리스트와 무한 스크롤을 함께 사용하는 올인원 훅
export const useStoreListWithInfiniteScroll = (params: UseStoreListParams) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useStoreList(params);

  // 무한 스크롤 설정
  useInfiniteScroll(hasNextPage, fetchNextPage, isFetchingNextPage);

  // 모든 스토어를 하나의 배열로 합침
  const stores = flattenStoreList(data);

  return {
    stores,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    refetch,
    fetchNextPage,
  };
};

// StoreCardProps 형태로 변환하는 헬퍼 함수
export const convertToStoreCardProps = (storeList: StoreListItem[]): StoreCardProps[] => {
  return storeList.map((store) => ({
    id: store.id,
    store: {
      id: store.id,
      name: store.name,
      latitude: store.latitude,
      longititude: store.longititude,
    },
    storeDetail: {
      storeId: store.id,
      imageUrl: '', // 실제 API에서는 이미지 URL이 제공되지 않으므로 빈 문자열
      detailAddress: store.detailAddress,
      reviewRating: 0, // API에서 제공하지 않는 경우 기본값
      isOpening: store.opening,
      startTime: store.openTime,
      endTime: store.closeTime,
      storeName: store.name,
      distanceFromMe: store.distanceFromMe, // 거리 정보 추가
    },
    deviceCount: store.leftDeviceCount,
    onLikeClick: () => {
      // 찜하기 기능 구현 필요
      console.log('Like clicked for store:', store.id);
    },
    isLiked: false, // 찜하기 상태는 별도 API로 관리 필요
  }));
};
