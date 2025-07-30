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

  const handleLikeToggle = useCallback(
    async (e?: React.MouseEvent) => {
      // 이벤트 전파 방지
      if (e) {
        e.stopPropagation();
      }

      // 로그인하지 않은 사용자는 좋아요 기능 비활성화
      if (!isLoggedIn) {
        makeToast('로그인이 필요한 서비스입니다.', 'warning');
        return;
      }

      // 이전 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      try {
        abortControllerRef.current = new AbortController();
        setIsLoading(true);

        // 현재 상태 저장
        previousLikedRef.current = liked;

        // 낙관적 업데이트: 즉시 UI 상태 변경
        const newLikedState = !liked;
        setLiked(newLikedState);

        // 마커 업데이트 트리거 (낙관적 업데이트)
        updateMarkerLikeStatus(storeId, newLikedState);

        // API 호출
        await toggleStoreLike(storeId, liked, abortControllerRef.current.signal);

        // 토스트 메시지 비활성화가 아닌 경우에만 표시
        if (!disableToast) {
          makeToast(
            newLikedState ? '좋아요가 추가되었습니다.' : '좋아요가 취소되었습니다.',
            'success',
          );
        }

        // 콜백 함수 호출
        onToggle?.(storeId, newLikedState);
      } catch (error) {
        // AbortError는 무시 (사용자가 취소한 경우)
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        console.error('가맹점 좋아요 토글 실패:', error);

        // 에러 발생 시 원래 상태로 롤백
        setLiked(previousLikedRef.current);
        updateMarkerLikeStatus(storeId, previousLikedRef.current);

        makeToast('좋아요 처리 중 오류가 발생했습니다.', 'warning');
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
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
