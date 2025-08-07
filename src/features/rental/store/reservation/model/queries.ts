import { useMutation } from '@tanstack/react-query';

import { END_POINTS } from '@/shared/api/endpoints';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';
import { makeToast } from '@/shared/lib/makeToast';

import type { ErrorCode } from '@/shared/config/errorCodes';

export const useDeleteRentalMutation = () => {
  return useMutation({
    mutationFn: async (reservationId: number) => {
      await axiosInstance.delete(END_POINTS.RENTAL.DELETE_RESERVATION(reservationId));
    },
    onError: (error) => {
      const err = error as { response?: { data?: { code?: number; message?: string } } };

      const code = err.response?.data?.code;
      const message = err.response?.data?.message;

      const errorMessage =
        (code && ErrorMessageMap[code as ErrorCode]) || message || '예약 취소에 실패했습니다.';

      makeToast(errorMessage, 'warning');
    },
  });
};
