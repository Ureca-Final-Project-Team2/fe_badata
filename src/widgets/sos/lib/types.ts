export interface SosRequestResponse {
  code: number;
  message: string | null;
  content: {
    sosId: number;
  };
}

export interface SosRespondResponse {
  code: number;
  message: string;
  content: {
    sosId: number;
    isSuccess: boolean;
  };
}

export interface SseNotification {
  sosId: number;
  type: 'REQUEST' | 'RESPOND'; 
  isSuccess?: boolean; // 응답 시에만
}
