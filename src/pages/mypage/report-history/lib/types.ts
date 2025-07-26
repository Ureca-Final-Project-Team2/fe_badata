export interface ReportHistoryItem {
  id: number;
  postId: number;
  reportStatus: string; // "QUESTION"
  reportTypeCode: string; // "FRAUD" 
  reportReason: string;
  createdAt: string;
  updatedAt: string;
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
