import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { ReportHistoryResponse } from '../lib/types';

export const getReportHistoryList = async (
  reportStatus: string,
  cursor?: number,
  size = 10,
): Promise<ReportHistoryResponse['content'] | null> => {
  const content = await axiosInstance.get(END_POINTS.MYPAGE.REPORT_LIST, {
    params: { reportStatus, cursor, size },
  });

  console.log('[getReportHistoryList] content:', content);

  return content ?? null;
};

