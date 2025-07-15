import { axiosInstance } from '@lib/axios/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { UserCoin } from '@features/mypage/model/userCoin';

export const getUserCoin = async (): Promise<UserCoin> => {
  const content: UserCoin = await axiosInstance.get(END_POINTS.MYPAGE.COIN);
  return content;
};
