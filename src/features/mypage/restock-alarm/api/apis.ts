import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { RestockAlarmItem } from '@/features/mypage/restock-alarm/lib/types';

export const getRestockAlarmList = async (
  cursor?: number,
  size = 10,
): Promise<{ item: RestockAlarmItem[]; nextCursor: number; hasNext: boolean }> => {
  try {
    const content: { item: RestockAlarmItem[]; nextCursor: number; hasNext: boolean } =
      await axiosInstance.get(END_POINTS.MYPAGE.RESTOCK_ALARM, { params: { cursor, size } });
    return content;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteRestockAlarm = async (restockId: number): Promise<void> => {
  try {
    await axiosInstance.delete(END_POINTS.RENTAL.RENTAL_CANCEL(restockId));
  } catch (error: unknown) {
    throw error;
  }
};
