import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  UpdateNotificationSettingRequest,
  UpdateNotificationSettingResponse,
} from '@/features/mypage/alarm-setting/lib/types';
import type { ApiResponse } from '@/shared/lib/axios/responseTypes';

// 알림 설정 조회 API
export async function getNotificationSetting(): Promise<{
  isNotificationEnabled: boolean;
}> {
  const response = await axiosInstance.post(END_POINTS.MYPAGE.NOTIFICATION, null, {
    params: { isEnabled: true },
  });
  return response as unknown as { isNotificationEnabled: boolean };
}

// 알림 설정 변경 API
export async function updateNotificationSetting(
  params: UpdateNotificationSettingRequest,
): Promise<UpdateNotificationSettingResponse> {
  // ApiResponse<UpdateNotificationSettingResponse> 로 제네릭 지정 후 content를 바로 반환
  const { data: content } = await axiosInstance.post<
    ApiResponse<UpdateNotificationSettingResponse>
  >(END_POINTS.MYPAGE.NOTIFICATION, null, { params });

  return content as unknown as UpdateNotificationSettingResponse;
}
