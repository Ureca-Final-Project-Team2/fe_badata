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
  type: 'REQUEST' | 'RESPOND'; // 백엔드가 type 넘기는 구조면
  isSuccess?: boolean; // 응답 시에만
}
