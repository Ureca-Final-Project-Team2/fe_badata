import { useMutation } from '@tanstack/react-query';

import { respondToSos, sendSosRequest } from '../api/apis';

import type { SosRequestResponse, SosRespondResponse } from '../lib/types';

export const useSosRequestMutation = () => {
  return useMutation<SosRequestResponse['content'], Error>({
    mutationFn: sendSosRequest,
  });
};

export const useSosRespondMutation = () => {
  return useMutation<SosRespondResponse['content'], Error, number>({
    mutationFn: (sosId: number) => respondToSos(sosId),
  });
};
