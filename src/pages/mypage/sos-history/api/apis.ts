import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export const getSosHistory = async (
  cursor?: number,
  size = 10,
): Promise<{
  item: Array<{
    sosId: number;
    responderId: number | null;
    createdAt: string;
    dataAmount: string;
    isSuccess: boolean;
  }>;
  nextCursor: number;
  hasNext: boolean;
}> => {
  const response = await axiosInstance.get(
    END_POINTS.MYPAGE.SOS_HISTORY,
    { params: { cursor, size } },
  );
  return response as unknown as {
    item: Array<{
      sosId: number;
      responderId: number | null;
      createdAt: string;
      dataAmount: string;
      isSuccess: boolean;
    }>;
    nextCursor: number;
    hasNext: boolean;
  };
};