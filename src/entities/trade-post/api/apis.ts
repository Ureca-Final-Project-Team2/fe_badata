import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  AllPost,
  DataUpdateRequest,
  DeletePostResponse,
  GifticonUpdateRequest,
  LikeContent,
  ReportRequest,
  ReportResponse,
  SearchTrendsContent,
  UpdatePostResponse,
} from '@/entities/trade-post/lib/types';

// 게시물 목록 조회
export const getTradePosts = async (): Promise<AllPost[]> => {
  const content: { postsResponse: AllPost[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.postsResponse ?? [];
};

// 게시물 삭제
export const deleteTradePost = async (postId: number): Promise<DeletePostResponse> => {
  const response = await axiosInstance.delete(END_POINTS.TRADES.DELETE(postId));
  return response.data;
};

// 데이터 게시물 수정
export const updateDataPost = async (
  postId: number,
  data: DataUpdateRequest,
): Promise<UpdatePostResponse> => {
  const response = await axiosInstance.patch(END_POINTS.TRADES.UPDATE_DATA(postId), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// 기프티콘 게시물 수정
export const updateGifticonPost = async (
  postId: number,
  data: GifticonUpdateRequest,
): Promise<UpdatePostResponse> => {
  const response = await axiosInstance.patch(END_POINTS.TRADES.UPDATE_GIFTICON(postId), data, {
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

// 게시물 신고
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

// 거래 실시간 인기 검색어 조회
export const getSearchTrends = async (): Promise<string[]> => {
  const response: SearchTrendsContent = await axiosInstance.get(END_POINTS.TRADES.SEARCH_TRENDS);
  return response.trendingTopics ?? [];
};
