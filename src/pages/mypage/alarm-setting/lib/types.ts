// 알림 설정 조회 응답 타입
export interface NotificationSettingResponse {
  code: number;
  message: string | null;
  content: {
    isNotificationEnabled: boolean;
  };
}

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