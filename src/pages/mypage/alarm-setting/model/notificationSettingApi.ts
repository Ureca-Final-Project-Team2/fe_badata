import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

// 알림 설정 조회 응답 타입
export interface NotificationSettingResponse {
  code: number;
  message: string | null;
  content: {
    isNotificationEnabled: boolean;
  };
}

// 알림 설정 조회 API
export const getNotificationSetting = async (): Promise<NotificationSettingResponse> => {
  const response = await axiosInstance.get(END_POINTS.MYPAGE.NOTIFICATION);
  return response.data;
};

// 알림 설정 변경 요청 타입
export interface UpdateNotificationSettingRequest {
  isEnabled: boolean;
}

// 알림 설정 변경 응답 타입
export interface UpdateNotificationSettingResponse {
  code: number;
  message: string | null;
  content: {
    isNotificationEnabled: boolean;
  };
}

// 알림 설정 변경 API
export const updateNotificationSetting = async (
  data: UpdateNotificationSettingRequest,
): Promise<UpdateNotificationSettingResponse> => {
  const response = await axiosInstance.post(
    END_POINTS.MYPAGE.NOTIFICATION,
    null,
    { params: data },
  );
  return response.data;
}; 