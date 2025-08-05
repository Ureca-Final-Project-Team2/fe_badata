import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { userApis } from '@/entities/user/api/apis';

import type {
  CoinResponse,
  FollowingsContent,
  PurchaseReportResponse,
  PurchaseResponse,
  PurchasedGifticonDetail,
  PurchasedGifticonImage,
  SalesContent,
  UserInfoResponse,
} from '@/entities/user/lib/types';
import type { ApiResponse } from '@/shared/lib/axios/responseTypes';
import type { UserTradePostsResponse } from '@/widgets/trade/post-detail/lib/types';

// 팔로우 목록 조회 훅
export const useFollowingsQuery = (cursor?: number, size: number = 10) => {
  return useQuery<ApiResponse<FollowingsContent>>({
    queryKey: ['user', 'followings', cursor, size],
    queryFn: () => userApis.getFollowings(cursor, size),
    staleTime: 5 * 60 * 1000,
  });
};

// 모든 팔로잉 목록 조회 훅 (팔로우 상태 확인용)
export const useAllFollowingsQuery = () => {
  return useQuery<ApiResponse<FollowingsContent>>({
    queryKey: ['user', 'all-followings'],
    queryFn: async () => {
      let allItems: Array<{
        id: number;
        userId: number;
        nickname: string;
        profileImageUrl: string;
      }> = [];
      let cursor: number | undefined;
      let hasNext = true;
      let loopCount = 0;

      while (hasNext && loopCount < 10) {
        // 무한 루프 방지
        const response = await userApis.getFollowings(cursor, 100); // 최대 100개씩 가져오기

        const items = response.content?.item || [];
        allItems = [...allItems, ...items];

        hasNext = response.content?.hasNext || false;
        cursor = response.content?.nextCursor;
        loopCount++;
      }

      return {
        code: 20000,
        message: undefined,
        content: {
          item: allItems,
          nextCursor: 0,
          hasNext: false,
        },
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

// 판매 내역 조회 훅 (무한 스크롤용)
export const useSalesQuery = (
  userId?: number,
  postCategory?: string,
  isSold?: boolean,
  cursor?: number,
  size: number = 30,
) => {
  return useInfiniteQuery<ApiResponse<SalesContent>>({
    queryKey: ['user', 'sales', userId, postCategory, isSold, size],
    queryFn: ({ pageParam }) =>
      userApis.getSales(userId, postCategory, isSold, pageParam as number | undefined, size),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.content?.hasNext) return undefined;
      return lastPage.content.nextCursor;
    },
    enabled: true, // userId가 없어도 현재 로그인한 사용자의 데이터를 가져올 수 있음
    staleTime: 5 * 60 * 1000,
  });
};

// 사용자 거래 게시물 조회 훅
export const useUserTradePostsQuery = (userId?: number) => {
  return useQuery<UserTradePostsResponse>({
    queryKey: ['user', 'trade-posts', userId],
    queryFn: () => {
      if (!userId) throw new Error('userId is required');
      return userApis.getUserTradePosts(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// 특정 사용자의 거래된 총 게시물의 수 조회 훅
export const useUserSoldPostsCountQuery = (userId?: number) => {
  const { data: userTradePosts } = useUserTradePostsQuery(userId);

  const soldPostsCount = userTradePosts?.soldedPostsResponse?.postsResponse?.length ?? 0;
  const displayCount = soldPostsCount >= 100 ? '100+' : soldPostsCount;

  return {
    data: displayCount,
    isLoading: !userTradePosts,
    error: null,
  };
};

// 구매 내역 조회 훅 (무한 스크롤용)
export const usePurchasesQuery = (
  postCategory?: string,
  isSold?: boolean,
  cursor?: number,
  size: number = 30,
) => {
  return useInfiniteQuery<ApiResponse<PurchaseResponse>>({
    queryKey: ['user', 'purchases', postCategory, isSold, size],
    queryFn: ({ pageParam }) =>
      userApis.getPurchases(postCategory, isSold, pageParam as number | undefined, size),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.content?.hasNext) return undefined;
      return lastPage.content.nextCursor;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount) => failureCount < 2, // 최대 2번 재시도
  });
};

// 코인 조회 훅
export const useCoinQuery = () => {
  return useQuery<ApiResponse<CoinResponse>>({
    queryKey: ['user', 'coin'],
    queryFn: () => userApis.getCoin(),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 사용자 정보 조회 훅
export const useUserInfoQuery = () => {
  const { isLoggedIn } = useAuthStore();

  return useQuery<UserInfoResponse>({
    queryKey: ['user', 'info'],
    queryFn: userApis.getUserInfo,
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
};

// 마이페이지 총 구매, 판매 내역 조회
export const useUserPostCountQuery = (tradeType: 'SALE' | 'PURCHASE', enabled: boolean = true) => {
  return useQuery<number>({
    queryKey: ['userPostCount', tradeType],
    queryFn: () => userApis.getUserPostCount(tradeType),
    enabled,
    staleTime: 1000 * 60 * 5, // optional
  });
};

// 구매한 기프티콘 상세 정보 조회 훅
export const usePurchasedGifticonDetailQuery = (gifticonId: string) => {
  return useQuery<PurchasedGifticonDetail>({
    queryKey: ['user', 'purchased-gifticon-detail', gifticonId],
    queryFn: () => userApis.getPurchasedGifticonDetail(gifticonId),
    enabled: !!gifticonId,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 구매한 기프티콘 이미지 조회 훅
export const usePurchasedGifticonImageQuery = (gifticonId: string) => {
  return useQuery<PurchasedGifticonImage>({
    queryKey: ['user', 'purchased-gifticon-image', gifticonId],
    queryFn: () => userApis.getPurchasedGifticonImage(gifticonId),
    enabled: !!gifticonId,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 구매 신고 제출 훅
export const usePurchaseReportMutation = () => {
  return useMutation<
    ApiResponse<PurchaseReportResponse>,
    Error,
    { postId: number; comment: string }
  >({
    mutationFn: ({ postId, comment }) => userApis.postPurchaseReport(postId, { comment }),
    onSuccess: () => {},
    onError: (error) => {
      console.error('구매 신고 제출 실패:', error);
    },
  });
};
