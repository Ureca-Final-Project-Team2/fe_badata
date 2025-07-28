import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getNotificationSetting, updateNotificationSetting } from '../api/apis';

import type {
  NotificationSettingResponse,
  UpdateNotificationSettingRequest,
  UpdateNotificationSettingResponse,
} from '../lib/types';

// 알림 설정 조회 쿼리
export const useNotificationSettingQuery = () => {
  return useQuery<NotificationSettingResponse>({
    queryKey: ['notification-setting'],
    queryFn: getNotificationSetting,
    enabled: typeof window !== 'undefined',
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
