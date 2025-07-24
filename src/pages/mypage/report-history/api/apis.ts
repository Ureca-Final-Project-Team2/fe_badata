import { END_POINTS } from "@/shared/api/endpoints";
import { axiosInstance } from "@/shared/lib/axios/axiosInstance";


export interface ReportListItem {
  id: number;
  postId: number;
  reportStatus: 'QUESTION' | 'ANSWER' | 'COMPLETED';
  reportTypeCode: string;
  reportReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportListResponse {
  item: ReportListItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface PostDetail {
  id: number;
  title: string;
  postImage?: string;
  price: number;
  likesCount: number;
  isSold: boolean;
  isLiked: boolean;
  partner?: string;
}

export const getMyReports = async (
  reportStatus: string = 'ANSWER',
  size: number = 10,
  cursor?: number,
): Promise<ReportListResponse> => {
  try {
    const response = await axiosInstance.get<ReportListResponse>(END_POINTS.MYPAGE.REPORT_LIST, {
      params: {
        reportStatus,
        size,
        ...(cursor && { cursor }),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    throw error;
  }
};


