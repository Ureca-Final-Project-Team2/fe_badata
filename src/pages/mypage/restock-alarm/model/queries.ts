import { useQuery } from '@tanstack/react-query';

import { getRestockAlarmList } from '@/pages/mypage/restock-alarm/api/apis';

import type { RestockAlarmItem } from '@/pages/mypage/restock-alarm/lib/types';

export const useRestockAlarmListQuery = () =>
  useQuery<{ item: RestockAlarmItem[]; nextCursor: number; hasNext: boolean }>({
    queryKey: ['restockAlarmList'],
    queryFn: () => getRestockAlarmList(),
  });
