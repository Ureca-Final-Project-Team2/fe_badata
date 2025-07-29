
import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { DataUsageResponse } from '../types';

// 데이터 사용량 조회 API
export const getDataUsage = async (): Promise<DataUsageResponse> => {
  try {
    console.log('getDataUsage - API 호출 시작');
    console.log('getDataUsage - END_POINTS.MYPAGE.DATA_USAGE:', END_POINTS.MYPAGE.DATA_USAGE);
    
    const response = await axiosInstance.get(END_POINTS.MYPAGE.DATA_USAGE);
    
    console.log('getDataUsage - API 응답 성공:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('getDataUsage - API 호출 실패:', error);
    throw error;
  }
}; 