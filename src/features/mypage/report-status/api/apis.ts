import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { ReportStatusResponse } from '../lib/types';



export const getReportStatus = async (): Promise<ReportStatusResponse> => {
  const response = await axiosInstance.get<ReportStatusResponse>(
    END_POINTS.MYPAGE.REPORT_TOTAL_COUNT,
  );

  return response.data;
};
