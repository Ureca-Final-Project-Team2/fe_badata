import { useCallback, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { toggleStoreLike } from '@/features/rental/map/api/apis';
import { updateMarkerLikeStatus } from '@/features/rental/map/lib/markerCache';
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

  // 동시성 제어를 위한 AbortController
  const abortControllerRef = useRef<AbortController | null>(null);
  // 이전 상태 추적을 위한 ref
  const previousLikedRef = useRef(initialIsLiked);
  // 중복 요청 방지를 위한 ref
  const isRequestInProgressRef = useRef(false);

  const handleLikeToggle = useCallback(
    async (e?: React.MouseEvent) => {
      // 이벤트 전파 방지
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // ✅ 중복 요청 방지 체크들
      if (isRequestInProgressRef.current) {
        return;
      }

      if (isLoading) {
        return;
      }

      // 이전 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      try {
        // ✅ 요청 시작 플래그 설정
        isRequestInProgressRef.current = true;
        abortControllerRef.current = new AbortController();
        setIsLoading(true);

        // 현재 상태 저장
        previousLikedRef.current = liked;
        const newLikedState = !liked;

        // ✅ 낙관적 업데이트: 즉시 UI 상태 변경
        setLiked(newLikedState);
        updateMarkerLikeStatus(storeId, newLikedState);

        // 로그인하지 않은 경우 AuthModal 열기
        if (!isLoggedIn) {
          try {
            // AuthErrorStore를 동적으로 import
            const { useAuthErrorStore } = await import('@/shared/lib/axios/authErrorStore');
            const { openAuthModal } = useAuthErrorStore.getState();

            // AuthModal 열기
            openAuthModal(
              {
                type: 'STORE_LIKE',
                url: `/api/v1/stores/${storeId}/like`,
                method: 'POST',
                data: {
                  storeId,
                  isLiked: newLikedState,
                },
              },
              () => {
                // AuthModal이 닫힐 때 상태 롤백
                setIsLoading(false);
                setLiked(previousLikedRef.current);
                updateMarkerLikeStatus(storeId, previousLikedRef.current);
                isRequestInProgressRef.current = false;
              },
            );
            return;
          } catch (error) {
            console.error('AuthErrorStore import 실패:', error);
            // 에러 발생 시 상태 롤백
            setLiked(previousLikedRef.current);
            updateMarkerLikeStatus(storeId, previousLikedRef.current);
            return;
          }
        }

        // 로그인된 경우에만 직접 API 호출
        await toggleStoreLike(storeId, newLikedState, abortControllerRef.current?.signal);

        // 성공 시 토스트 메시지 표시
        if (!disableToast) {
          makeToast(
            newLikedState ? '좋아요가 추가되었습니다.' : '좋아요가 취소되었습니다.',
            'success',
          );
        }

        // 콜백 함수 호출
        onToggle?.(storeId, newLikedState);
      } catch (error) {
        // AbortError는 무시
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        console.error('가맹점 좋아요 토글 실패:', error);

        // 에러 발생 시 원래 상태로 롤백
        setLiked(previousLikedRef.current);
        updateMarkerLikeStatus(storeId, previousLikedRef.current);

        if (!disableToast) {
          makeToast('좋아요 처리 중 오류가 발생했습니다.', 'warning');
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
        // ✅ 요청 완료 플래그 해제
        isRequestInProgressRef.current = false;
      }
    },
    [storeId, liked, isLoggedIn, onToggle, disableToast],
  );

  // 초기 상태가 변경되면 ref도 업데이트
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
