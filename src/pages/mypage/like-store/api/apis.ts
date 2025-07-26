import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { LikeStoreItem } from '@/pages/mypage/like-store/lib/types';

export interface LikedStoreResponse {
  item: LikeStoreItem[];
  nextCursor: number;
  hasNext: boolean;
}

export const fetchLikedStores = async (
  cursor?: number,
  size: number = 10,
): Promise<LikedStoreResponse> => {
  return await axiosInstance.get('/api/v1/users/likes/stores', {
    params: { cursor, size },
  });
};
