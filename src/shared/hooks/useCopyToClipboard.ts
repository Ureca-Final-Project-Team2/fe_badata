import { useCallback } from 'react';

import { makeToast } from '@/shared/lib/makeToast';

export interface CopyConfig {
  successMessage?: string;
  errorMessage?: string;
  fallbackMessage?: string;
}

export const useCopyToClipboard = () => {
  const copyToClipboard = useCallback(
    async (text: string, config: CopyConfig = {}): Promise<boolean> => {
      const {
        successMessage = '복사되었습니다',
        errorMessage = '복사에 실패했습니다',
        fallbackMessage = '클립보드를 지원하지 않는 브라우저입니다',
      } = config;

      if (!navigator.clipboard) {
        makeToast(fallbackMessage, 'warning');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        makeToast(successMessage, 'success');
        return true;
      } catch (error) {
        console.error('Clipboard copy failed:', error);
        makeToast(errorMessage, 'warning');
        return false;
      }
    },
    [],
  );

  // 특정 용도별 복사 함수들
  const copyPhoneNumber = useCallback(
    (phoneNumber: string) => {
      return copyToClipboard(phoneNumber, {
        successMessage: '번호가 복사되었습니다',
        errorMessage: '번호 복사에 실패했습니다',
      });
    },
    [copyToClipboard],
  );

  const copyAddress = useCallback(
    (address: string) => {
      return copyToClipboard(address, {
        successMessage: '주소가 복사되었습니다',
        errorMessage: '주소 복사에 실패했습니다',
      });
    },
    [copyToClipboard],
  );

  return {
    copyToClipboard,
    copyPhoneNumber,
    copyAddress,
  };
};
