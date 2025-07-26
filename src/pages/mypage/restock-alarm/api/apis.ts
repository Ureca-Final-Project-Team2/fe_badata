import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { RestockAlarmItem } from '../lib/types';

export const getRestockAlarmList = async (
  cursor?: number,
  size = 10,
): Promise<{ item: RestockAlarmItem[]; nextCursor: number; hasNext: boolean }> => {
  try {
    const content: { item: RestockAlarmItem[]; nextCursor: number; hasNext: boolean } = await axiosInstance.get(
      END_POINTS.MYPAGE.RESTOCK_ALARM,
      { params: { cursor, size } }
    );
    console.log('재입고 API content:', content);
    return content;
  } catch (error: unknown) {
    throw error;
  }
};