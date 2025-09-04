'use client';
import { useMemo, useRef } from 'react';

import type { StoreCardProps, StoreListItem } from '@/features/rental/map/lib/types';

function shallowEqualCard(a: StoreCardProps, b: StoreCardProps) {
  return (
    a.id === b.id &&
    a.deviceCount === b.deviceCount &&
    a.isLiked === b.isLiked &&
    a.store.id === b.store.id &&
    a.store.name === b.store.name &&
    a.store.leftDeviceCount === b.store.leftDeviceCount &&
    a.store.latitude === b.store.latitude &&
    a.store.longititude === b.store.longititude &&
    a.storeDetail.imageUrl === b.storeDetail.imageUrl &&
    a.storeDetail.detailAddress === b.storeDetail.detailAddress &&
    a.storeDetail.isOpening === b.storeDetail.isOpening &&
    a.storeDetail.startTime === b.storeDetail.startTime &&
    a.storeDetail.endTime === b.storeDetail.endTime &&
    a.storeDetail.distanceFromMe === b.storeDetail.distanceFromMe
  );
}

/** StoreListItem[] → 안정화된 StoreCardProps[] (동일 값이면 이전 객체 참조를 재사용) */
export function useStableStoreCardProps(stores: StoreListItem[]) {
  const cacheRef = useRef<Map<number, StoreCardProps>>(new Map());

  return useMemo<StoreCardProps[]>(() => {
    const out: StoreCardProps[] = [];
    const cache = cacheRef.current;

    for (const s of stores) {
      const prev = cache.get(s.id);

      const nextCandidate: StoreCardProps = {
        id: s.id,
        store: {
          id: s.id,
          name: s.name,
          leftDeviceCount: s.leftDeviceCount,
          liked: s.liked,
          latitude: s.latitude,
          longititude: s.longititude,
        },
        storeDetail: {
          storeId: s.id,
          imageUrl: s.storeImageUrl,
          detailAddress: s.detailAddress,
          reviewRating: 0,
          isOpening: s.opening,
          startTime: s.openTime,
          endTime: s.closeTime,
          distanceFromMe: s.distanceFromMe,
          name: s.name,
        },
        deviceCount: s.leftDeviceCount,
        isLiked: s.liked,
        // onLikeToggle/onLikeClick 등 액션 프롭이 타입에 있더라도 대부분 선택(Optional)이므로 생략
      };

      if (prev && shallowEqualCard(prev, nextCandidate)) {
        out.push(prev); // 값 동일 → 이전 참조 재사용
      } else {
        cache.set(s.id, nextCandidate);
        out.push(nextCandidate);
      }
    }

    return out;
  }, [stores]);
}
