'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useInView } from 'framer-motion';

import { useTradePostsInfiniteQuery } from '@/entities/trade-post/model/queries';
import { DataFilterDrawer } from '@/features/trade/data/ui/DataFilterDrawer';
import { GifticonFilter } from '@/features/trade/gifticon/ui/GifticonFilter';
import { GifticonFilterDrawer } from '@/features/trade/gifticon/ui/GifticonFilterDrawer';
import { useDataFilterHooks } from '@/features/trade/model/useDataFilterHooks';
import { useGifticonFilterHooks } from '@/features/trade/model/useGifticonFilterHooks';
import { TradeDeadlineBanner } from '@/features/trade/ui/TradeDeadlineBanner';
import { TradeFlatTab } from '@/features/trade/ui/TradeFlatTab';
import { TradeList } from '@/features/trade/ui/TradeList';
import TradeRecommendPostsSection from '@/features/trade/ui/TradeRecommendPostsSection';
import { TradeTrendingRanking } from '@/features/trade/ui/TradeTrendingRanking';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { SectionDivider } from '@/shared/ui/SectionDivider';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

export default function TradePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ?? 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useTradePostsInfiniteQuery();

  // 데이터가 로딩 중이거나 에러인 경우 빈 배열 사용
  const allPosts = data?.pages?.flatMap((page) => page.item) ?? [];

  const { sortOption, setSortOption, isSortDrawerOpen, openDrawer, closeDrawer } = useSortStateHook<
    'latest' | 'popular'
  >('latest');

  const {
    dataFilterState,
    dataDispatch,
    dataDrawerOpen,
    openDataDrawer,
    closeDataDrawer,
    submitDataFilter,
  } = useDataFilterHooks();

  const {
    gifticonPrice,
    setGifticonPrice,
    gifticonDrawerOpen,
    openGifticonDrawer,
    closeGifticonDrawer,
    submitGifticonFilter,
  } = useGifticonFilterHooks();

  const filteredPosts = allPosts
    .filter((post) => {
      if (page === 'data') {
        const { carriers, capacities, priceRange } = dataFilterState;
        return (
          post.postCategory === 'DATA' &&
          (carriers.length === 0 ||
            (post.mobileCarrier && carriers.includes(post.mobileCarrier))) &&
          (capacities.length === 0 || capacities.includes(post.capacity?.toString() ?? '')) &&
          (!priceRange || post.price <= Number(priceRange))
        );
      }
      if (page === 'gifticon') {
        return post.postCategory === 'GIFTICON' && post.price <= gifticonPrice;
      }
      return true;
    })
    .sort((a, b) =>
      sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount,
    );

  const currentTitle =
    page === 'data' ? '데이터 게시물' : page === 'gifticon' ? '기프티콘 게시물' : '전체 게시물';

  const handleCardClick = (post: (typeof filteredPosts)[number]) => {
    const path =
      post.postCategory === 'DATA'
        ? PATH.TRADE.DATA_DETAIL.replace(':id', String(post.id))
        : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(post.id));
    router.push(path);
  };

  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 로딩 중이거나 에러인 경우 로딩 UI 표시
  if (isLoading) {
    return (
      <>
        <TradeFlatTab basePath="/trade" />
        <TradeSearchInput />
        <div className="flex items-center justify-center py-20">
          <div className="text-[var(--gray)]">로딩 중...</div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <TradeFlatTab basePath="/trade" />
        <TradeSearchInput />
        <div className="flex items-center justify-center py-20">
          <div className="text-[var(--gray)]">데이터를 불러오는 중 오류가 발생했습니다.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <TradeFlatTab basePath="/trade" />
      <TradeSearchInput />
      {page === 'all' && (
        <>
          <TradeRecommendPostsSection />
          <TradeTrendingRanking />
          <TradeDeadlineBanner />
          <SectionDivider size="full" thickness="thick" />
        </>
      )}

      {page === 'gifticon' && (
        <GifticonFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
      <TradeList
        title={currentTitle}
        items={filteredPosts}
        isLoading={false}
        sortLabel={sortOption === 'latest' ? '최신순' : '인기순'}
        onSortClick={openDrawer}
        onFilterClick={
          page === 'data' ? openDataDrawer : page === 'gifticon' ? openGifticonDrawer : undefined
        }
        onItemClick={handleCardClick}
      />
      <div ref={loadMoreRef} className="h-8" />

      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {page === 'data' && (
        <DataFilterDrawer
          isOpen={dataDrawerOpen}
          onClose={closeDataDrawer}
          filterState={dataFilterState}
          dispatch={dataDispatch}
          onSubmit={submitDataFilter}
        />
      )}
      {page === 'gifticon' && (
        <GifticonFilterDrawer
          isOpen={gifticonDrawerOpen}
          onClose={closeGifticonDrawer}
          maxPrice={gifticonPrice}
          onPriceChange={setGifticonPrice}
          onSubmit={submitGifticonFilter}
          onReset={() => setGifticonPrice(50000)}
        />
      )}
    </>
  );
}
