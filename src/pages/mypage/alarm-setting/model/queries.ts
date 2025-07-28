import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getNotificationSetting, updateNotificationSetting } from '../api/apis';

import type {
  UpdateNotificationSettingRequest,
  UpdateNotificationSettingResponse
} from '../lib/types';

// 알림 설정 조회 쿼리
export const useNotificationSettingQuery = () => {
  console.log('🔍 알림 설정 쿼리 훅 호출됨');
  
  return useQuery<{
    isNotificationEnabled: boolean;
  }>({
    queryKey: ['notification-setting'],
    queryFn: getNotificationSetting,
    enabled: typeof window !== 'undefined',
    staleTime: 1000 * 60 * 5, // like-store와 동일한 설정
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

// 알림 설정 변경 뮤테이션
export const useUpdateNotificationSettingMutation = () => {
  const queryClient = useQueryClient();
  
  console.log('🔧 알림 설정 변경 뮤테이션 훅 호출됨');
  
  return useMutation<UpdateNotificationSettingResponse, Error, UpdateNotificationSettingRequest>({
    mutationFn: updateNotificationSetting,
    onSuccess: (data: UpdateNotificationSettingResponse) => {
      console.log('✅ 알림 설정 변경 뮤테이션 성공:', data);
      queryClient.invalidateQueries({ queryKey: ['notification-setting'] });
    },
    onError: (error: Error) => {
      console.error('❌ 알림 설정 변경 뮤테이션 실패:', error);
    },
  });
};
