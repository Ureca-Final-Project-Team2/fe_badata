import { END_POINTS } from '@constants/api';
import {
  SosHistoryItem,
  UserCoin,
  UserDataUsage
} from '@features/mypage/lib/types';
import { axiosInstance } from '@lib/axios/axiosInstance';

// 나의 코인 정보 조회
export const getUserCoin = async (): Promise<UserCoin> => {
  const data: UserCoin = await axiosInstance.get(END_POINTS.MYPAGE.COIN);
  return data;
};

// 나의 데이터 사용량 조회
export const getUserDataUsage = async (): Promise<UserDataUsage> => {
  const data: UserDataUsage  = await axiosInstance.get(END_POINTS.MYPAGE.DATA_USAGE);
  return data;
};

// SOS 요청 내역 조회
export const getSosHistory = async (): Promise<SosHistoryItem[]> => {
  const { data } = await axiosInstance.get<{ sosHistory: SosHistoryItem[] }>(
    END_POINTS.MYPAGE.SOS_HISTORY
  );
  return data.sosHistory ?? [];
};
