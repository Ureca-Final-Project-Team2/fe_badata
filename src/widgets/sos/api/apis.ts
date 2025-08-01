import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosRequestResponse, SosRespondResponse } from '../lib/types';

export const sendSosRequest = async (): Promise<SosRequestResponse['content']> => {
  const response = await axiosInstance.post<SosRequestResponse>(END_POINTS.SOS.REQUEST);
  return response.data.content;
};

export const respondToSos = async (sosId: number): Promise<SosRespondResponse['content']> => {
  const response = await axiosInstance.post<SosRespondResponse>(
    `${END_POINTS.SOS.RESPOND}?sosId=${sosId}`,
  );
  return response.data.content;
};
