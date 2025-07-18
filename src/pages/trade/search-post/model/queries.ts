import { useQuery } from '@tanstack/react-query';

import { getSearchTradePosts } from '@/pages/trade/search-post/api/apis';

import type { BasePost } from '@/entities/trade-post/lib/types';

const MIN_LOADING_TIME = 400;
export const useSearchTradePostsQuery = (keyword: string) => {
  return useQuery<BasePost[]>({
    queryKey: ['search-trade-posts', keyword],
    queryFn: async () => {
      const start = Date.now();
      const result = await getSearchTradePosts(keyword);
      const elapsed = Date.now() - start;

      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((res) => setTimeout(res, MIN_LOADING_TIME - elapsed));
      }

      return result;
    },
    enabled: !!keyword,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
};
