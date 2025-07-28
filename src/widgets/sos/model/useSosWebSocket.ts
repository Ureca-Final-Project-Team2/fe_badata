'use client';

import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

import type { SosNotification, SosWebSocketMessage } from '@/widgets/sos/lib/types';

interface UseSosWebSocketProps {
  onSosRequest?: (notification: SosNotification) => void;
  onSosResponse?: (notification: SosNotification) => void;
}

export function useSosWebSocket({ onSosRequest, onSosResponse }: UseSosWebSocketProps = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastNotification, setLastNotification] = useState<SosNotification | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const user = useAuthStore((s) => s.user);

  const connect = () => {
    if (!user?.userId) return;

    // 개발 환경에서는 WebSocket 서버가 없으므로 연결하지 않음
    if (process.env.NODE_ENV === 'development') {
      console.log('개발 환경: WebSocket 서버가 없어 연결을 건너뜁니다.');
      setIsConnected(true); // 개발용으로 연결된 것처럼 표시
      return;
    }

    // 프로덕션에서만 실제 WebSocket 연결
    const wsUrl = 'wss://your-production-server.com/sos';

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('SOS WebSocket 연결됨');
        setIsConnected(true);
        
        // 연결 시 사용자 정보 전송
        const connectMessage: SosWebSocketMessage = {
          type: 'CONNECT',
          userId: user.userId,
        };
        ws.send(JSON.stringify(connectMessage));
      };

      ws.onmessage = (event) => {
        try {
          const message: SosWebSocketMessage = JSON.parse(event.data);
          
          if (message.type === 'SOS_REQUEST' && message.data) {
            // 자신이 보낸 SOS 요청은 무시
            if (message.data.requesterId === user.userId) return;
            
            console.log('다른 사용자의 SOS 요청을 받았습니다:', message.data);
            setLastNotification(message.data);
            onSosRequest?.(message.data);
          } else if (message.type === 'SOS_RESPONSE' && message.data) {
            console.log('SOS 응답을 받았습니다:', message.data);
            setLastNotification(message.data);
            onSosResponse?.(message.data);
          }
        } catch (error) {
          console.error('WebSocket 메시지 파싱 오류:', error);
        }
      };

      ws.onclose = () => {
        console.log('SOS WebSocket 연결 종료');
        setIsConnected(false);
        // 재연결 시도
        setTimeout(() => {
          if (wsRef.current?.readyState === WebSocket.CLOSED) {
            connect();
          }
        }, 3000);
      };

      ws.onerror = (error) => {
        console.error('SOS WebSocket 오류:', error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error('WebSocket 연결 실패:', error);
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
  };

  const sendSosRequest = (sosId: number) => {
    // 개발 환경에서는 시뮬레이션
    if (process.env.NODE_ENV === 'development') {
      console.log('개발 환경: SOS 요청 시뮬레이션', { sosId, requesterId: user?.userId, requesterName: user?.name });
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: SosWebSocketMessage = {
        type: 'SOS_REQUEST',
        data: {
          type: 'SOS_REQUEST',
          sosId,
          requesterId: user?.userId,
          requesterName: user?.name,
          timestamp: new Date().toISOString(),
        },
      };
      wsRef.current.send(JSON.stringify(message));
    }
  };

  const sendSosResponse = (sosId: number, isSuccess: boolean) => {
    // 개발 환경에서는 시뮬레이션
    if (process.env.NODE_ENV === 'development') {
      console.log('개발 환경: SOS 응답 시뮬레이션', { sosId, isSuccess, requesterId: user?.userId, requesterName: user?.name });
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: SosWebSocketMessage = {
        type: 'SOS_RESPONSE',
        data: {
          type: 'SOS_RESPONSE',
          sosId,
          requesterId: user?.userId,
          requesterName: user?.name,
          message: isSuccess ? '데이터를 나눠주었습니다.' : '요청을 거절했습니다.',
          timestamp: new Date().toISOString(),
        },
      };
      wsRef.current.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    if (user?.userId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [user?.userId]);

  return {
    isConnected,
    lastNotification,
    sendSosRequest,
    sendSosResponse,
    connect,
    disconnect,
  };
} 