import { useMutation } from '@tanstack/react-query';

import { requestSos, respondToSos } from '../api/apis';

// SOS 요청 mutation
export const useCreateSosRequest = () => {
  return useMutation({
    mutationFn: requestSos,
    onSuccess: (data) => {
      console.log('✅ SOS 요청 성공:', data);
    },
    onError: (error) => {
      console.error('❌ SOS 요청 실패:', error);
    },
  });
};

// SOS 응답 mutation
export const useRespondToSosMutation = () => {
  return useMutation({
    mutationFn: respondToSos,
    onSuccess: (data) => {
      console.log('✅ SOS 응답 성공:', data);
    },
    onError: (error) => {
      console.error('❌ SOS 응답 실패:', error);
    },
  });
};
