import { useQuery } from '@tanstack/react-query';

import { getRecommendPosts } from '@/features/trade/recommendation/api/apis';

import type { RecommendPost } from '@/features/trade/recommendation/lib/types';

// 추천 게시물 조회
export const useRecommendPostsQuery = () => {
  const { data: posts, isLoading } = useQuery<RecommendPost[]>({
    queryKey: ['recommendPosts'],
    queryFn: getRecommendPosts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
  return { posts, isLoading };
};
