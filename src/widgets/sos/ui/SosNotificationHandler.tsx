'use client';

import { useEffect } from 'react';

import { useSosNotificationStore } from '@/widgets/sos/model/sosNotificationStore';
import { useSosWebSocket } from '@/widgets/sos/model/useSosWebSocket';
import { SosResponseModal } from '@/widgets/sos/ui/SosResponseModal';

export function SosNotificationHandler() {
  const { currentSosRequest, isResponseModalOpen, setCurrentSosRequest, openResponseModal, closeResponseModal, clearSosRequest } = useSosNotificationStore();
  
  const { isConnected } = useSosWebSocket({
    onSosRequest: (notification) => {
      console.log('실시간 SOS 요청을 받았습니다:', notification);
      setCurrentSosRequest(notification);
      openResponseModal();
    },
    onSosResponse: (notification) => {
      console.log('실시간 SOS 응답을 받았습니다:', notification);
      // 필요시 응답 처리 (토스트 메시지 등)
    },
  });

  const handleResponseModalClose = () => {
    closeResponseModal();
    clearSosRequest();
  };

  // WebSocket 연결 상태 표시 (개발용)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('SOS WebSocket 연결 상태:', isConnected ? '연결됨' : '연결 안됨');
    }
  }, [isConnected]);

  return (
    <>
      {currentSosRequest && (
        <SosResponseModal
          isOpen={isResponseModalOpen}
          onClose={handleResponseModalClose}
          sosId={currentSosRequest.sosId}
          requesterName={currentSosRequest.requesterName}
        />
      )}
    </>
  );
} 