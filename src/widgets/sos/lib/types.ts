export interface SosRequestResponse {
  code: number;
  message: string | null;
  content: {
    sosId: number;
  };
}

export interface SosRespondResponse {
  code: number;
  message: string | null;
  content: {
    sosId: number;
    isSuccess: boolean;
  };
}

export interface SosRequest {
  sosId: number;
}

export interface SosRespond {
  sosId: number;
  isSuccess: boolean;
}

// 실시간 알림 관련 타입들
export interface SosNotification {
  type: 'SOS_REQUEST' | 'SOS_RESPONSE';
  sosId: number;
  requesterName?: string;
  requesterId?: number;
  message?: string;
  timestamp: string;
}

export type SosWebSocketMessage = 
  | {
      type: 'SOS_REQUEST' | 'SOS_RESPONSE';
      data: SosNotification;
    }
  | {
      type: 'CONNECT' | 'DISCONNECT';
      userId: number;
    };