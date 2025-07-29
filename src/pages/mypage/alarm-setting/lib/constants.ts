// 알림 설정 기본값
export const NOTIFICATION_SETTINGS_DEFAULT = {
  news: true,
  match: true,
  price: true,
  random: false,
};

// 알림 설정 타입
export type NotificationSettingKey = keyof typeof NOTIFICATION_SETTINGS_DEFAULT; 