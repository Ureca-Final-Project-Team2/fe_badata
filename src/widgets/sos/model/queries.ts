import { useMutation } from '@tanstack/react-query';

import { respondToSos, sendSosRequest } from '../api/apis';

import type { SosRespondResponse } from '../lib/types';

export const useSosRequestMutation = () =>
  useMutation<{ sosId: number }, Error, void>({
    mutationFn: sendSosRequest,
  });

export const useSosRespondMutation = () => {
  return useMutation<SosRespondResponse['content'], Error, number>({
    mutationFn: (sosId: number) => respondToSos(sosId),
  });
};

export const fetchLatestSosId = async (): Promise<number> => {
  const response = await fetch('/api/v1/sos/latest');
  if (!response.ok) throw new Error('최신 SOS ID 조회 실패');
  const data = await response.json();
  return data.sosId;
};