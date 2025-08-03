import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosRespondResponse } from '../lib/types';

export const sendSosRequest = async (): Promise<{ sosId: number }> => {
  const response = await axiosInstance.post<{ sosId: number }>(END_POINTS.SOS.REQUEST);
  console.log('📦 sos content:', response.data);
  return response.data; // ✅ 이제 정확하게 sosId만 포함된 객체로 타입 일치
};

export const respondToSos = async (sosId: number): Promise<SosRespondResponse['content']> => {
  const response = await axiosInstance.post<SosRespondResponse>(
    `${END_POINTS.SOS.RESPOND}?sosId=${sosId}`,
  );
  return response.data.content;
};
