import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { ReportHistoryResponse } from '@/pages/mypage/report-history/lib/types';

export const getReportHistoryList = async (
  reportStatus: string,
  cursor?: number,
  size = 10,
): Promise<ReportHistoryResponse | null> => {
  const response: ReportHistoryResponse = await axiosInstance.get(END_POINTS.MYPAGE.REPORT_LIST, {
    params: { reportStatus, cursor, size },
  });
  return response;
};

