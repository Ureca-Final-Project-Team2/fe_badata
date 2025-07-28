
import type { DataUsageResponse } from '../types';

// 데이터 사용량 조회 API
export const getDataUsage = async (): Promise<DataUsageResponse> => {
  try {
    // TODO: 실제 API 엔드포인트가 준비되면 아래 주석을 해제하고 사용
    // const response = await axiosInstance.get(END_POINTS.MYPAGE.DATA_USAGE);
    // return response.data;
    
    // 임시 하드코딩된 데이터 (API 준비 전까지 사용)
    return {
      code: 20000,
      message: null,
      content: {
        userName: "홍길동",
        planName: "5G 청춘 요금제",
        remainingData: 2.5,
        totalData: 5,
        unit: "GB"
      }
    };
  } catch (error) {
    console.error('Failed to fetch data usage:', error);
    throw error;
  }
}; 