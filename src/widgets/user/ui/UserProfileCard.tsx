import { useState } from 'react';

import { useCreateFollowMutation, useFollowStatusQuery } from '@/entities/user';
import UserAvatar from '@/shared/ui/UserAvatar';

interface UserProfileCardProps {
  userId: number; // 사용자 ID 추가
  name: string;
  tradeCount: number;
  avatarSrc?: string;
  isFollowing?: boolean;
  onFollowClick?: () => void;
  onFollowChange?: (isFollowing: boolean) => void; // 팔로우 상태 변경 콜백
  className?: string;
}

/**
 * UserProfileCard - 일반 사용자 프로필 카드
 * @param userId - 사용자 ID
 * @param name - 사용자 이름
 * @param tradeCount - 거래내역 수
 * @param avatarSrc - 아바타 이미지 URL
 * @param isFollowing - 팔로잉 상태 (초기값)
 * @param onFollowClick - 팔로우/팔로잉 버튼 클릭 핸들러
 * @param onFollowChange - 팔로우 상태 변경 콜백
 * @param className - 추가 커스텀 클래스
 */
const UserProfileCard = ({
  userId,
  name,
  tradeCount,
  avatarSrc,
  isFollowing = false,
  onFollowClick,
  onFollowChange,
  className = '',
}: UserProfileCardProps) => {
  const createFollowMutation = useCreateFollowMutation();

  const { data: followStatus, isLoading: isLoadingFollowStatus } = useFollowStatusQuery(userId);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 서버 상태를 우선하고, 없으면 props 값 사용
  const isFollowingFromServer = followStatus?.content?.following;
  const currentIsFollowing =
    isFollowingFromServer !== undefined ? isFollowingFromServer : isFollowing;

  const handleFollowClick = async () => {
    try {
      console.log('팔로우 클릭 전 상태:', { currentIsFollowing, userId });
      console.log('API 호출 시작...');

      const response = await createFollowMutation.mutateAsync(userId);

      console.log('API 응답:', response);
      console.log('응답 타입:', typeof response);
      console.log('응답 구조:', JSON.stringify(response, null, 2));

      if (response?.content?.following !== undefined) {
        console.log('팔로우 상태 업데이트:', response.content.following);
        onFollowChange?.(response.content.following);
      } else {
        console.log('응답에 following 정보가 없음:', response);
      }

      // 부모 컴포넌트의 콜백이 있다면 호출
      onFollowClick?.();
    } catch (error: unknown) {
      console.error('팔로우/언팔로우 실패:', error);

      // API 에러 코드에 따른 처리
      const errorObj = error as { code?: number };
      if (errorObj?.code === 2014) {
        setErrorMessage('자기 자신을 팔로우할 수 없습니다.');
      } else if (errorObj?.code === 2011) {
        setErrorMessage('유저 정보를 찾을 수 없습니다.');
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
            거래내역 {tradeCount}
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
