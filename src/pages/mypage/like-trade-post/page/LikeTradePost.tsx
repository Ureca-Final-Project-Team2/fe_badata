'use client';


import { useRouter } from 'next/navigation';

import { BottomNav } from '@/shared/ui/BottomNav';
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
    <div className="min-h-screen bg-[var(--white)] flex flex-col items-center relative">
      <div className="w-full max-w-[428px]">
        <PageHeader title="찜 목록" onBack={() => router.back()} />
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
      </div>
      <div className="fixed bottom-0 w-full max-w-[428px]">
        <BottomNav />
      </div>
    </div>
  );
} 