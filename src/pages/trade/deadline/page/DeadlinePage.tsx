'use client';

import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { DeadlineList } from '@/pages/trade/deadline/ui/DeadlineList';
import { useTradeDeadlineQuery } from '@/pages/trade/model/queries';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

import { DeadlineFlatTab } from '../ui/DeadlineFlatTab';

import type { DeadlinePost } from '@/entities/trade-post/lib/types';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
];

export default function DeadlinePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ?? 'all';

  const { deadlinePosts: posts, isLoading } = useTradeDeadlineQuery();
  const { sortOption, setSortOption, isSortDrawerOpen, openDrawer, closeDrawer } = useSortStateHook<
    'latest' | 'popular'
  >('latest');

  const processedPosts = useMemo(() => {
    if (!posts) return [];

    const filtered = posts.filter((p) =>
      page === 'all' ? true : p.postCategory === page.toUpperCase(),
    );

    return [...filtered].sort((a, b) =>
      sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount,
    );
  }, [posts, page, sortOption]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? '최신순';

  const handleCardClick = (item: DeadlinePost) => {
    const path =
      item.postCategory === 'DATA'
        ? PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id))
        : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(item.id));
    router.push(path);
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
          onItemClick={handleCardClick}
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
