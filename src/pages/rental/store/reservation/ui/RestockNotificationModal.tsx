import React, { useCallback, useState } from 'react';

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
  const [requestCount, setRequestCount] = useState(1);

  const handleIncrement = useCallback(() => {
    if (requestCount < totalCount) {
      setRequestCount((prev) => prev + 1);
    }
  }, [requestCount, totalCount]);

  const handleDecrement = useCallback(() => {
    if (requestCount > 1) {
      setRequestCount((prev) => prev - 1);
    }
  }, [requestCount]);

  const handleConfirm = useCallback(() => {
    onConfirm(requestCount);
  }, [onConfirm, requestCount]);

  const handleClose = useCallback(() => {
    setRequestCount(1); // 모달 닫을 때 초기화
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 백드롭 */}
      <div
        className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
        onClick={handleClose}
      >
        {/* 모달 컨테이너 */}
        <div
          className="bg-[var(--white)] rounded-2xl p-4 w-[85%] max-w-sm mx-4 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 제목 */}
          <div className="text-center mb-4">
            <h2 className="font-title-semibold text-[var(--black)] mb-1">재입고 알림 신청</h2>
            <p className="font-body-regular text-[var(--gray-dark)]">{deviceName}</p>
          </div>

          {/* 보유 기기 수 표시 */}
          <div className="bg-[var(--gray-light)] rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-body-regular text-[var(--black)]">가맹점 보유 기기 수</span>
              <span className="font-body-semibold text-[var(--main-5)]">총 {totalCount}대</span>
            </div>
          </div>

          {/* 신청 대수 선택 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-body-semibold text-[var(--black)]">신청 대수</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className={`w-8 h-8 rounded-lg bg-[var(--gray-light)] flex items-center justify-center font-title-semibold ${
                  requestCount <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleDecrement}
                disabled={requestCount <= 1}
              >
                –
              </button>

              <div className="min-w-[50px] text-center">
                <span className="font-title-bold text-[var(--main-5)]">{requestCount}</span>
                <span className="font-body-regular text-[var(--gray-dark)] ml-1">대</span>
              </div>

              <button
                type="button"
                className={`w-8 h-8 rounded-lg bg-[var(--gray-light)] flex items-center justify-center font-title-semibold ${
                  requestCount >= totalCount ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleIncrement}
                disabled={requestCount >= totalCount}
              >
                +
              </button>
            </div>

            {/* 최대 수량 안내 */}
            <p className="text-center text-[var(--gray-dark)] mt-2">
              최대 {totalCount}대까지 신청 가능합니다
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 py-2.5 px-3 rounded-lg border border-[var(--gray)] text-[var(--gray-dark)] font-body-semibold hover:bg-[var(--gray-light)] transition-colors duration-200"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="button"
              className={`flex-1 py-2.5 px-3 rounded-lg font-body-semibold transition-colors duration-200 ${
                isSubmitting
                  ? 'bg-[var(--gray)] text-[var(--white)] cursor-not-allowed'
                  : 'bg-[var(--main-5)] text-[var(--white)] hover:bg-[var(--main-4)]'
              }`}
              onClick={handleConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3 h-3 border-2 border-[var(--white)] border-t-transparent rounded-full animate-spin" />
                  신청 중...
                </div>
              ) : (
                '확인'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(RestockNotificationModal);
