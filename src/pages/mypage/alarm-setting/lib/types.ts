export interface NotificationSettingRequest {
  isEnabled: boolean;
}

export interface NotificationSettingResponse {
  code: number;
  message: string | null;
  content: {
    isNotificationEnabled: boolean;
  };
} 