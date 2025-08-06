'use client';

import { useCallback, useState } from 'react';

import { likeStore } from '@/features/rental/store/store-detail/api/apis';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';

interface UseStoreLikeHooksProps {
  storeId: number;
  initialLiked?: boolean;
}

interface UseStoreLikeHooksReturn {
  liked: boolean;
  isLoading: boolean;
  toggleLike: () => Promise<void>;
  setLiked: (liked: boolean) => void;
}

export function useStoreLikeHooks({
  storeId,
  initialLiked = false,
}: UseStoreLikeHooksProps): UseStoreLikeHooksReturn {
  const [liked, setLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { executeWithAuth } = useAuthRequiredRequest();

  const toggleLike = useCallback(async () => {
    if (isLoading) return; // 중복 클릭 방지

    const previousState = liked;
    const newState = !liked;

    // 낙관적 업데이트 (UI 먼저 변경)
    setLiked(newState);
    setIsLoading(true);

    const requestFn = () => likeStore(storeId);

    try {
      // API 요청
      await executeWithAuth(
        requestFn,
        `/api/v1/stores/${storeId}/like`,
        {
          type: 'STORE_LIKE',
          method: 'POST',
        },
        () => {
          // AuthModal이 닫힐 때 이전 상태로 롤백
          setLiked(previousState);
          setIsLoading(false);
        },
      );
    } catch (error) {
      // API 요청 실패 시 이전 상태로 롤백
      setLiked(previousState);
      console.error(`가맹점 ${storeId} 찜 API 호출 실패:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [storeId, liked, isLoading, executeWithAuth]);

  const setLikedState = useCallback((newLiked: boolean) => {
    setLiked(newLiked);
  }, []);

  return {
    liked,
    isLoading,
    toggleLike,
    setLiked: setLikedState,
  };
}
