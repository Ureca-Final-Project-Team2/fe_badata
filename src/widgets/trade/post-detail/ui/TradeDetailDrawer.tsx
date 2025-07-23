'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Flag, Pencil, Trash2 } from 'lucide-react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useIsPostOwner } from '@/entities/auth/model/useIsPostOwner';
import { useDeleteTradePostMutation } from '@/entities/trade-post/model/queries';
import { Drawer, DrawerButton } from '@/shared/ui/Drawer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postUserId: number;
  postId: number;
}

export const TradeDetailDrawer = ({ isOpen, onClose, postUserId, postId }: Props) => {
  const isOwner = useIsPostOwner(postUserId);
  const router = useRouter();
  const deleteMutation = useDeleteTradePostMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 현재 로그인 상태 확인
  const { isLoggedIn, accessToken } = useAuthStore();

  // 디버깅을 위한 로그
  console.log('현재 로그인 상태:', { isLoggedIn, hasToken: !!accessToken, isOwner });

  const handleDelete = async () => {
    // 디버깅: 현재 상태 로그
    console.log('삭제 시도:', {
      isLoggedIn,
      hasToken: !!accessToken,
      tokenLength: accessToken?.length,
      isOwner,
      postId,
      postUserId,
    });

    try {
      await deleteMutation.mutateAsync(postId);
      onClose();
      // 삭제 성공 시 목록 페이지로 이동
      router.push('/trade');
    } catch (error) {
      console.error('게시물 삭제 실패:', error);

      // 401 에러인 경우 로그인 상태를 확인하도록 안내
      if (error instanceof Error && error.message.includes('인증예외')) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        // 로그아웃 처리
        useAuthStore.getState().logout();
        // 로그인 페이지로 이동
        router.push('/landing');
      } else {
        alert('게시물 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        {isOwner ? (
          <div>
            <DrawerButton icon={<Pencil />} onClick={() => alert('게시글 수정')}>
              게시글 수정
            </DrawerButton>
            <DrawerButton
              icon={<Trash2 />}
              variant="point"
              onClick={handleDeleteClick}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? '삭제 중...' : '삭제'}
            </DrawerButton>
          </div>
        ) : (
          <DrawerButton icon={<Flag />} variant="point" onClick={() => alert('신고')}>
            신고하기
          </DrawerButton>
        )}

        <DrawerButton variant="close" onClick={onClose}>
          닫기
        </DrawerButton>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--white)] rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="font-title-semibold mb-4">게시물 삭제</h3>
            <p className="text-[var(--gray-mid)] font-body-regular mb-6">
              정말로 이 게시물을 삭제하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 border border-[var(--gray)] rounded-md text-[var(--gray-dark)] hover:bg-[var(--gray-light)] font-label-medium"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 px-4 py-2 bg-[var(--red)] text-[var(--white)] rounded-md hover:bg-red-700 disabled:opacity-50 font-label-medium"
              >
                {deleteMutation.isPending ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
