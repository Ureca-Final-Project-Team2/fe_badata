import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  UpdateNotificationSettingRequest,
  UpdateNotificationSettingResponse
} from '@/pages/mypage/alarm-setting/lib/types';

// 알림 설정 조회 API
export const getNotificationSetting = async (): Promise<{ isNotificationEnabled: boolean }> => {
  const response = await axiosInstance.post(END_POINTS.MYPAGE.NOTIFICATION, null, {
    params: { isEnabled: true }
  });
  return response as unknown as { isNotificationEnabled: boolean };
};

// 알림 설정 변경 API
export const updateNotificationSetting = async (
  data: UpdateNotificationSettingRequest,
): Promise<UpdateNotificationSettingResponse> => {
  const response = await axiosInstance.post(
    END_POINTS.MYPAGE.NOTIFICATION,
    null,
    { params: data },
  );
  return response as unknown as UpdateNotificationSettingResponse;
}; 