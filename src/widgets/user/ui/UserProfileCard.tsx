import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useSellerSoldPostsCountQuery } from '@/entities/trade-post/model/queries';
import { useCreateFollowMutation } from '@/entities/user/model/mutations';
import { useAllFollowingsQuery } from '@/entities/user/model/queries';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { makeToast } from '@/shared/lib/makeToast';
import UserAvatar from '@/shared/ui/UserAvatar';

import type { ErrorCode } from '@/shared/config/errorCodes';

interface UserProfileCardProps {
  userId: number;
  name: string;
  avatarSrc?: string;
  isFollowing?: boolean;
  onFollowClick?: () => void;
  className?: string;
}

/**
 * UserProfileCard - 일반 사용자 프로필 카드
 * @param userId - 사용자 ID
 * @param name - 사용자 이름
 * @param avatarSrc - 아바타 이미지 URL
 * @param isFollowing - 팔로잉 상태 (초기값)
 * @param onFollowClick - 팔로우/팔로잉 버튼 클릭 핸들러
 * @param className - 추가 커스텀 클래스
 */
const UserProfileCard = ({
  userId,
  name,
  avatarSrc,
  onFollowClick,
  className = '',
}: UserProfileCardProps) => {
  const router = useRouter();
  const createFollowMutation = useCreateFollowMutation();
  const currentUser = useAuthStore((s) => s.user);
  const { executeWithAuth } = useAuthRequiredRequest();

  const { data: followings, isLoading: isLoadingFollowings } = useAllFollowingsQuery();
  const { data: soldPostsCount, isLoading: isLoadingSoldCount } =
    useSellerSoldPostsCountQuery(userId);

  const [localFollowingState, setLocalFollowingState] = useState<boolean | null>(null);

  // 현재 로그인한 사용자와 프로필 주인이 같은지 확인
  const isOwnProfile = currentUser?.userId === userId;

  // 팔로잉 상태 계산: 로컬 상태 > 쿼리 데이터 > props 순서로 우선순위
  const isFollowingFromQuery =
    followings?.content?.item?.some((user) => user.userId === userId) ?? false;
  const currentIsFollowing =
    localFollowingState !== null ? localFollowingState : isFollowingFromQuery;

  // 쿼리 데이터가 변경될 때 로컬 상태 리셋
  useEffect(() => {
    setLocalFollowingState(null);
  }, [isFollowingFromQuery]);

  const displayTradeCount = soldPostsCount ?? 0;
  const displayTradeText = displayTradeCount >= 100 ? '100+' : displayTradeCount;

  const handleFollowClick = async () => {
    const previousState = currentIsFollowing;

    const executeFollow = async () => {
      try {
        await createFollowMutation.mutateAsync(userId);
        setLocalFollowingState(!previousState);
        onFollowClick?.();
      } catch (error: unknown) {
        // 에러 발생 시 원래 상태로 복원
        setLocalFollowingState(previousState);
        const errorObj = error as { code?: number };
        const errorCode = errorObj?.code as ErrorCode;

        if (errorCode && errorCode in ErrorMessageMap) {
          makeToast(ErrorMessageMap[errorCode], 'warning');
        } else {
          makeToast('팔로우/언팔로우에 실패했습니다.', 'warning');
        }
      }
    };

    executeWithAuth(executeFollow, `/api/v1/users/${userId}/follows`);
  };

  const handleProfileClick = () => {
    const searchParams = new URLSearchParams();
    if (name) searchParams.append('name', encodeURIComponent(name));
    if (avatarSrc) searchParams.append('avatar', encodeURIComponent(avatarSrc));

    const queryString = searchParams.toString();
    const url = queryString ? `/trade/seller/${userId}?${queryString}` : `/trade/seller/${userId}`;
    router.push(url);
  };

  return (
    <>
      <div
        className={`flex items-center w-[380px] h-[58px] ${className} cursor-pointer`}
        onClick={handleProfileClick}
      >
        <UserAvatar src={avatarSrc} size="md" className="flex-shrink-0" />
        <div className="flex flex-col justify-center ml-4 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[var(--black)] font-body-semibold leading-none">{name}</span>
            {!isOwnProfile && (
              <button
                type="button"
                className={`w-[78px] h-[26px] rounded-[3px] text-white font-label-semibold flex items-center justify-center
                  ${currentIsFollowing ? 'bg-[var(--gray-dark)]' : 'bg-[var(--main-5)]'}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollowClick();
                }}
                disabled={createFollowMutation.isPending || isLoadingFollowings}
              >
                {createFollowMutation.isPending || isLoadingFollowings
                  ? '처리중...'
                  : currentIsFollowing
                    ? '팔로잉'
                    : '팔로우'}
              </button>
            )}
          </div>
          <span className="text-[var(--black)] font-small-regular leading-none mt-2">
            거래완료 {isLoadingSoldCount ? '로딩중...' : displayTradeText}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserProfileCard;
