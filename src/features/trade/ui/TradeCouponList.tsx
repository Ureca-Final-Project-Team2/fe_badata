import { ArrowDownUp, ListFilter } from 'lucide-react';

import { useTradePostsQuery } from '@features/trade/model/useTradeQueries';
import { Drawer, DrawerButton, FilterDrawerButton } from '@ui/Drawer';
import { Product } from '@ui/Product';

interface TradeCouponListProps {
  sortOption: 'latest' | 'popular';
  setSortOption: (value: 'latest' | 'popular') => void;
  isSortDrawerOpen: boolean;
  setIsSortDrawerOpen: (value: boolean) => void;
  selectedCategory: string;
}

export function TradeCouponList({
  sortOption,
  setSortOption,
  isSortDrawerOpen,
  setIsSortDrawerOpen,
  selectedCategory,
}: TradeCouponListProps) {
  const { posts, isLoading } = useTradePostsQuery();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>쿠폰 게시물이 없습니다.</div>;
  }
  const couponPosts = posts.filter((p) => p.postCategory === 'GIFTICON');

  const filtered = couponPosts.filter(
    (p) => selectedCategory === '전체' || p.gifticonCategory === selectedCategory,
  );

  const sorted = [...filtered].sort((a, b) =>
    sortOption === 'latest'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : b.likesCount - a.likesCount,
  );

  return (
    <section className="bg-white px-6 py-4">
      <div className="flex flex-row justify-between py-2">
        <button
          onClick={() => setIsSortDrawerOpen(true)}
          className="flex flex-row gap-1 items-center font-semibold"
        >
          <ArrowDownUp size={16} />
          {sortOption === 'latest' ? '최신순' : '인기순'}
        </button>

        <div className="flex flex-row gap-1 items-center font-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4">
        {sorted.map((item) => (
          <Product
            key={item.id}
            brand={item.partner}
            name={item.title}
            price={item.price}
            imageSrc={item.postImage}
            likeCount={item.likesCount}
          />
        ))}
      </div>
      <Drawer isOpen={isSortDrawerOpen} onClose={() => setIsSortDrawerOpen(false)} variant="filter">
        <FilterDrawerButton
          selected={sortOption === 'latest'}
          onClick={() => {
            setSortOption('latest');
            setIsSortDrawerOpen(false);
          }}
        >
          최신순
        </FilterDrawerButton>
        <FilterDrawerButton
          selected={sortOption === 'popular'}
          onClick={() => {
            setSortOption('popular');
            setIsSortDrawerOpen(false);
          }}
        >
          인기순
        </FilterDrawerButton>
        <DrawerButton variant="close" onClick={() => setIsSortDrawerOpen(false)} theme="light">
          닫기
        </DrawerButton>
      </Drawer>
    </section>
  );
}
