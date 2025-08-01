import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SosRequestResponse, SosRespondResponse } from '../lib/types';

// SOS 요청 생성
export const requestSos = async (): Promise<SosRequestResponse> => {
  const res = await axiosInstance.post(END_POINTS.SOS.REQUEST);
  return res.data;
};

// SOS 응답 처리 (쿼리 파라미터 전달)
export const respondToSos = async (sosId: number): Promise<SosRespondResponse> => {
  const res = await axiosInstance.post(`${END_POINTS.SOS.RESPOND}?sosId=${sosId}`);
  return res.data;
};
