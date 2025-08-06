import { useMutation } from '@tanstack/react-query';

import { postTradeData } from '@/features/trade/register/data/api/apis';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { makeToast } from '@/shared/lib/makeToast';

import type { PostTradeDataRequest } from '@/features/trade/register/data/lib/types';
import type { ErrorCode } from '@/shared/config/errorCodes';
import type { HTTPError } from '@/shared/lib/HTTPError';

export const usePostTradeDataMutation = () => {
  return useMutation({
    mutationFn: (data: PostTradeDataRequest) => postTradeData(data),
    onError: (error: HTTPError) => {
      console.error('데이터 게시물 등록 실패:', error);

      // ErrorCode에 따른 구체적인 에러 메시지 처리
      if (error.code && ErrorMessageMap[error.code as ErrorCode]) {
        makeToast(ErrorMessageMap[error.code as ErrorCode], 'warning');
      } else {
        // 기본 에러 메시지
        makeToast('게시물 등록에 실패했습니다.', 'warning');
      }
    },
  });
};
