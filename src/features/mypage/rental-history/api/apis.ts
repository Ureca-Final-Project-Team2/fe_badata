import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { RentalHistoryItem } from '@/features/mypage/rental-history/lib/types';

export const getRentalHistory = async (
  cursor?: number,
  size: number = 10,
): Promise<{ item: RentalHistoryItem[]; nextCursor: number; hasNext: boolean }> => {
  const content: { item: RentalHistoryItem[]; nextCursor: number; hasNext: boolean } =
    await axiosInstance.get(END_POINTS.MYPAGE.RENTAL_HISTORY, { params: { cursor, size } });
  return content;
};
