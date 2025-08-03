import { useState } from 'react';

import { ErrorCode, ErrorMessageMap } from '@/shared/config/errorCodes';
import { makeToast } from '@/shared/lib/makeToast';

interface UseReportStatusProps {
  gifticonId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useReportStatus = ({ gifticonId, onSuccess, onError }: UseReportStatusProps) => {
  const [isReported, setIsReported] = useState(() => {
    // localStorage에서 신고 상태 확인
    if (typeof window !== 'undefined') {
      const reportedItems = JSON.parse(localStorage.getItem('reportedItems') || '[]');
      return reportedItems.includes(gifticonId);
    }
    return false;
  });

  const saveReportStatus = () => {
    const reportedItems = JSON.parse(localStorage.getItem('reportedItems') || '[]');
    if (!reportedItems.includes(gifticonId)) {
      reportedItems.push(gifticonId);
      localStorage.setItem('reportedItems', JSON.stringify(reportedItems));
    }
    setIsReported(true);
  };

  const handleReportSuccess = () => {
    makeToast('신고가 접수되었습니다.', 'success');
    saveReportStatus();
    onSuccess?.();
  };

  const handleReportError = (error: Error) => {
    console.error('신고 제출 실패:', error);

    // 이미 신고한 경우
    if (error.message?.includes(ErrorMessageMap[ErrorCode.REPORT_ALREADY_SUBMITTED])) {
      makeToast(ErrorMessageMap[ErrorCode.REPORT_ALREADY_SUBMITTED], 'warning');
      saveReportStatus();
    }
    // 마감 기한이 지난 게시글인 경우
    else if (error.message?.includes(ErrorMessageMap[ErrorCode.EXPIRED_POST_ACCESS])) {
      makeToast(ErrorMessageMap[ErrorCode.EXPIRED_POST_ACCESS], 'warning');
    }
    // 유효 기간이 지난 기프티콘인 경우
    else if (error.message?.includes('유효 기간이 지난 기프티콘입니다')) {
      makeToast('유효 기간이 지난 기프티콘입니다.', 'warning');
    }
    // 기타 에러
    else {
      makeToast('신고 제출에 실패했습니다. 잠시 후 다시 시도해주세요.', 'warning');
    }

    onError?.(error);
  };

  return {
    isReported,
    handleReportSuccess,
    handleReportError,
  };
};
