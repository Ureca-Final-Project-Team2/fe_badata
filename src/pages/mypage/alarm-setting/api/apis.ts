import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
    NotificationSettingResponse,
    UpdateNotificationSettingRequest,
    UpdateNotificationSettingResponse
} from '../lib/types';

// 알림 설정 조회 API
export const getNotificationSetting = async (): Promise<NotificationSettingResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.NOTIFICATION);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notification setting:', error);
    throw error;
  }
};

// 알림 설정 변경 API
export const updateNotificationSetting = async (
  data: UpdateNotificationSettingRequest,
): Promise<UpdateNotificationSettingResponse> => {
  try {
    const response = await axiosInstance.post(
      END_POINTS.MYPAGE.NOTIFICATION,
      null,
      { params: data },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update notification setting:', error);
    throw error;
  }
}; 