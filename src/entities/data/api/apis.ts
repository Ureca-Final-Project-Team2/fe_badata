import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { UserDataUsage } from '@/entities/data/lib/types';

// 나의 데이터 사용량 조회
export const getUserDataUsage = async (): Promise<UserDataUsage> => {
  const data: UserDataUsage = await axiosInstance.get(END_POINTS.MYPAGE.DATA_USAGE);
  return data;
};
