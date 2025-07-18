import UserAvatar from '@/shared/ui/UserAvatar';

interface UserProfileCardProps {
  name: string;
  tradeCount: number;
  avatarSrc?: string;
  isFollowing?: boolean;
  onFollowClick?: () => void;
  className?: string;
}

/**
 * UserProfileCard - 일반 사용자 프로필 카드
 * @param name - 사용자 이름
 * @param tradeCount - 거래내역 수
 * @param avatarSrc - 아바타 이미지 URL
 * @param isFollowing - 팔로잉 상태
 * @param onFollowClick - 팔로우/팔로잉 버튼 클릭 핸들러
 * @param className - 추가 커스텀 클래스
 */
const UserProfileCard = ({
  name,
  tradeCount,
  avatarSrc,
  isFollowing = false,
  onFollowClick,
  className = '',
}: UserProfileCardProps) => {
  return (
    <div className={`flex items-center w-[380px] h-[68px] ${className}`}>
      <UserAvatar src={avatarSrc} size="md" className="flex-shrink-0" />
      <div className="flex flex-col justify-center ml-4 flex-1">
        <span className="text-black text-[20px] font-sans font-semibold leading-none">{name}</span>
        <span className="text-black text-[12.8px] font-sans font-light leading-none mt-1">
          거래내역 {tradeCount}
        </span>
      </div>
      <button
        type="button"
        className={`w-[78px] h-[26px] rounded-[3px] text-white text-[16px] font-sans font-bold flex items-center justify-center ml-4
          ${isFollowing ? 'bg-[var(--color-gray-dark)]' : 'bg-[var(--color-main-5)]'}
        `}
        onClick={onFollowClick}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </button>
    </div>
  );
};

export default UserProfileCard;
