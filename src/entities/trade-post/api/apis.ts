import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  DataUpdateRequest,
  DeadlinePost,
  DeletePostResponse,
  FollowToggleResponse,
  GifticonUpdateRequest,
  LikeContent,
  ReportRequest,
  ReportResponse,
  SearchTrendsContent,
  SellerPostsContent,
  UpdatePostResponse,
  UserInfoResponse,
} from '@/entities/trade-post/lib/types';

// 게시물 목록 조회
export const getTradePosts = async (): Promise<DeadlinePost[]> => {
  const content: { item: DeadlinePost[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.item ?? [];
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

// 판매자 관련 API들
export const tradePostApis = {
  // 판매자 정보 조회 API
  getSellerInfo: async (userId: number): Promise<UserInfoResponse> => {
    const response: UserInfoResponse = await axiosInstance.get(`${END_POINTS.USER.INFO}/${userId}`);
    return response;
  },

  // 판매자의 거래 게시물 조회 API
  getSellerPosts: async (
    userId: number,
    isSold: boolean,
    cursor?: number,
    size: number = 30,
  ): Promise<SellerPostsContent> => {
    const params = new URLSearchParams();
    if (cursor !== undefined) params.append('cursor', cursor.toString());
    params.append('size', size.toString());

    const url = `${END_POINTS.TRADES.SELLER_POSTS(userId, isSold)}?${params}`;

    try {
      const response = await axiosInstance.get(url);
      const responseData = response.data || response;
      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // 팔로우 토글 API
  postFollowToggle: async (userId: number): Promise<FollowToggleResponse> => {
    const response: FollowToggleResponse = await axiosInstance.post(
      END_POINTS.USER.FOLLOW_TOGGLE(userId),
    );
    return response;
  },
};
