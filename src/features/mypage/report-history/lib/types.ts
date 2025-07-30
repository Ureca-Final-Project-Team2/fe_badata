export interface ReportHistoryItem {
  id: number;
  postId: number;
  thumbnailUrl: string | null;
  title: string;
  partner: string | null;
  mobileCarrier: string;
  price: number;
  postLikes: number;
  isSold: boolean;
}

export interface ReportHistoryResponse {
  code: number;
  message: string | null;
  content: {
    item: ReportHistoryItem[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export interface ReportHistoryApiResponse {
  data: ReportHistoryResponse;
}

export interface ReportInfo {
  paymentDateTime: string;
  questionDateTime: string;
  reportStatus: 'SALE' | 'QUESTION' | 'ANSWER' | 'COMPLETE'; // ENUM 정의 참고
  reportType: string;
}

export interface ReportInfoResponse {
  code: number;
  message: string | null;
  content: ReportInfo;
}
