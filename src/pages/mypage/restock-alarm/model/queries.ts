import { useQuery } from '@tanstack/react-query';

import { getRestockAlarmList } from '../api/apis';

import type { RestockAlarmItem } from '../lib/types';

export const useRestockAlarmListQuery = () =>
  useQuery<{ item: RestockAlarmItem[]; nextCursor: number; hasNext: boolean }>({
    queryKey: ['restockAlarmList'],
    queryFn: () => getRestockAlarmList(),
  });
