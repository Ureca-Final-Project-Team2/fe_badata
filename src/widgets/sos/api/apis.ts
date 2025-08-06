import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export const sendSosRequest = async (): Promise<{ sosId: number }> => {
  const response = await axiosInstance.post<{ sosId: number }>(END_POINTS.SOS.REQUEST);
  console.log('📦 sos content:', response.data);
  return response.data;
};

export const respondToSos = async (sosId: number) => {
  const response = await axiosInstance.post(`/api/v1/sos/respond?sosId=${sosId}`);
  return response.data;
};