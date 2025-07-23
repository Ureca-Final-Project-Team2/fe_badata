import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { AllPost, ReportRequest, ReportResponse } from '@/entities/trade-post/lib/types';

export const getTradePosts = async (): Promise<AllPost[]> => {
  const content: { postsResponse: AllPost[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.postsResponse ?? [];
};

export const reportTradePost = async (
  postId: number,
  reportData: ReportRequest,
): Promise<ReportResponse> => {
  const content: ReportResponse = await axiosInstance.post(
    END_POINTS.TRADES.REPORT(postId),
    reportData,
  );
  return content;
};
