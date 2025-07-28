import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { NotificationSettingRequest, NotificationSettingResponse } from '../lib/types';

export const getNotificationSetting = async (): Promise<NotificationSettingResponse> => {
  // 먼저 다른 엔드포인트 시도
  try {
    const response: NotificationSettingResponse = await axiosInstance.get(
      END_POINTS.MYPAGE.NOTIFICATION,
    );
    return response;
  } catch {
    console.log('알림 설정 API 실패, 다른 엔드포인트 시도...');
    // 다른 엔드포인트 시도
    const response: NotificationSettingResponse = await axiosInstance.get(
      '/api/v1/users/notification/settings',
    );
    return response;
  }
};

export const updateNotificationSetting = async (
  payload: NotificationSettingRequest,
): Promise<void> => {
  await axiosInstance.post(END_POINTS.MYPAGE.NOTIFICATION, payload);
}; 