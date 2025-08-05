import { useCallback, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { toggleStoreLike } from '@/features/rental/map/api/apis';
import { updateMarkerLikeStatus } from '@/features/rental/map/lib/markerCache';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { makeToast } from '@/shared/lib/makeToast';

export interface UseStoreLikeToggleProps {
  storeId: number;
  initialIsLiked: boolean;
  onToggle?: (storeId: number, isLiked: boolean) => void;
  disableToast?: boolean;
}

export const useStoreLikeToggle = ({
  storeId,
  initialIsLiked,
  onToggle,
  disableToast = false,
}: UseStoreLikeToggleProps) => {
  const [liked, setLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const { executeWithAuth } = useAuthRequiredRequest();

  const abortControllerRef = useRef<AbortController | null>(null);
  const previousLikedRef = useRef(initialIsLiked);

  const handleLikeToggle = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      try {
        abortControllerRef.current = new AbortController();
        setIsLoading(true);

        previousLikedRef.current = liked;
        const newLikedState = !liked;
        setLiked(newLikedState);
        updateMarkerLikeStatus(storeId, newLikedState);

        // ✅ 비로그인 상태면 좋아요 요청 정보 localStorage에 저장
        if (!isLoggedIn) {
          localStorage.setItem(
            'shouldRetryLike',
            JSON.stringify({ storeId, liked: newLikedState }),
          );
        }

        // AuthRequiredRequest를 사용하여 API 호출
        const result = await executeWithAuth(
          async () => {
            // 현재 상태를 캡처하여 리다이렉트 후에도 올바른 상태 사용
            const currentLikedState = liked;
            await toggleStoreLike(storeId, currentLikedState, abortControllerRef.current?.signal);
            return Promise.resolve();
          },
          `/api/v1/stores/${storeId}/like`,
          () => {
            // AuthModal이 닫힐 때 로딩 상태 초기화
            setIsLoading(false);
            // 원래 상태로 롤백
            setLiked(previousLikedRef.current);
            updateMarkerLikeStatus(storeId, previousLikedRef.current);
          },
        );

        if (result && !disableToast) {
          makeToast(
            newLikedState ? '좋아요가 추가되었습니다.' : '좋아요가 취소되었습니다.',
            'success',
          );
        }

        if (result) {
          onToggle?.(storeId, newLikedState);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;

        console.error('가맹점 좋아요 토글 실패:', error);
        setLiked(previousLikedRef.current);
        updateMarkerLikeStatus(storeId, previousLikedRef.current);
        makeToast('좋아요 처리 중 오류가 발생했습니다.', 'warning');
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [storeId, liked, onToggle, disableToast, executeWithAuth, isLoggedIn],
  );

  if (previousLikedRef.current !== initialIsLiked) {
    previousLikedRef.current = initialIsLiked;
  }

  return {
    liked,
    isLoading,
    shouldShowLikeActive: isLoggedIn && liked,
    handleLikeToggle,
    setLiked,
  };
};
