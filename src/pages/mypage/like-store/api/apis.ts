import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export async function fetchLikedStores(cursor?: number, size: number = 10) {
  const response = await axiosInstance.get('/api/v1/users/likes/stores', {
    params: { cursor, size },
  });
  return response.data?.content ?? response.data ?? response;
}