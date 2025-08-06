'use client';


import { createPortal } from 'react-dom';


interface SosInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SosInfoModal({ isOpen, onClose }: SosInfoModalProps) {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--black)]/50">
      <div
        className="bg-[var(--gray-light)] rounded-2xl p-6 mx-4 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 rounded-full flex items-center justify-center">
            <div className="text-2xl">🚨</div>
          </div>
          <h2 className="font-body-semibold text-[var(--black)]">SOS 이용안내</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="font-label-regular text-[var(--black)] leading-relaxed">
              데이터가 부족한 경우, 하단의{' '}
              <span className="font-label-semibold text-[var(--main-5)]">SOS 버튼</span>을 통해 다른
              사용자에게 100MB의 데이터를 요청할 수 있습니다.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-[var(--black)] rounded-full mt-2 flex-shrink-0" />
            <span className="font-label-regular text-[var(--black)] leading-relaxed">
              SOS 요청 및 제공은 <span className="font-label-semibold text-[var(--main-5)]">월 1회</span>만
              가능하며,
              <br />
              요청할 수 있는 데이터량은{' '}
              <span className="font-label-semibold text-[var(--main-5)]">100MB 고정</span>입니다.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-[var(--black)] rounded-full mt-2 flex-shrink-0" />
            <span className="font-label-regular text-[var(--black)] leading-relaxed">
              다른 사용자가 수락 시, 데이터 요청자는 즉시{' '}
              <span className="font-label-semibold text-[var(--main-5)]">100MB 데이터</span>를
              받습니다.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-[var(--black)] rounded-full mt-2 flex-shrink-0" />
            <span className="font-label-regular text-[var(--black)] leading-relaxed">
              데이터를 제공한 사용자는{' '}
              <span className="font-label-semibold text-[var(--main-5)]">10% 코인 보상</span>을
              받습니다.
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-[var(--black)] rounded-full mt-2 flex-shrink-0" />
            <span className="font-label-regular text-[var(--black)] leading-relaxed">
              보상받은 코인은{' '}
              <span className="font-label-semibold text-[var(--main-5)]">기프티콘/데이터 구매</span>
              에 사용 가능합니다. (자세한 내용은 마이페이지 코인 내역을 확인해주세요.)
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[var(--main-5)] text-white rounded-lg font-label-medium hover:bg-[var(--main-4)] transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}
