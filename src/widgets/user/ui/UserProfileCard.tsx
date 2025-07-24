import { useState } from 'react';

import { useCreateFollowMutation } from '@/entities/user/model/mutations';
import { useFollowStatusQuery, useUserSoldPostsCountQuery } from '@/entities/user/model/queries';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import UserAvatar from '@/shared/ui/UserAvatar';

import type { ErrorCode } from '@/shared/config/errorCodes';

interface UserProfileCardProps {
  userId: number;
  name: string;
  avatarSrc?: string;
  isFollowing?: boolean;
  onFollowClick?: () => void;
  onFollowChange?: (isFollowing: boolean) => void;
  className?: string;
}

/**
 * UserProfileCard - 일반 사용자 프로필 카드
 * @param userId - 사용자 ID
 * @param name - 사용자 이름
 * @param avatarSrc - 아바타 이미지 URL
 * @param isFollowing - 팔로잉 상태 (초기값)
 * @param onFollowClick - 팔로우/팔로잉 버튼 클릭 핸들러
 * @param onFollowChange - 팔로우 상태 변경 콜백
 * @param className - 추가 커스텀 클래스
 */
const UserProfileCard = ({
  userId,
  name,
  avatarSrc,
  isFollowing = false,
  onFollowClick,
  onFollowChange,
  className = '',
}: UserProfileCardProps) => {
  const createFollowMutation = useCreateFollowMutation();

  const { data: followStatus, isLoading: isLoadingFollowStatus } = useFollowStatusQuery(userId);
  const { data: soldPostsCount, isLoading: isLoadingSoldCount } =
    useUserSoldPostsCountQuery(userId);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 서버 데이터가 있으면 우선, 없으면 prop fallback
  const currentIsFollowing = followStatus?.content?.following ?? isFollowing;

  // 거래된 총 게시물의 수 (API에서 가져온 실제 데이터만 사용)
  const displayTradeCount = soldPostsCount ?? 0;

  const handleFollowClick = async () => {
    try {
      const response = await createFollowMutation.mutateAsync(userId);

      if (response?.content?.following !== undefined) {
        onFollowChange?.(response.content.following);
      }

      onFollowClick?.();
    } catch (error: unknown) {
      console.error('팔로우/언팔로우 실패:', error);

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

  return (
    <>
      <div className={`flex items-center w-[380px] h-[58px] ${className}`}>
        <UserAvatar src={avatarSrc} size="md" className="flex-shrink-0" />
        <div className="flex flex-col justify-center ml-4 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[var(--black)] font-body-semibold leading-none">{name}</span>
            <button
              type="button"
              className={`w-[78px] h-[26px] rounded-[3px] text-white font-label-semibold flex items-center justify-center
                ${currentIsFollowing ? 'bg-[var(--gray-dark)]' : 'bg-[var(--main-5)]'}
              `}
              onClick={handleFollowClick}
              disabled={createFollowMutation.isPending || isLoadingFollowStatus}
            >
              {createFollowMutation.isPending || isLoadingFollowStatus
                ? '처리중...'
                : currentIsFollowing
                  ? '팔로잉'
                  : '팔로우'}
            </button>
          </div>
          <span className="text-[var(--black)] font-small-regular leading-none mt-2">
            거래내역 {isLoadingSoldCount ? '로딩중...' : displayTradeCount}
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
