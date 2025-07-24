import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteTradePost,
  deleteTradePostLike,
  patchTradePost,
  postTradePostLike,
  reportTradePost,
} from '@/entities/trade-post/api/apis';

import type {
  AllPost,
  DeletePostResponse,
  ReportRequest,
  UpdatePostRequest,
  UpdatePostResponse,
} from '@/entities/trade-post/lib/types';
import { makeToast } from '@/shared/lib/makeToast';

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

export const useUpdateTradePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdatePostResponse, Error, { postId: number; data: UpdatePostRequest }>({
    mutationFn: ({ postId, data }) => patchTradePost(postId, data),
    onSuccess: (data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'detail', postId] });
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
