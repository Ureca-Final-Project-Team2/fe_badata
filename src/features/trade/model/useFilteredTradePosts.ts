import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useTradePostsQuery } from '@/entities/trade-post/model/queries';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';

import type { DeadlinePost as PostItem } from '@/entities/trade-post/lib/types';

export const useFilteredTradePosts = (tab: string) => {
  const { posts } = useTradePostsQuery();
  const { sortOption, setSortOption, openDrawer, closeDrawer } = useSortStateHook<
    'latest' | 'popular'
  >('latest');

  const filteredPosts = useMemo(() => {
    const base = tab === 'all' ? posts : posts?.filter((p) => p.postCategory === tab.toUpperCase());

    return [...(base ?? [])].sort((a, b) => {
      if (sortOption === 'latest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return b.likesCount - a.likesCount;
      }
    });
  }, [posts, tab, sortOption]);

  const router = useRouter();

  const onItemClick = (item: PostItem) => {
    const path =
      item.postCategory === 'DATA'
        ? PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id))
        : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(item.id));
    router.push(path);
  };

  return {
    filteredPosts,
    isLoading: false,
    sortOption,
    sortHandlers: {
      openDrawer,
      closeDrawer,
      setSortOption,
      onItemClick,
    },
  };
};
