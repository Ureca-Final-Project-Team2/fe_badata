
import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { DataUsageResponse } from '@/widgets/data-usage/types';

export const getDataUsage = async (): Promise<DataUsageResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.DATA_USAGE);
    
    // response 자체가 데이터인 경우
    if (response && typeof response === 'object' && 'nickname' in response) {
      return {
        code: 20000,
        message: null,
        content: response as unknown as DataUsageResponse['content']
      };
    }
    
    // 일반적인 axios 응답인 경우
    if (response && response.data) {
      return response.data;
    }
    
    throw new Error('Unexpected response format');
  } catch (error) {
    console.error('Failed to fetch data usage:', error);
    throw error;
  }
}; 