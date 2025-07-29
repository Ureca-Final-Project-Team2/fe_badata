// 데이터 사용량 정보 타입
export interface DataUsageInfo {
  nickname: string;
  planName: string;
  totalDataAmount: number;
  dataAmount: number;
}

// 데이터 사용량 API 응답 타입
export interface DataUsageResponse {
  code: number;
  message: string | null;
  content: {
    nickname: string;
    planName: string;
    totalDataAmount: number;
    dataAmount: number;
  };
} 