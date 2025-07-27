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
  useMockData?: boolean; // Mock 데이터 사용 옵션 추가
}

// Mock 데이터 생성 함수
const generateMockStoreList = (page: number): StoreListItem[] => {
  const stores: StoreListItem[] = [];
  const startId = page * 10 + 1;

  for (let i = 0; i < 10; i++) {
    stores.push({
      id: startId + i,
      longititude: 127.03832055267158 + (Math.random() - 0.5) * 0.01,
      latitude: 37.55555294967707 + (Math.random() - 0.5) * 0.01,
      name: `LG유플러스 테스트점 ${startId + i}`,
      openTime: '09:00:00',
      closeTime: '18:00:00',
      distanceFromMe: Math.floor(Math.random() * 2000) + 100,
      detailAddress: `서울 강남구 테스트동 ${startId + i}번지`,
      leftDeviceCount: Math.floor(Math.random() * 20) + 1,
      opening: Math.random() > 0.3, // 70% 확률로 영업중
    });
  }

  return stores;
};

// Mock API 함수
const fetchMockStoreList = async (params: FetchStoreListParams) => {
  // 실제 API와 동일한 응답 구조
  const page = params.page || 0;
  const stores = generateMockStoreList(page);

  // 3페이지까지만 데이터가 있다고 가정
  const hasNext = page < 2;

  return {
    showStoreResponses: stores,
    hasNext,
  };
};

export const useStoreList = (params: UseStoreListParams) => {
  return useInfiniteQuery({
    queryKey: ['storeList', params],
    queryFn: async ({ pageParam = 0 }) => {
      // Mock 데이터 사용 옵션이 있으면 Mock 데이터 사용
      if (params.useMockData) {
        return await fetchMockStoreList({
          ...params,
          page: pageParam,
          size: 10,
        });
      }

      // 실제 API 호출
      return await fetchStoreList({
        ...params,
        page: pageParam,
        size: 10, // 10개씩 고정
      });
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
      imageUrl: '', // API에서 제공하지 않는 경우 빈 문자열
      detailAddress: store.detailAddress,
      phoneNumber: '', // API에서 제공하지 않는 경우 빈 문자열
      distanceFromMe: store.distanceFromMe,
      reviewRating: 0, // API에서 제공하지 않는 경우 기본값
      isOpening: store.opening,
      startTime: store.openTime,
      endTime: store.closeTime,
      storeName: store.name,
    },
    deviceCount: store.leftDeviceCount,
    onLikeClick: () => {
      // 찜하기 기능 구현 필요
      console.log('Like clicked for store:', store.id);
    },
    isLiked: false, // 찜하기 상태는 별도 API로 관리 필요
  }));
};
