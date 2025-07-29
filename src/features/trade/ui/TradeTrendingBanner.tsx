import { useRouter } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import { useTradePostLikeHooks } from '@/entities/trade-post/model/useTradePostLikeHooks';
import { useTradeTrendingQuery } from '@/features/trade/model/queries';
import BannerItem from '@/features/trade/ui/BannerItem';
import { PATH } from '@/shared/config/path';
import { AutoSwiper } from '@/shared/ui/AutoSwiper';

export function TradeTrendingBanner() {
  const router = useRouter();
  const { trendingPosts, isLoading } = useTradeTrendingQuery();
  const { toggleLike, isItemLoading } = useTradePostLikeHooks();

  if (isLoading) {
    return <div className="py-4 text-center text-[var(--gray)]">로딩 중...</div>;
  }
  if (!trendingPosts || trendingPosts.length === 0) {
    return <div className="py-4 text-center text-[var(--gray)]">게시물이 없습니다.</div>;
  }

  const handleLikeToggle = (postId: number) => {
    const item = trendingPosts.find((post) => post.id === postId);
    if (item) {
      toggleLike(item);
    }
  };

  const handleCardClick = (postId: number) => {
    const item = trendingPosts.find((post) => post.id === postId);
    if (!item) return;

    const path =
      item.postCategory === 'DATA'
        ? PATH.TRADE.DATA_DETAIL.replace(':id', String(postId))
        : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(postId));
    router.push(path);
  };

  return (
    <section className="bg-white mb-6">
      <div className="flex items-center justify-between pb-2 px-1">
        <h2 className="font-body-semibold">실시간 핫한 게시물 🔥</h2>
        <ChevronRight
          className="text-[var(--gray-dark)] cursor-pointer"
          size={20}
          onClick={() => router.push(PATH.TRADE.TRENDING)}
        />
      </div>

      <AutoSwiper
        items={trendingPosts.slice(0, 10)}
        getKey={(item) => item.id}
        autoPlayDelay={2000}
        slidesPerView={1}
        spaceBetween={120}
      >
        {(item) => (
          <BannerItem
            key={item.id}
            id={item.id}
            imageUrl={item.postImage}
            partner={item.partner}
            mobileCarrier={item.mobileCarrier}
            price={item.price}
            title={item.title}
            likeCount={item.likesCount}
            isLiked={item.isLiked}
            onLikeToggle={handleLikeToggle}
            isLikeLoading={isItemLoading(item.id)}
            onCardClick={handleCardClick}
          />
        )}
      </AutoSwiper>
    </section>
  );
}
