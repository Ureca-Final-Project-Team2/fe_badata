import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchStoreList } from '@/features/rental/map/api/apis';

import type {
  FetchStoreListParams,
  StoreCardProps,
  StoreListItem,
} from '@/features/rental/map/lib/types';
import type { InfiniteData } from '@tanstack/react-query';

export interface UseStoreListParams extends Omit<FetchStoreListParams, 'page'> {
  enabled?: boolean;
}

export const useStoreList = (params: UseStoreListParams) => {
  return useInfiniteQuery({
    queryKey: ['storeList', params],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchStoreList({
        ...params,
        page: pageParam,
        size: 10, // 10개씩 고정
      });

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
export const flattenStoreList = (
  data: InfiniteData<{ showStoreResponses: StoreListItem[]; hasNext: boolean }> | undefined,
): StoreListItem[] => {
  if (!data?.pages) return [];
  return data.pages.flatMap((page) => page.showStoreResponses);
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
      imageUrl: store.storeImageUrl,
      detailAddress: store.detailAddress,
      reviewRating: 0, // API에서 제공하지 않는 경우 기본값
      isOpening: store.opening,
      startTime: store.openTime,
      endTime: store.closeTime,
      storeName: store.name,
      distanceFromMe: store.distanceFromMe, // 거리 정보 추가
      name: store.name, // StoreDetail 타입에 name 필드 추가
    },
    deviceCount: store.leftDeviceCount,
    onLikeClick: () => {
      // 찜하기 기능 구현 필요
    },
    isLiked: false, // 찜하기 상태는 별도 API로 관리 필요
  }));
};
