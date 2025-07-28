'use client';

import { useRespondToSosRequest } from '@/widgets/sos/model/mutations';

interface SosResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  sosId: number;
  requesterName?: string;
}

export function SosResponseModal({ isOpen, onClose, sosId, requesterName }: SosResponseModalProps) {
  const { mutate: respondToSosRequest, isPending } = useRespondToSosRequest();

  const handleRespond = (isSuccess: boolean) => {
    respondToSosRequest(
      { sosId },
      {
        onSuccess: (data) => {
          console.log('SOS 응답이 성공적으로 처리되었습니다:', data);
          onClose();
          // 성공/실패에 따른 추가 처리 (토스트 메시지 등)
          if (isSuccess) {
            // 데이터를 나눠준 경우의 처리
            console.log('데이터를 나눠주었습니다.');
          } else {
            // 거절한 경우의 처리
            console.log('SOS 요청을 거절했습니다.');
          }
        },
        onError: (error) => {
          console.error('SOS 응답 처리 중 오류가 발생했습니다:', error);
          // 에러 처리 (토스트 메시지 등)
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full">
        <div className="text-center">
          <div className="text-4xl mb-4">🆘</div>
          <h2 className="font-title-semibold mb-2 text-black">SOS 요청</h2>
          <p className="font-body-regular text-gray-600 mb-4">
            {requesterName ? `${requesterName}님이` : '다른 사용자가'} 데이터가 부족합니다.
          </p>
          <p className="font-body-regular text-gray-600 mb-6">
            데이터를 나눠주시겠습니까?
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => handleRespond(false)}
              disabled={isPending}
              className="flex-1 py-2 px-4 border border-[var(--main-2)] rounded-lg text-gray-700 hover:bg-[var(--main-1)] transition-colors font-body-medium"
            >
              거절
            </button>
            <button
              onClick={() => handleRespond(true)}
              disabled={isPending}
              className="flex-1 py-2 px-4 bg-[var(--main-4)] text-white rounded-lg hover:bg-[var(--main-5)] disabled:opacity-50 transition-colors font-body-medium"
            >
              {isPending ? '처리 중...' : '데이터 나눠주기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 