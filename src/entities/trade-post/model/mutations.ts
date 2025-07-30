import { useMutation } from '@tanstack/react-query';

import {
  deleteTradePost,
  deleteTradePostLike,
  postTradePostLike,
  reportTradePost,
  updateDataPost,
  updateGifticonPost,
} from '@/entities/trade-post/api/apis';
import { makeToast } from '@/shared/lib/makeToast';
import { queryClient } from '@/shared/lib/queryClient';

import type {
  DataUpdateRequest,
  DeletePostResponse,
  GifticonUpdateRequest,
  ReportRequest,
  UpdatePostResponse,
} from '@/entities/trade-post/lib/types';

export const usePostTradePostLikeMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => postTradePostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
    },
    onError: (error) => {
      console.error('좋아요 처리 실패', error);
    },
  });
};

export const useDeleteTradePostLikeMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => deleteTradePostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
    },
    onError: (error) => {
      console.error('좋아요 취소 실패', error);
    },
  });
};

// 상세페이지용 좋아요 뮤테이션 (optimistic update 없음)
export const usePostTradePostLikeDetailMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => postTradePostLike(postId),
    onError: (error) => {
      console.error('좋아요 처리 실패', error);
    },
  });
};

export const useDeleteTradePostLikeDetailMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => deleteTradePostLike(postId),
    onError: (error) => {
      console.error('좋아요 취소 실패', error);
    },
  });
};

export const useDeleteTradePostMutation = () => {
  return useMutation<DeletePostResponse, Error, number>({
    mutationFn: deleteTradePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'detail'] });
    },
  });
};

export const useUpdateDataPostMutation = () => {
  return useMutation<UpdatePostResponse, Error, { postId: number; data: DataUpdateRequest }>({
    mutationFn: ({ postId, data }) => updateDataPost(postId, data),
    onSuccess: (data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'detail', postId] });
      makeToast('데이터 게시물이 수정되었습니다!', 'success');
    },
    onError: (error) => {
      console.error('데이터 게시물 수정 실패:', error);
      makeToast('데이터 게시물 수정에 실패했습니다.', 'warning');
    },
  });
};

export const useUpdateGifticonPostMutation = () => {
  return useMutation<UpdatePostResponse, Error, { postId: number; data: GifticonUpdateRequest }>({
    mutationFn: async ({ postId, data }) => {
      const response = await updateGifticonPost(postId, data);
      return response;
    },
    onSuccess: (data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'detail', postId] });
      makeToast('기프티콘 게시물이 수정되었습니다!', 'success');
    },
    onError: (error) => {
      console.error('기프티콘 게시물 수정 실패:', error);
      makeToast('기프티콘 게시물 수정에 실패했습니다.', 'warning');
    },
  });
};

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
