import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { ReportStatus } from '../lib/types';

export const getReportStatus = async (): Promise<ReportStatus> => {
  const content: ReportStatus = await axiosInstance.get(END_POINTS.MYPAGE.REPORT_TOTAL_COUNT);
  return content;
};
