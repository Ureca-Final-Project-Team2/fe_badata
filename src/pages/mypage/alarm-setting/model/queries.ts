import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getNotificationSetting, updateNotificationSetting } from '../api/apis';

import type { NotificationSettingRequest } from '../lib/types';

export const useNotificationSettingQuery = () => {
  return useQuery({
    queryKey: ['notification-setting'],
    queryFn: getNotificationSetting,
  });
};

export const useUpdateNotificationSettingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NotificationSettingRequest) => updateNotificationSetting(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-setting'] });
    },
  });
}; 