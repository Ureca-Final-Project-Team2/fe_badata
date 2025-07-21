'use client';

import { useRouter } from 'next/navigation';

import { StoreCardNoDistance } from '@/pages/rental/map/ui/StoreCard';
import { BottomNav } from '@/shared/ui/BottomNav';
import { PageHeader } from '@/shared/ui/Header';

const likeStores = [
  {
    id: 1,
    store: {
      id: 101,
      name: 'LG유플러스 선릉점',
      latitude: 37.504,
      longitude: 127.048,
    },
    storeDetail: {
      storeId: 101,
      isOpening: true,
      startTime: '10:00',
      endTime: '20:00',
      imageUrl: '',
      distanceFromMe: 0,
      detailAddress: '서울 강남구 대치동',
      phoneNumber: '02-1234-5678',
      reviewRating: 4.5,
    },
    deviceCount: 3,
    isLiked: true,
  },
  {
    id: 2,
    store: {
      id: 102,
      name: 'LG유플러스 선릉점',
      latitude: 37.504,
      longitude: 127.048,
    },
    storeDetail: {
      storeId: 102,
      isOpening: true,
      startTime: '10:00',
      endTime: '20:00',
      imageUrl: '',
      distanceFromMe: 0,
      detailAddress: '서울 강남구 대치동',
      phoneNumber: '02-1234-5678',
      reviewRating: 4.5,
    },
    deviceCount: 3,
    isLiked: true,
  },
];

export default function LikeStorePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[var(--white)] flex flex-col items-center relative">
      <div className="w-full max-w-[428px]">
        <PageHeader title="관심 매장" onBack={() => router.back()} />
        <div className="flex flex-col gap-4 px-4 pt-6 pb-[96px]">
          {likeStores.map((item) => (
            <StoreCardNoDistance
              key={item.store.id}
              id={item.store.id}
              store={item.store}
              storeDetail={item.storeDetail}
              deviceCount={item.deviceCount}
              isLiked={item.isLiked}
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 w-full max-w-[428px]">
        <BottomNav />
      </div>
    </div>
  );
} 