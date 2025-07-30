import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteRestockAlarm, getRestockAlarmList } from '@/features/mypage/restock-alarm/api/apis';

import type { RestockAlarmItem } from '@/features/mypage/restock-alarm/lib/types';

export const useRestockAlarmListQuery = () =>
  useQuery<{ item: RestockAlarmItem[]; nextCursor: number; hasNext: boolean }>({
    queryKey: ['restockAlarmList'],
    queryFn: () => getRestockAlarmList(),
  });

export const useDeleteRestockAlarmMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRestockAlarm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restockAlarmList'] });
    },
    onError: (error, restockId) => {
      console.error('삭제 mutation 실패:', restockId, error);
    },
  });
};
