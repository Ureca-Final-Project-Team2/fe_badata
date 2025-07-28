import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosHistoryResponse } from '@/pages/mypage/sos-history/lib/types';

export const getSosHistory = async (
  cursor?: number,
  size = 10,
): Promise<SosHistoryResponse['content'] | null> => {
    try {
    const response: SosHistoryResponse = await axiosInstance.get(
      END_POINTS.MYPAGE.SOS_HISTORY,
      { params: { cursor, size } },
    );
    return response.content ?? null;
  } catch (error) {
    console.error('Failed to fetch SOS history:', error);
    throw error;
  }
};