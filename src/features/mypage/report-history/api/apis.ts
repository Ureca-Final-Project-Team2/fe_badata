import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { ReportHistoryApiResponse } from '@/features/mypage/report-history/lib/types';

export const getReportHistoryList = async (
  cursor?: number,
  size = 10,
): Promise<ReportHistoryApiResponse> => {
  return await axiosInstance.get(END_POINTS.MYPAGE.REPORT_LIST, {
    params: { cursor, size },
  });
};
