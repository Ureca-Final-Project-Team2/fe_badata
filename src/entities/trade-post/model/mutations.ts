import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteTradePost,
  deleteTradePostLike,
  postTradePostLike,
  reportTradePost,
  updateDataPost,
  updateGifticonPost,
} from '@/entities/trade-post/api/apis';
import { makeToast } from '@/shared/lib/makeToast';

import type {
  AllPost,
  DataUpdateRequest,
  DeletePostResponse,
  GifticonUpdateRequest,
  ReportRequest,
  UpdatePostResponse,
} from '@/entities/trade-post/lib/types';

export const usePostTradePostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postTradePostLike(postId),
    onMutate: async (postId) => {
      const previousPosts = queryClient.getQueryData<AllPost[]>(['trade-posts']);

      queryClient.setQueryData<AllPost[]>(['trade-posts'], (old) => {
        return old?.map((post) =>
          post.id === postId
            ? { ...post, isLiked: true, likesCount: (post.likesCount || 0) + 1 }
            : post,
        );
      });
      return { previousPosts };
    },
    onError: (error, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['trade-posts'], context.previousPosts);
      }

      console.error('좋아요 처리 실패', error);
    },
  });
};

export const useDeleteTradePostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deleteTradePostLike(postId),
    onMutate: async (postId) => {
      const previousPosts = queryClient.getQueryData<AllPost[]>(['trade-posts']);
      queryClient.setQueryData<AllPost[]>(['trade-posts'], (old) => {
        return old?.map((post) =>
          post.id === postId
            ? { ...post, isLiked: false, likesCount: Math.max(0, (post.likesCount || 0) - 1) }
            : post,
        );
      });

      return { previousPosts };
    },
    onError: (error, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['trade-posts'], context.previousPosts);
      }
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
  const queryClient = useQueryClient();

  return useMutation<DeletePostResponse, Error, number>({
    mutationFn: deleteTradePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'detail'] });
    },
  });
};

export const useUpdateDataPostMutation = () => {
  const queryClient = useQueryClient();

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
  const queryClient = useQueryClient();

  return useMutation<UpdatePostResponse, Error, { postId: number; data: GifticonUpdateRequest }>({
    mutationFn: ({ postId, data }) => updateGifticonPost(postId, data),
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
