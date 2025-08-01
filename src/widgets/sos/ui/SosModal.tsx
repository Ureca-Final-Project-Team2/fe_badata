'use client';

import { useSosRequestMutation } from '../model/queries';
import { useSosStore } from '../model/sosStore';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SosModal({ isOpen, onClose }: SosModalProps) {
  const setSosId = useSosStore((s) => s.setSosId);
  const { mutate: sendSosRequest, isPending } = useSosRequestMutation();

  const handleConfirm = () => {
    if (isPending) return;

    sendSosRequest(undefined, {
      onSuccess: (content) => {
        setSosId(content.sosId); 
      },
      onError: (error) => {
        console.error('❌ SOS 요청 실패:', error);
      },
    });

    onClose();
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
            <br />
            다른 사용자들에게 SOS 요청을 보내시겠습니까?
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
              className="flex-1 py-2 px-4 bg-[var(--main-4)] text-white rounded-lg hover:bg-[var(--main-5)] transition-colors font-body-medium disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? '요청 중...' : 'SOS 요청'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
