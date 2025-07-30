import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useTradePostsQuery } from '@/entities/trade-post/model/queries';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';

import type { DeadlinePost as PostItem } from '@/entities/trade-post/lib/types';

export const useAllTradePostsHooks = () => {
  const { posts, isLoading } = useTradePostsQuery();
  const {
    sortOption,
    setSortOption,
    isSortDrawerOpen,
    openDrawer: openSortDrawer,
    closeDrawer: closeSortDrawer,
  } = useSortStateHook<'latest' | 'popular'>('latest');

  const sortedPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) =>
      sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount,
    );
  }, [posts, sortOption]);

  const router = useRouter();

  const onItemClick = (item: PostItem) => {
    const path =
      item.postCategory === 'DATA'
        ? PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id))
        : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(item.id));
    router.push(path);
  };

  return {
    posts: sortedPosts,
    isLoading,
    sortOption,
    sortHandlers: {
      sortOption,
      setSortOption,
      isSortDrawerOpen,
      openSortDrawer,
      closeSortDrawer,
      onItemClick,
    },
  };
};
