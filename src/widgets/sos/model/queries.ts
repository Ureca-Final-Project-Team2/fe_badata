import { useMutation } from '@tanstack/react-query';

import { respondToSos, sendSosRequest } from '@/widgets/sos/api/apis';

import type { SosRespondResponse } from '@/widgets/sos/lib/types';

export const useSosRequestMutation = () =>
  useMutation<{ sosId: number }, Error, void>({
    mutationFn: sendSosRequest,
  });

export const useSosRespondMutation = () => {
  return useMutation<SosRespondResponse['content'], Error, number>({
    mutationFn: respondToSos,
  });
};
