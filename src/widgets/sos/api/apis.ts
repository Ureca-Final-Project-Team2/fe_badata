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

// 최신 SOS ID 조회 (문자열 메시지 수신 시 사용)
export const getLatestSosId = async (): Promise<number> => {
  try {
    const response = await axiosInstance.get('/api/v1/sos/latest');
    return response.data.sosId;
  } catch (error) {
    console.error('❌ 최신 SOS ID 조회 실패:', error);
    throw new Error('최신 SOS ID를 가져올 수 없습니다.');
  }
};
