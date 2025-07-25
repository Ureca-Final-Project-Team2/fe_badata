import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { RentalHistoryResponse } from '../lib/types';


export const getRentalHistory = async (
  cursor?: number,
  size: number = 10,
): Promise<RentalHistoryResponse['content']> => {
  const response = await axiosInstance.get<RentalHistoryResponse>(
    END_POINTS.MYPAGE.RENTAL_HISTORY,
    {
      params: { cursor, size },
    },
  );

  return response.data.content;
};
