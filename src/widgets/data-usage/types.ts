// 데이터 사용량 정보 타입
export interface DataUsageInfo {
  userName: string;
  planName: string;
  remainingData: number;
  totalData: number;
  unit?: string;
}

// 데이터 사용량 API 응답 타입
export interface DataUsageResponse {
  code: number;
  message: string | null;
  content: {
    userName: string;
    planName: string;
    remainingData: number;
    totalData: number;
    unit?: string;
  };
} 