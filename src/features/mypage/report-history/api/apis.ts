import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { ReportHistoryResponse } from '@/features/mypage/report-history/lib/types';

export const getReportHistoryList = async (
  reportStatus: string,
  cursor?: number,
  size = 10,
): Promise<ReportHistoryResponse['content']> => {
  const response = await axiosInstance.get<ReportHistoryResponse>(END_POINTS.MYPAGE.REPORT_LIST, {
    params: { reportStatus, cursor, size },
  });
  return response as unknown as ReportHistoryResponse['content'];
};
