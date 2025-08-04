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
              imageUrl={
                (item.partner && getPartnerDefaultImage(item.partner as KoreanBrandName)) ||
                (item.mobileCarrier && getCarrierDefaultImage(item.mobileCarrier)) ||
                ICONS.LOGO.SAMPLE
              }
              title={item.title}
              onCardClick={() => {
                const path =
                  item.postCategory === 'DATA'
                    ? PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id))
                    : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(item.id));
                router.push(path);
              }}
            />
          )}
        </SwipeScroll>
      )}
    </section>
  );
}
