import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { DataUsageResponse } from '../types';

// 데이터 사용량 조회 API
export const getDataUsage = async (): Promise<DataUsageResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.DATA_USAGE);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data usage:', error);
    throw error;
  }
}; 