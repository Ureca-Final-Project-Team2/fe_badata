import { useQuery } from '@tanstack/react-query';

import {
  getQuickReplies,
  getReservationDetails,
} from '@/pages/rental/store/register-review/api/apis';

export const registerReviewQueryKeys = {
  all: ['registerReview'] as const,
  quickReplies: () => [...registerReviewQueryKeys.all, 'quickReplies'] as const,
  reservationDetails: (reservationId: number) => [
    ...registerReviewQueryKeys.all,
    'reservationDetails',
    reservationId,
  ],
};

export const useQuickReplies = () => {
  return useQuery({
    queryKey: registerReviewQueryKeys.quickReplies(),
    queryFn: getQuickReplies,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useReservationDetails = (reservationId: number | null) => {
  return useQuery({
    queryKey: reservationId ? registerReviewQueryKeys.reservationDetails(reservationId) : [],
    queryFn: () => getReservationDetails(reservationId as number),
    enabled: reservationId !== null && reservationId > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
