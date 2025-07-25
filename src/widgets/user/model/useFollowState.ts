import { useEffect, useState } from 'react';

import { useAllFollowingsQuery } from '@/entities/user/model/queries';

export const useFollowState = (userId: number) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  // 모든 팔로잉 목록 조회
  const { data: followingsData, isLoading, error } = useAllFollowingsQuery();

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
