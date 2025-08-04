import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosRespondRequest, SosRespondResponse } from '../lib/types';

export const sendSosRequest = async (): Promise<{ sosId: number }> => {
  const response = await axiosInstance.post<{ sosId: number }>(END_POINTS.SOS.REQUEST);
  console.log('📦 sos content:', response.data);
  return response.data; 
};

export const respondToSos = async (request: SosRespondRequest): Promise<SosRespondResponse['content']> => {
  const response = await axiosInstance.post<SosRespondResponse>(
    END_POINTS.SOS.RESPOND,
    request
  );
  return response.data.content;
};
