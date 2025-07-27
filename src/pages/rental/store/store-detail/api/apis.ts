import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { LikeStoreResponse } from '@/pages/rental/store/store-detail/lib/types';

/**
 * 가맹점 좋아요 토글 (POST)
 */
export const likeStore = async (storeId: number): Promise<LikeStoreResponse> => {
  try {
    const response: LikeStoreResponse = await axiosInstance.post(
      END_POINTS.STORES.LIKESTORE(storeId),
    );
    return response;
  } catch (error) {
    console.error(`가맹점 ${storeId} 좋아요 요청 실패:`, error);
    throw error;
  }
};
