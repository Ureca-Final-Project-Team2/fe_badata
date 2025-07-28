'use client';

import { useState } from 'react';

import { SosModal, SosResponseModal, useSosNotificationStore } from '@/widgets/sos';

export function SosExample() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [sosId, setSosId] = useState<number>(0);
  const { setCurrentSosRequest, openResponseModal } = useSosNotificationStore();

  const handleSosRequest = () => {
    setIsRequestModalOpen(true);
  };

  const handleSosResponse = () => {
    setSosId(123); // 실제로는 서버에서 받은 sosId
    setIsResponseModalOpen(true);
  };

  // 개발 환경에서 실시간 알림 시뮬레이션
  const simulateSosNotification = () => {
    const mockNotification = {
      type: 'SOS_REQUEST' as const,
      sosId: Math.floor(Math.random() * 1000) + 1,
      requesterName: '테스트 사용자',
      requesterId: 999,
      timestamp: new Date().toISOString(),
    };
    
    console.log('실시간 SOS 알림 시뮬레이션:', mockNotification);
    setCurrentSosRequest(mockNotification);
    openResponseModal();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-body-semibold text-black">SOS 기능 예시</h2>
      
      <div className="space-y-2">
        <button
          onClick={handleSosRequest}
          className="w-full py-2 px-4 bg-[var(--main-4)] text-white rounded-lg hover:bg-[var(--main-5)] transition-colors font-body-medium"
        >
          SOS 요청하기 (데이터가 부족한 경우)
        </button>
        
        <button
          onClick={handleSosResponse}
          className="w-full py-2 px-4 bg-[var(--main-3)] text-[var(--main-5)] rounded-lg hover:bg-[var(--main-2)] transition-colors font-body-medium"
        >
          SOS 응답하기 (다른 사용자의 요청을 받은 경우)
        </button>

        {/* 개발 환경에서만 표시 */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={simulateSosNotification}
            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-body-medium"
          >
            🧪 실시간 SOS 알림 시뮬레이션 (개발용)
          </button>
        )}
      </div>

      {/* SOS 요청 모달 */}
      <SosModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onConfirm={() => {
          console.log('SOS 요청이 확인되었습니다.');
          setIsRequestModalOpen(false);
        }}
      />

      {/* SOS 응답 모달 */}
      <SosResponseModal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        sosId={sosId}
        requesterName="김철수"
      />
    </div>
  );
} 