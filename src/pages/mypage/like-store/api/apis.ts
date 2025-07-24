import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export async function fetchLikedStores(cursor?: number, size: number = 10) {
  const response = await axiosInstance.get('/api/v1/users/likes/stores', {
    params: { cursor, size },
  });
  // 다양한 응답 구조에 대응
  return response.data?.content ?? response.data ?? response;
}