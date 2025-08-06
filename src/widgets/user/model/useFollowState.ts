import { useEffect, useState } from 'react';

import { tradePostApis } from '@/entities/trade-post/api/apis';
import { useAllFollowingsQuery } from '@/entities/user/model/queries';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';

export const useFollowState = (userId: number) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  const { openAuthModal } = useAuthErrorStore();

  // 모든 팔로잉 목록 조회
  const { data: followingsData, isLoading, error } = useAllFollowingsQuery();

  // 서버 데이터로 로컬 상태 초기화
  useEffect(() => {
    if (followingsData?.content?.item) {
      const isUserInFollowings = followingsData.content.item.some((user) => user.userId === userId);
      setIsFollowing(isUserInFollowings);
    }
  }, [followingsData, userId]);

  const toggleFollow = async () => {
    try {
      await tradePostApis.postFollowToggle(userId);
      setIsFollowing((prev) => !prev);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        openAuthModal({
          type: 'FOLLOW',
          url: `/api/v1/users/${userId}/follow`,
          method: 'POST',
        });
      } else {
        console.error('팔로우 요청 실패:', err);
      }
    }
  };

  return {
    isFollowing,

    isLoading,
    error,
    toggleFollow,
  };
};
