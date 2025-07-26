import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { LikeStoreItem } from '@/pages/mypage/like-store/lib/types';

export const fetchLikedStores = async (
  cursor?: number,
  size: number = 10,
): Promise<{ item: LikeStoreItem[]; nextCursor: number; hasNext: boolean }> => {
  const content: { item: LikeStoreItem[]; nextCursor: number; hasNext: boolean } = await axiosInstance.get('/api/v1/users/likes/stores', {
    params: { cursor, size },
  });
  return content;
};
