import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosHistoryResponse } from '@/features/mypage/sos-history/lib/types';

export const getSosHistory = async (
  cursor?: number,
  size = 10,
): Promise<SosHistoryResponse['content']> => {
  const response = await axiosInstance.get<SosHistoryResponse>(END_POINTS.MYPAGE.SOS_HISTORY, {
    params: { cursor, size },
  });
  return response as unknown as SosHistoryResponse['content'];
};
