import React, { useState } from 'react';

interface RestockNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (count: number) => void;
  deviceName: string;
  totalCount: number; // 가맹점 보유 기기 수
  isSubmitting?: boolean;
}

const RestockNotificationModal: React.FC<RestockNotificationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  deviceName,
  totalCount,
  isSubmitting = false,
}) => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    if (count < totalCount) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleConfirm = () => {
    onConfirm(count);
  };

  const handleClose = () => {
    setCount(1); // 모달 닫을 때 초기화
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 모달 배경 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg p-6 w-80 max-w-[90vw]">
          {/* 모달 헤더 */}
          <div className="mb-4">
            <h2 className="font-title-semibold text-lg text-[var(--black)] text-center">
              재입고 알림 신청
            </h2>
          </div>

          {/* 기기 정보 */}
          <div className="mb-6">
            <div className="text-center mb-2">
              <span className="font-body-semibold text-[var(--black)]">{deviceName}</span>
            </div>
            <div className="text-center text-sm text-[var(--gray-dark)]">
              가맹점 보유 기기: <span className="font-label-semibold">{totalCount}대</span>
            </div>
          </div>

          {/* 수량 선택 */}
          <div className="mb-6">
            <div className="text-center mb-3">
              <span className="font-body-regular text-[var(--black)]">신청할 대수</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-semibold ${
                  count <= 1
                    ? 'border-[var(--gray-light)] text-[var(--gray)] cursor-not-allowed'
                    : 'border-[var(--main-5)] text-[var(--main-5)] hover:bg-[var(--main-5)] hover:text-white'
                } transition-colors`}
                onClick={handleDecrement}
                disabled={count <= 1 || isSubmitting}
                type="button"
              >
                −
              </button>
              <div className="w-16 text-center">
                <span className="font-title-semibold text-xl text-[var(--black)]">{count}</span>
              </div>
              <button
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-semibold ${
                  count >= totalCount
                    ? 'border-[var(--gray-light)] text-[var(--gray)] cursor-not-allowed'
                    : 'border-[var(--main-5)] text-[var(--main-5)] hover:bg-[var(--main-5)] hover:text-white'
                } transition-colors`}
                onClick={handleIncrement}
                disabled={count >= totalCount || isSubmitting}
                type="button"
              >
                +
              </button>
            </div>
            {count >= totalCount && (
              <div className="text-center mt-2">
                <span className="text-xs text-[var(--orange)]">
                  최대 {totalCount}대까지 신청 가능합니다
                </span>
              </div>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-lg border border-[var(--gray-light)] text-[var(--gray-dark)] font-body-semibold hover:bg-[var(--gray-light)] transition-colors"
              onClick={handleClose}
              disabled={isSubmitting}
              type="button"
            >
              취소
            </button>
            <button
              className={`flex-1 py-3 rounded-lg font-body-semibold transition-colors ${
                isSubmitting
                  ? 'bg-[var(--gray)] text-white cursor-not-allowed'
                  : 'bg-[var(--main-5)] text-white hover:bg-[var(--main-6)]'
              }`}
              onClick={handleConfirm}
              disabled={isSubmitting}
              type="button"
            >
              {isSubmitting ? '신청 중...' : '확인'}
            </button>
          </div>
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {isSubmitting && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-[var(--main-5)] border-t-transparent rounded-full animate-spin" />
            <span className="font-body-regular text-[var(--black)]">재입고 알림 신청 중...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(RestockNotificationModal);
