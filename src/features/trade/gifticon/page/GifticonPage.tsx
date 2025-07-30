'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useTradePostsQuery } from '@/entities/trade-post/model/queries';
import { GifticonFilter } from '@/features/trade/gifticon/ui/GifticonFilter';
import { GifticonFilterDrawer } from '@/features/trade/gifticon/ui/GifticonFilterDrawer';
import { useGifticonFilterHooks } from '@/features/trade/model/useGifticonFilterHooks';
import { TradeFlatTab } from '@/features/trade/ui/TradeFlatTab';
import { TradeList } from '@/features/trade/ui/TradeList';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

export default function GifticonPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get('category') ?? '전체';

  const { posts, isLoading } = useTradePostsQuery();

  const {
    openGifticonDrawer,
    gifticonPrice,
    setGifticonPrice,
    gifticonDrawerOpen,
    closeGifticonDrawer,
    submitGifticonFilter,
  } = useGifticonFilterHooks();

  const { sortOption, setSortOption, isSortDrawerOpen, openDrawer, closeDrawer } = useSortStateHook<
    'latest' | 'popular'
  >('latest');

  const filteredPosts = (posts ?? [])
    .filter((p) => {
      return (
        p.postCategory === 'GIFTICON' &&
        (selectedCategory === '전체' || p.gifticonCategory === selectedCategory) &&
        p.price <= gifticonPrice
      );
    })
    .sort((a, b) =>
      sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount,
    );

  const handleCardClick = (post: (typeof filteredPosts)[number]) => {
    router.push(PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(post.id)));
  };

  return (
    <>
      <BaseLayout
        header={<Header />}
        showBottomNav={!isSortDrawerOpen}
        fab={<TradeFloatingButton />}
      >
        <TradeFlatTab />
        <TradeSearchInput />
        <GifticonFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => router.push(`?page=gifticon&category=${cat}`)}
        />
        <TradeList
          items={filteredPosts}
          isLoading={isLoading}
          sortLabel={sortOption === 'latest' ? '최신순' : '인기순'}
          onSortClick={openDrawer}
          onFilterClick={openGifticonDrawer}
          onItemClick={handleCardClick}
        />
      </BaseLayout>

      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <GifticonFilterDrawer
        isOpen={gifticonDrawerOpen}
        onClose={closeGifticonDrawer}
        maxPrice={gifticonPrice}
        onPriceChange={setGifticonPrice}
        onSubmit={submitGifticonFilter}
        onReset={() => setGifticonPrice(50000)}
      />
    </>
  );
}
