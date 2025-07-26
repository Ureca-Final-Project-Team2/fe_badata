import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  AllPost,
  LikeContent,
  ReportRequest,
  ReportResponse,
} from '@/entities/trade-post/lib/types';

// 게시물 목록 조회
export const getTradePosts = async (): Promise<AllPost[]> => {
  const content: { postsResponse: AllPost[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.postsResponse ?? [];
};

// 게시물 삭제
export const deleteTradePost = async (postId: number) => {
  const response = await axiosInstance.delete(END_POINTS.TRADES.DELETE(postId));
  return response.data;
};

// 게시물 수정
export const patchTradePost = async (postId: number, data: { comment: string; price: number }) => {
  const response = await axiosInstance.patch(END_POINTS.TRADES.UPDATE(postId), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// 게시물 좋아요
export const postTradePostLike = async (postId: number): Promise<LikeContent> => {
  const content: LikeContent = await axiosInstance.post(END_POINTS.TRADES.LIKE_POST(postId));
  return content;
};

export const deleteTradePostLike = async (postId: number): Promise<LikeContent> => {
  const content: LikeContent = await axiosInstance.delete(END_POINTS.TRADES.LIKE_POST(postId));
  return content;
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
