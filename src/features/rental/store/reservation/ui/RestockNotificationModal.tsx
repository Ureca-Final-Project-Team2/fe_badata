import React, { useCallback, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';

interface RestockNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (count: number) => void;
  deviceName: string;
  totalCount: number; // 가맹점 보유 기기 수
  isSubmitting?: boolean;
  storeDeviceId: number; // 스토어 디바이스 ID
  desiredStartDate: string; // 원하는 시작 날짜
  desiredEndDate: string; // 원하는 종료 날짜
}

const RestockNotificationModal: React.FC<RestockNotificationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  deviceName,
  totalCount,
  isSubmitting = false,
  storeDeviceId,
  desiredStartDate,
  desiredEndDate,
}) => {
  const [requestCount, setRequestCount] = useState(1);
  const { isLoggedIn } = useAuthStore();
  const { openAuthModal } = useAuthErrorStore();

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
    // 로그인하지 않은 경우 인증 모달 표시
    if (!isLoggedIn) {
      openAuthModal(
        {
          type: 'RESTOCK',
          url: '/api/v1/restock',
          method: 'POST',
          data: {
            storeDeviceId,
            count: requestCount,
            desiredStartDate,
            desiredEndDate,
          },
        },
        () => {
          // 인증 모달이 닫힐 때 원래 모달도 닫기
          handleClose();
        },
      );
      return;
    }

    // 로그인된 경우 원래 로직 실행
    onConfirm(requestCount);
  }, [
    isLoggedIn,
    openAuthModal,
    requestCount,
    onConfirm,
    storeDeviceId,
    desiredStartDate,
    desiredEndDate,
  ]);

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
        role="modal"
        aria-modal="true"
        aria-labelledby="restock-notification-modal-title"
      >
        {/* 모달 컨테이너 */}
        <div
          className="bg-[var(--white)] rounded-2xl p-4 w-[85%] max-w-sm mx-4 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 제목 */}
          <div className="text-center mb-4">
            <h2 id="restock-modal-title" className="font-title-semibold text-[var(--black)] mb-1">
              재입고 알림 신청
            </h2>
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
                className={`cursor-pointer w-8 h-8 rounded-lg bg-[var(--gray-light)] flex items-center justify-center font-title-semibold ${
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
                className={`cursor-pointer w-8 h-8 rounded-lg bg-[var(--gray-light)] flex items-center justify-center font-title-semibold ${
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
              className="cursor-pointer flex-1 py-2.5 px-3 rounded-lg border border-[var(--gray)] text-[var(--gray-dark)] font-body-semibold hover:bg-[var(--gray-light)] transition-colors duration-200"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="button"
              className={`cursor-pointer flex-1 py-2.5 px-3 rounded-lg font-body-semibold transition-colors duration-200 ${
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
