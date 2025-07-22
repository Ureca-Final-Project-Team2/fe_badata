'use client';

import { useRouter } from 'next/navigation';

import { StoreCard } from '@/pages/rental/map/ui/StoreCard';
import { BaseLayout } from '@/shared/ui/BaseLayout';
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
    <BaseLayout header={<PageHeader title="관심 매장" onBack={() => router.back()} />} showBottomNav>
      <div className="flex flex-col gap-4 px-4 pt-6 pb-[96px]">
        {likeStores.map((item) => (
          <StoreCard
            key={item.store.id}
            id={item.store.id}
            store={item.store}
            storeDetail={item.storeDetail}
            deviceCount={item.deviceCount}
            isLiked={item.isLiked}
            showDistance={false}
            className="font-title-regular"
          />
        ))}
      </div>
    </BaseLayout>
  );
} 