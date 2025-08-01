import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useSellerSoldPostsCountQuery } from '@/entities/trade-post/model/queries';
import { useCreateFollowMutation } from '@/entities/user/model/mutations';
import { useAllFollowingsQuery } from '@/entities/user/model/queries';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
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

  const { data: followings, isLoading: isLoadingFollowings } = useAllFollowingsQuery();
  const { data: soldPostsCount, isLoading: isLoadingSoldCount } =
    useSellerSoldPostsCountQuery(userId);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [localFollowingState, setLocalFollowingState] = useState<boolean | null>(null);

  // 현재 로그인한 사용자와 프로필 주인이 같은지 확인
  const isOwnProfile = currentUser?.userId === userId;

  // 팔로잉 상태 계산: 로컬 상태 > 쿼리 데이터 > props 순서로 우선순위
  const isFollowingFromQuery =
    followings?.content?.item?.some((user) => user.userId === userId) ?? false;
  const currentIsFollowing =
    localFollowingState !== null ? localFollowingState : isFollowingFromQuery;

  const displayTradeCount = soldPostsCount ?? 0;

  const handleFollowClick = async () => {
    try {
      await createFollowMutation.mutateAsync(userId);

      // 현재 상태를 토글하여 즉시 UI 업데이트
      setLocalFollowingState(!currentIsFollowing);

      onFollowClick?.();
    } catch (error: unknown) {
      const errorObj = error as { code?: number };
      const errorCode = errorObj?.code as ErrorCode;

      if (errorCode && errorCode in ErrorMessageMap) {
        setErrorMessage(ErrorMessageMap[errorCode]);
      } else {
        setErrorMessage('팔로우/언팔로우에 실패했습니다.');
      }
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  const handleProfileClick = () => {
    const searchParams = new URLSearchParams();
    if (name) searchParams.append('name', name);
    if (avatarSrc) searchParams.append('avatar', avatarSrc);

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
            거래완료 {isLoadingSoldCount ? '로딩중...' : displayTradeCount}
          </span>
        </div>
      </div>

      {/* 에러 모달 */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--white)] rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="font-title-semibold mb-4">알림</h3>
            <p className="text-[var(--gray-mid)] font-body-regular mb-6">{errorMessage}</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCloseErrorModal}
                className="px-4 py-2 bg-[var(--main-5)] text-[var(--white)] rounded-md hover:bg-[var(--main-4)] font-label-medium"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileCard;
