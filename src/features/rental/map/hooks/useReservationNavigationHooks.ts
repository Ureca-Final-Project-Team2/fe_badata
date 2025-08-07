import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { PATH } from '@/shared/config/path';

import type { DateRange } from 'react-day-picker';

interface UseReservationNavigationProps {
  storeId?: number;
  dateRange?: DateRange;
}

export const useReservationNavigation = ({ storeId, dateRange }: UseReservationNavigationProps) => {
  const router = useRouter();

  const navigateToReservation = useCallback(() => {
    if (!storeId) return;

    let reservationPath = `${PATH.RENTAL.STORE_DETAIL.replace(':storeId', storeId.toString())}?tab=reservation`;

    if (dateRange?.from && dateRange?.to) {
      const startDate = dateRange.from.toISOString().split('T')[0];
      const endDate = dateRange.to.toISOString().split('T')[0];
      reservationPath += `&startDate=${startDate}&endDate=${endDate}`;
    }

    router.push(reservationPath);
  }, [storeId, dateRange, router]);

  return { navigateToReservation };
};
