import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { RestockAlarmResponse } from '../lib/types';


export const getRestockAlarmList = async (
  cursor?: number,
  size = 10,
): Promise<RestockAlarmResponse> => {
  const response = await axiosInstance.get(END_POINTS.MYPAGE.RESTOCK_ALARM, {
    params: { cursor, size },
  });

  // 콘솔로 확인한 결과, 데이터가 바로 response.data에 있음
  return response.data;
};;
