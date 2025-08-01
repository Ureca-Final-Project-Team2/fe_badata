import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getTradePosts, tradePostApis } from '@/entities/trade-post/api/apis';
import { useAllFollowingsQuery } from '@/entities/user/model/queries';
import { getTradePostDetail } from '@/features/trade/data/detail/api/apis';

import type {
  DeadlinePost,
  SellerPostsContent,
  UserInfoResponse,
} from '@/entities/trade-post/lib/types';

export const useTradePostsQuery = () => {
  const { data: posts, isLoading } = useQuery<DeadlinePost[]>({
    queryKey: ['trade-posts'],
    queryFn: getTradePosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { posts, isLoading };
};

export const useTradePostDetailQuery = (postId: number) => {
  const {
    data: postDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['trade', 'detail', postId],
    queryFn: () => getTradePostDetail(postId),
    enabled: !!postId,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return {
    post: postDetail?.post,
    postUserId: postDetail?.postUserId,
    sellerName: postDetail?.sellerName,
    isLoading,
    error,
  };
};

// 판매자 관련 쿼리들
// 판매자 정보 조회 훅
export const useSellerInfoQuery = (userId: number) => {
  return useQuery<UserInfoResponse>({
    queryKey: ['seller', 'info', userId],
    queryFn: () => tradePostApis.getSellerInfo(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// 팔로우 토글 뮤테이션 훅
export const useFollowToggleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tradePostApis.postFollowToggle,
    onSuccess: (data, userId) => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ['seller', 'info', userId] });
      queryClient.invalidateQueries({ queryKey: ['followers'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['followings'], exact: false });
      // user 레벨의 팔로잉 쿼리들도 무효화
      queryClient.invalidateQueries({ queryKey: ['user', 'followings'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['user', 'all-followings'], exact: false });
    },
    onError: (error) => {
      console.error('팔로우 토글 실패:', error);
    },
  });
};

// 판매자의 팔로우 상태 확인 훅
export const useSellerFollowStatusQuery = (sellerId: number) => {
  const { data: allFollowings } = useAllFollowingsQuery();

  const isFollowing =
    allFollowings?.content?.item?.some((following) => following.userId === sellerId) || false;

  return {
    isFollowing,
    isLoading: !allFollowings,
  };
};

// 판매자의 거래 게시물 조회 훅 (무한 스크롤용)
export const useSellerPostsQuery = (
  userId: number,
  isSold: boolean,
  cursor?: number,
  size: number = 30,
) => {
  return useInfiniteQuery<SellerPostsContent>({
    queryKey: ['seller', 'posts', userId, isSold, size],
    queryFn: ({ pageParam }) =>
      tradePostApis.getSellerPosts(userId, isSold, pageParam as number | undefined, size),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.hasNext) return undefined;
      return lastPage.nextCursor;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// 판매자의 거래완료 게시물 개수 조회 훅
export const useSellerSoldPostsCountQuery = (userId: number) => {
  return useQuery({
    queryKey: ['seller', 'sold-count', userId],
    queryFn: async () => {
      // 충분히 큰 size로 설정하여 모든 판매 완료 게시물을 가져옴
      console.log('판매완료 게시물 조회 시작 - userId:', userId);
      const response = await tradePostApis.getSellerPosts(userId, true, undefined, 10000);
      console.log('판매완료 게시물 응답:', response);
      console.log('판매완료 게시물 개수:', response.item?.length || 0);
      return response.item?.length || 0;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
