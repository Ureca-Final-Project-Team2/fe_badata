import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { RestockAlarmResponse } from '../lib/types';

export const getRestockAlarmList = async (
  cursor?: number,
  size = 10,
): Promise<RestockAlarmResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.RESTOCK_ALARM, {
      params: { cursor, size },
    });
    console.log('재입고 API 응답:', response.data);
    return response.data?.content ?? response.data ?? response;
  } catch (error: unknown) {
    throw error;
  }
};