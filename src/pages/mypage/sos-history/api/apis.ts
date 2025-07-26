import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosHistoryResponse } from '@/pages/mypage/sos-history/lib/types';

export const getSosHistory = async (
  cursor?: number,
  size = 10,
): Promise<SosHistoryResponse['content'] | null> => {
  const content = await axiosInstance.get<SosHistoryResponse['content']>(
    END_POINTS.MYPAGE.SOS_HISTORY,
    { params: { cursor, size } },
  );
  return content ?? null;
};