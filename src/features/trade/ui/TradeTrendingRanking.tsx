'use client';

import { useRouter } from 'next/navigation';

import { useTradeTrendingQuery } from '@/features/trade/model/queries';
import RankingItem from '@/features/trade/ui/RankingItem';
import { ICONS } from '@/shared/config/iconPath';
import { PATH } from '@/shared/config/path';
import { getCarrierDefaultImage } from '@/shared/lib/getCarrierDefaultImage';
import { getPartnerDefaultImage } from '@/shared/lib/getPartnerDefaultImage';
import { SwipeScroll } from '@/shared/ui/SwipeScroll/SwipeScroll';

import type { KoreanBrandName } from '@/shared/config/brandMapping';

export function TradeTrendingRanking() {
  const router = useRouter();
  const { trendingPosts, isLoading } = useTradeTrendingQuery();

  const handleGetPostImage = (postId: number) => {
    const item = trendingPosts?.find((post) => post.id === postId);
    if (!item) return;

    if (item.partner) {
      return getPartnerDefaultImage(item.partner as KoreanBrandName);
    }

    if (item.mobileCarrier) {
      return getCarrierDefaultImage(item.mobileCarrier);
    }
  };

  const handleCardClick = (postId: number) => {
    const item = trendingPosts?.find((post) => post.id === postId);
    if (!item) return;

    const path =
      item.postCategory === 'DATA'
        ? PATH.TRADE.DATA_DETAIL.replace(':id', String(postId))
        : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(postId));
    router.push(path);
  };

  return (
    <section className="bg-white mb-6 ">
      <h2 className="font-body-semibold pb-2 px-1">실시간 핫한 게시물 🔥</h2>

      {isLoading ? (
        <div className="py-4 text-center text-[var(--gray)]">로딩 중...</div>
      ) : !trendingPosts || trendingPosts.length === 0 ? (
        <div className="py-4 text-center text-[var(--gray)]">핫한 게시물이 없습니다.</div>
      ) : (
        <SwipeScroll items={trendingPosts} getKey={(item) => item.id}>
          {(item, index) => (
            <RankingItem
              rank={index + 1}
              imageUrl={handleGetPostImage(item.id) ?? ICONS.LOGO.SAMPLE}
              title={item.title}
              onCardClick={() => handleCardClick(item.id)}
            />
          )}
        </SwipeScroll>
      )}
    </section>
  );
}
