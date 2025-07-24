import { useQuery } from '@tanstack/react-query';

import { getRestockAlarmList } from '../api/apis';

import type { RestockAlarmResponse } from '../lib/types';

export const useRestockAlarmListQuery = () =>
  useQuery<RestockAlarmResponse>({
    queryKey: ['restockAlarmList'],
    queryFn: () => getRestockAlarmList(),
  });
