import { useMutation } from '@tanstack/react-query';

import { makeToast } from '@/shared/lib/makeToast';

import { reportTradePost } from '../api/apis';

import type { ReportRequest } from '../lib/types';

export const useReportTradePostMutation = () => {
  return useMutation({
    mutationFn: ({ postId, reportData }: { postId: number; reportData: ReportRequest }) =>
      reportTradePost(postId, reportData),
    onSuccess: () => {
      makeToast('게시물 신고가 접수되었습니다!', 'success');
    },
    onError: (error) => {
      console.error('게시물 신고 처리 실패:', error);
      makeToast('게시물 신고 처리에 실패했습니다.', 'warning');
    },
  });
};
