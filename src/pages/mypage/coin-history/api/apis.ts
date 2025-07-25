import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { UserCoin } from '@/pages/mypage/coin-history/lib/types';

export const getUserCoin = async (): Promise<UserCoin> => {
  const data: UserCoin = await axiosInstance.get(END_POINTS.MYPAGE.COIN);
  return data;
};
