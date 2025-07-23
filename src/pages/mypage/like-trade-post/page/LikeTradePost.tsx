'use client';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

const dummyList = [
  {
    id: 1,
    title: '쇼콜라 바니드라제휴처',
    partner: '제휴처',
    price: 2050,
    likeCount: 5,
    isLiked: true,
    hasDday: true,
    dday: 5,
    imageUrl: '/assets/trade-detail.jpg',
  },
  {
    id: 2,
    title: '쇼콜라 바니드라제휴처',
    partner: '제휴처',
    price: 2050,
    likeCount: 5,
    isLiked: true,
    hasDday: true,
    dday: 5,
    imageUrl: '/assets/trade-detail.jpg',
  },
];

export default function LikeTradePostPage() {
  const router = useRouter();

  return (
    <BaseLayout header={<PageHeader title="찜 목록" onBack={() => router.back()} />} showBottomNav>
      <div className="px-4 pt-4 pb-[96px]">
        <div className="grid grid-cols-2 gap-4">
          {dummyList.map((item) => (
            <TradePostCard
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              partner={item.partner}
              price={item.price}
              likeCount={item.likeCount}
              isLiked={item.isLiked}
              hasDday={item.hasDday}
              dday={item.dday}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
} 