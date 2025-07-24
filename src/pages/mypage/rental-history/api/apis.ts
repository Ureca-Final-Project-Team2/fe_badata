import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export const getRentalHistory = async (cursor?: number, size: number = 10) => {
  const response = await axiosInstance.get(END_POINTS.MYPAGE.RENTAL_HISTORY, {
    params: { cursor, size },
  });
  return (response.data?.content ?? (response as any).content ?? response) as any;
};
