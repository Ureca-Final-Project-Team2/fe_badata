import { useCallback, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { toggleStoreLike } from '@/features/rental/map/api/apis';
import { makeToast } from '@/shared/lib/makeToast';

interface UseStoreLikeToggleProps {
  storeId: number;
  initialIsLiked?: boolean;
  onToggle?: (storeId: number, isLiked: boolean) => void;
}

export const useStoreLikeToggle = ({
  storeId,
  initialIsLiked = false,
  onToggle,
}: UseStoreLikeToggleProps) => {
  const { isLoggedIn } = useAuthStore();
  const [liked, setLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

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

      if (isLoading) return;

      try {
        setIsLoading(true);

        await toggleStoreLike(storeId, liked);

        const newLikedState = !liked;
        setLiked(newLikedState);

        // 콜백 함수 호출
        onToggle?.(storeId, newLikedState);
      } catch (error) {
        console.error('가맹점 좋아요 토글 실패:', error);
        makeToast('좋아요 처리 중 오류가 발생했습니다.', 'warning');
      } finally {
        setIsLoading(false);
      }
    },
    [storeId, liked, isLoading, isLoggedIn, onToggle],
  );

  // 로그인하지 않은 사용자는 항상 like_nonactive 표시
  const shouldShowLikeActive = isLoggedIn && liked;

  return {
    liked,
    isLoading,
    shouldShowLikeActive,
    handleLikeToggle,
    setLiked, // 외부에서 상태 업데이트가 필요한 경우
  };
};
