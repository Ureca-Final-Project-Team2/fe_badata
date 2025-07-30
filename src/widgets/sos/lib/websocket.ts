// WebSocket 연결 설정
export const WEBSOCKET_CONFIG = {
  URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080/ws/sos',
  RECONNECT_INTERVAL: 3000,
  MAX_RECONNECT_ATTEMPTS: 5,
};

// WebSocket 메시지 타입
export type WebSocketMessageType = 
  | 'SOS_REQUEST' 
  | 'SOS_RESPONSE' 
  | 'SOS_ACCEPT' 
  | 'SOS_REJECT' 
  | 'CONNECT' 
  | 'DISCONNECT';

// WebSocket 메시지 인터페이스
export interface WebSocketMessage {
  type: WebSocketMessageType;
  data?: unknown;
  userId?: number;
  timestamp?: string;
}

// SOS 요청 메시지
export interface SosRequestMessage extends WebSocketMessage {
  type: 'SOS_REQUEST';
  data: {
    sosId: number;
    requesterId: number;
    requesterName: string;
    requestedAmount: number; // 100MB
    message?: string;
  };
}

// SOS 응답 메시지
export interface SosResponseMessage extends WebSocketMessage {
  type: 'SOS_RESPONSE';
  data: {
    sosId: number;
    responderId: number;
    responderName: string;
    isAccepted: boolean;
    donatedAmount?: number; // 100MB
    message?: string;
  };
}

// SOS 수락 메시지
export interface SosAcceptMessage extends WebSocketMessage {
  type: 'SOS_ACCEPT';
  data: {
    sosId: number;
    responderId: number;
    responderName: string;
    donatedAmount: number; // 100MB
  };
}

// SOS 거절 메시지
export interface SosRejectMessage extends WebSocketMessage {
  type: 'SOS_REJECT';
  data: {
    sosId: number;
    responderId: number;
    responderName: string;
    reason?: string;
  };
} 