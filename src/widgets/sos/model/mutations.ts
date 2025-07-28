import { useMutation } from '@tanstack/react-query';

import { createSosRequest, respondToSosRequest } from '@/widgets/sos/api/apis';

// SOS 요청 생성 mutation
export function useCreateSosRequest() {
  return useMutation({
    mutationFn: createSosRequest,
    onSuccess: (data) => {
      // SOS 요청 성공 시 필요한 처리
      console.log('SOS 요청이 성공적으로 생성되었습니다:', data);
    },
    onError: (error) => {
      console.error('SOS 요청 생성 중 오류가 발생했습니다:', error);
    },
  });
}

// SOS 요청에 응답하는 mutation
export function useRespondToSosRequest() {
  return useMutation({
    mutationFn: ({ sosId }: { sosId: number }) => respondToSosRequest(sosId),
    onSuccess: (data) => {
      // SOS 응답 성공 시 필요한 처리
      console.log('SOS 응답이 성공적으로 처리되었습니다:', data);
    },
    onError: (error) => {
      console.error('SOS 응답 처리 중 오류가 발생했습니다:', error);
    },
  });
} 