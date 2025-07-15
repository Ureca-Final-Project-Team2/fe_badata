import { axiosInstance } from '@lib/axios/axiosInstance';
import { END_POINTS } from '@constants/api';
import { UserDataUsage } from '../model/userDataUsage';

interface RawUserDataUsage {
  dataAmount: number;
}

export const getUserDataUsage = async (): Promise<UserDataUsage> => {
  const data: RawUserDataUsage = await axiosInstance.get(END_POINTS.MYPAGE.DATA_USAGE);

  if (!data || typeof data.dataAmount !== 'number') {
    throw new Error('잘못된 응답 형식: dataAmount 누락');
  }

  return {
    used: data.dataAmount,
  };
};
