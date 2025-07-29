import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { ReportHistoryItem } from '@/pages/mypage/report-history/lib/types';


export const getReportHistoryList = async (
  reportStatus: string,
  cursor?: number,
  size = 10,
): Promise<{
  item: ReportHistoryItem[];
  nextCursor: number;
  hasNext: boolean;
} | null> => {
  // like-store 방식으로 수정: 직접 응답 반환
  const response = await axiosInstance.get(END_POINTS.MYPAGE.REPORT_LIST, {
    params: { reportStatus, cursor, size },
  });
  return response as unknown as {
    item: ReportHistoryItem[];
    nextCursor: number;
    hasNext: boolean;
  };
};

