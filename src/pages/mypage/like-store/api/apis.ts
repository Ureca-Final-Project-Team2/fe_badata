import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { LikeStoreItem } from '@/pages/mypage/like-store/lib/types';

export const fetchLikedStores = async (
  cursor?: number,
  size: number = 10,
): Promise<{ item: LikeStoreItem[]; nextCursor: number; hasNext: boolean }> => {
  try {
    const response = await axiosInstance.get('/api/v1/users/likes/stores', {
      params: { cursor, size },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
