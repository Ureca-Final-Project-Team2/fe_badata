import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosRequestResponse, SosRespondResponse } from '@/widgets/sos/lib/types';

// SOS 요청 생성
export const createSosRequest = async (): Promise<SosRequestResponse> => {
  return await axiosInstance.post('/api/v1/sos/request');
};

// SOS 요청에 응답
export const respondToSosRequest = async (sosId: number): Promise<SosRespondResponse> => {
  return await axiosInstance.post(`/api/v1/sos/${sosId}/respond`);
}; 