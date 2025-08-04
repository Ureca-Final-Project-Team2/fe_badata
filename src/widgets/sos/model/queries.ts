import { useMutation } from '@tanstack/react-query';

import { respondToSos, sendSosRequest } from '../api/apis';

import type { SosRespondRequest, SosRespondResponse } from '../lib/types';

export const useSosRequestMutation = () =>
  useMutation<{ sosId: number }, Error, void>({
    mutationFn: sendSosRequest,
  });

export const useSosRespondMutation = () => {
  return useMutation<SosRespondResponse['content'], Error, SosRespondRequest>({
    mutationFn: respondToSos,
  });
};