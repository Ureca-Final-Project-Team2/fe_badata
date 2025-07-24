'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { DeadlineFlatTab } from '@/pages/trade/deadline/ui/DeadlineFlatTab';
import { DeadlineList } from '@/pages/trade/deadline/ui/DeadlineList';
import { useTradeDeadlineQuery } from '@/pages/trade/model/queries';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

import type { DeadlinePost } from '@/entities/trade-post/lib/types';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
];

export default function DeadlinePage() {
  const router = useRouter();
  const { deadlinePosts: posts, isLoading } = useTradeDeadlineQuery();
  const { sortOption, setSortOption, isSortDrawerOpen, openDrawer, closeDrawer } = useSortStateHook<
    'latest' | 'popular'
  >('latest');

  const processedPosts = useMemo(() => {
    if (!posts) return [];

    const dataPosts = posts.filter((p) => p.postCategory === 'DATA');
    return [...dataPosts].sort((a, b) =>
      sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount,
    );
  }, [posts, sortOption]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? '최신순';

  const handleItemClick = (item: DeadlinePost) => {
    router.push(PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id)));
  };

  return (
    <>
      <BaseLayout header={<PageHeader title="마감 임박 게시물" onBack={() => router.back()} />}>
        <DeadlineFlatTab className="my-4" />
        <DeadlineList
          items={processedPosts}
          isLoading={isLoading}
          sortLabel={currentSortLabel}
          onSortClick={openDrawer}
          onItemClick={handleItemClick}
        />
      </BaseLayout>
      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
    </>
  );
}
