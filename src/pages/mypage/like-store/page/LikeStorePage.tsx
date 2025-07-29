'use client';

import { useRouter } from 'next/navigation';

import { useLikedStores } from '@/pages/mypage/like-store/model/queries';
import { StoreCard } from '@/pages/rental/map/ui/StoreCard';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function LikeStorePage() {
  const router = useRouter();
  const { likeStoreItems, isLoading, isError } = useLikedStores();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!likeStoreItems || likeStoreItems.length === 0) {
    return <div className="py-4 text-center text-[var(--gray)]">게시물이 없습니다.</div>;
  }

  return (
    <BaseLayout
      header={<PageHeader title="관심 매장" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-[96px]">
        {likeStoreItems.map((item) => (
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
              name: item.name,
              storeId: item.storeId,
              startTime: item.startTime,
              endTime: item.endTime,
              imageUrl: item.storeImage,
              detailAddress: item.detailAddress,
              isOpening: true, // 실제 오픈 여부는 별도 로직 필요
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
