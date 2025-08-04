'use client';

import { useState } from 'react';

import { makeToast } from '@/shared/lib/makeToast';
import { Modal } from '@/shared/ui/Modal';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  isLoading?: boolean;
}

export default function ReportModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: ReportModalProps) {
  const [reportReason, setReportReason] = useState('');

  const handleSubmit = () => {
    if (!reportReason.trim()) {
      makeToast('신고 사유를 입력해주세요.', 'warning');
      return;
    }

    onSubmit(reportReason);
    setReportReason('');
  };

  const handleClose = () => {
    setReportReason('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[var(--black)] font-body-semibold text-lg">
            게시글을 신고하시겠어요?
          </h2>
          <button
            onClick={handleClose}
            className="text-[var(--gray-mid)] hover:text-[var(--black)]"
          >
            ✕
          </button>
        </div>

        {/* 신고 사유 입력 */}
        <div className="mb-6">
          <textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder={`상세한 신고 사유를 적어주세요.
합당하지 않은 사유는 불이익이 있을 수 있으니 신중하게 작성해주세요.
예시) 기프티콘 구매 후 첫 사용임에도 불구하고 기프티콘 사용이 안돼요.`}
            className="w-full h-40 p-4 border border-[var(--main-3)] rounded-[10px] resize-none focus:outline-none focus:border-[var(--main-5)] font-label-regular text-[var(--black)] placeholder:text-[var(--gray-mid)]"
          />
        </div>

        {/* 신고하기 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[var(--main-5)] text-[var(--white)] font-body-semibold py-3 rounded-[10px] hover:bg-[var(--main-4)] transition-colors disabled:bg-[var(--gray-mid)] disabled:cursor-not-allowed"
        >
          {isLoading ? '신고 접수 중...' : '신고하기'}
        </button>
      </div>
    </Modal>
  );
}
