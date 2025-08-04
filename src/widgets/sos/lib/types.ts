export interface SosRequestResponse {
  code: number;
  message: string | null;
  content: {
    sosId: number;
  };
}

export interface SosRespondRequest {
  sosId: number;
  isAccepted: boolean;
  dataAmount?: number; // 수락 시 전달할 데이터 양 (MB 단위)
}

export interface SosRespondResponse {
  code: number;
  message: string;
  content: {
    sosId: number;
    isSuccess: boolean;
    transferredData?: number; // 실제 전달된 데이터 양
  };
}

export interface SseNotification {
  sosId: number;
  type: 'REQUEST' | 'RESPOND'; 
  isSuccess?: boolean; // 응답 시에만
}
