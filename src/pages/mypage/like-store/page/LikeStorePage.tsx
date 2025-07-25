'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { StoreCard } from '@/pages/rental/map/ui/StoreCard';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import { fetchLikedStores } from '../api/apis';

import type { LikeStoreItem, LikeStoreResponse } from '../lib/types';

export function useLikedStores(cursor?: number, size: number = 10) {
  return useQuery<LikeStoreResponse>({
    queryKey: ['likedStores', cursor, size],
    queryFn: () => fetchLikedStores(cursor, size),
  });
}

export default function LikeStorePage() {
  const router = useRouter();
  const { data, isLoading, isError } = useLikedStores();
  const items = (data?.item ?? []) as LikeStoreItem[];

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <BaseLayout header={<PageHeader title="관심 매장" onBack={() => router.back()} />} showBottomNav>
      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-[96px]">
        {items.map((item: import('../lib/types').LikeStoreItem) => (
          <StoreCard
            key={item.storeId}
            id={item.storeId}
            store={{
              id: item.storeId,
              name: item.name,
              latitude: 0, // 타입 요구로 임시값
              longititude: 0, // 타입 요구로 임시값
            }}
            storeDetail={{
              storeId: item.storeId,
              isOpening: true, // 실제 오픈 여부는 별도 로직 필요
              startTime: item.startTime,
              endTime: item.endTime,
              imageUrl: item.storeImage,
              detailAddress: item.detailAddress,
              phoneNumber: '', // 타입 요구로 임시값
              distanceFromMe: 0, // 타입 요구로 임시값
              reviewRating: 0, // 타입 요구로 임시값
            }}
            deviceCount={item.availableDevice}
            isLiked={true}
            showDistance={false}
            className="font-title-regular w-[95%] max-w-[400px]"
          />
        ))}
      </div>
    </BaseLayout>
  );
} 