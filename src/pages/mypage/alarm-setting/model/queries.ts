import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getNotificationSetting, updateNotificationSetting } from '@/pages/mypage/alarm-setting/api/apis';

import type {
  UpdateNotificationSettingRequest,
  UpdateNotificationSettingResponse
} from '@/pages/mypage/alarm-setting/lib/types';

// 알림 설정 조회 쿼리
export const useNotificationSettingQuery = () => {
  return useQuery<{
    isNotificationEnabled: boolean;
  }>({
    queryKey: ['notification-setting'],
    queryFn: getNotificationSetting,
    enabled: typeof window !== 'undefined',
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
    refetchOnReconnect: false,
  });
};

// 알림 설정 변경 뮤테이션
export const useUpdateNotificationSettingMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<UpdateNotificationSettingResponse, Error, UpdateNotificationSettingRequest>({
    mutationFn: updateNotificationSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-setting'] });
    },
  });
};
