import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosHistoryItem } from '@/pages/mypage/sos-history/lib/types';

export const getSosHistory = async (): Promise<SosHistoryItem[]> => {
  const { data } = await axiosInstance.get<{ sosHistory: SosHistoryItem[] }>(
    END_POINTS.MYPAGE.SOS_HISTORY,
  );
  return data.sosHistory ?? [];
};
