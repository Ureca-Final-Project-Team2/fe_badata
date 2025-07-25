import { useEffect, useState } from 'react';

import { useFollowingsQuery } from '@/entities/user/model/queries';

export const useFollowState = (userId: number) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  // 서버에서 실제 팔로우 상태 조회
  const { data: followingsData, isLoading, error } = useFollowingsQuery();

  // 서버 데이터로 로컬 상태 초기화
  useEffect(() => {
    if (followingsData?.content?.item) {
      const isUserInFollowings = followingsData.content.item.some((user) => user.userId === userId);
      setIsFollowing(isUserInFollowings);
    }
  }, [followingsData, userId]);

  // 팔로우 상태 변경 핸들러
  const handleFollowChange = (newFollowingState: boolean) => {
    setIsFollowing(newFollowingState);
  };

  return {
    isFollowing,
    setIsFollowing: handleFollowChange,
    isLoading,
    error,
  };
};
