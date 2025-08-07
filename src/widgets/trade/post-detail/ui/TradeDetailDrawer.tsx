'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { AxiosError } from 'axios';
import { Flag, Pencil, Trash2 } from 'lucide-react';
import { createPortal } from 'react-dom';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useIsPostOwner } from '@/entities/auth/model/useIsPostOwner';
import { useDeleteTradePostMutation } from '@/entities/trade-post/model/mutations';
import { PATH } from '@/shared/config/path';
import { makeToast } from '@/shared/lib/makeToast';
import { Drawer, DrawerButton } from '@/shared/ui/Drawer';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  postUserId: number;
  postId: number;
  postType: 'GIFTICON' | 'DATA';
}

export const TradeDetailDrawer = ({ isOpen, onClose, postUserId, postId, postType }: Props) => {
  const isOwner = useIsPostOwner(postUserId);
  const router = useRouter();
  const deleteMutation = useDeleteTradePostMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(postId);
      onClose();
      // 삭제 성공 시 목록 페이지로 이동
      router.push('/trade');
    } catch (error) {
      console.error('게시물 삭제 실패:', error);

      // axios 에러인 경우 status code 확인
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          makeToast('로그인이 만료되었습니다. 다시 로그인해주세요.', 'warning');
          useAuthStore.getState().logout();
          router.push('/landing');
        } else if (error.response?.status === 403) {
          makeToast('삭제 권한이 없습니다. 본인이 작성한 게시물만 삭제할 수 있습니다.', 'warning');
        } else if (error.response?.status === 404) {
          makeToast(
            '게시물을 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않는 게시물입니다.',
            'warning',
          );
        } else if (error.response?.status && error.response.status >= 500) {
          makeToast('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'warning');
        } else {
          makeToast(
            `게시물 삭제에 실패했습니다. (오류 코드: ${error.response?.status || '알 수 없음'})`,
            'warning',
          );
        }
      } else {
        makeToast(
          '네트워크 연결을 확인해주세요. 인터넷 연결 상태를 점검 후 다시 시도해주세요.',
          'warning',
        );
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

  const handleReport = () => {
    onClose();
    router.push(PATH.TRADE.REPORT.replace(':id', String(postId)));
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        {isOwner ? (
          <div>
            <DrawerButton
              icon={<Pencil />}
              onClick={() => {
                onClose();
                // 게시물 타입에 따라 다른 수정 페이지로 이동
                const editPath =
                  postType === 'GIFTICON'
                    ? `/trade/register/gifticon/edit/${postId}`
                    : `/trade/register/data/edit/${postId}`;
                router.push(editPath);
              }}
            >
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
          <DrawerButton
            icon={<Flag />}
            variant="point"
            className="rounded-b-[12px]"
            onClick={handleReport}
          >
            신고하기
          </DrawerButton>
        )}

        <DrawerButton variant="close" onClick={onClose}>
          닫기
        </DrawerButton>
      </div>

      {/* 삭제 확인 모달 컴포넌트 */}
      {showDeleteConfirm &&
        createPortal(
          <div
            className="fixed inset-0 bg-[var(--black)]/50 flex items-center justify-center z-50"
            onClick={handleCancelDelete}
          >
            <div
              className="bg-[var(--white)] rounded-lg p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
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
          </div>,
          document.body,
        )}
    </Drawer>
  );
};
