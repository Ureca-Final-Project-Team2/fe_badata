'use client';

import { useCreateSosRequest } from '@/widgets/sos/model/mutations';
import { useSosWebSocket } from '@/widgets/sos/model/useSosWebSocket';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export function SosModal({ isOpen, onClose, onConfirm }: SosModalProps) {
  const { mutate: createSosRequest, isPending } = useCreateSosRequest();
  const { sendSosRequest } = useSosWebSocket();

  const handleConfirm = () => {
    createSosRequest(undefined, {
      onSuccess: (data) => {
        console.log('SOS 요청이 성공적으로 생성되었습니다:', data);
        
        // WebSocket을 통해 다른 사용자들에게 실시간 알림 전송
        if (data.content?.sosId) {
          sendSosRequest(data.content.sosId);
        }
        
        onConfirm?.();
        onClose();
      },
      onError: (error) => {
        console.error('SOS 요청 생성 중 오류가 발생했습니다:', error);
        // 에러 처리 (토스트 메시지 등)
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full">
        <div className="text-center">
          <div className="text-4xl mb-4">🚨</div>
          <h2 className="font-title-semibold mb-2 text-black">SOS 요청</h2>
          <p className="font-body-regular text-gray-600 mb-6">
            데이터가 부족하신가요?
            <br />다른 사용자들에게 SOS 요청을 보내시겠습니까?
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-[var(--main-2)] rounded-lg text-gray-700 hover:bg-[var(--main-1)] transition-colors font-body-medium"
              disabled={isPending}
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              disabled={isPending}
              className="flex-1 py-2 px-4 bg-[var(--main-4)] text-white rounded-lg hover:bg-[var(--main-5)] disabled:opacity-50 transition-colors font-body-medium"
            >
              {isPending ? '요청 중...' : 'SOS 요청'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 