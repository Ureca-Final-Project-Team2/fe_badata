import UserAvatar from '@/shared/ui/UserAvatar';

interface MyProfileCardProps {
  name: string;
  days: number;
  avatarSrc: string;
  className?: string;
  isLoading?: boolean;
}

/**
 * MyProfileCard - 마이페이지용 프로필 카드
 * @param name - 사용자 이름
 * @param days - BADATA와 함께한 일수
 * @param avatarSrc - 아바타 이미지 URL
 * @param className - 추가 커스텀 클래스
 * @param isLoading - 로딩 상태 여부
 */
const MyProfileCard = ({
  name,
  days,
  avatarSrc,
  className = '',
  isLoading = false,
}: MyProfileCardProps) => {
  return (
    <div className={`flex items-center w-[380px] h-[70px] ${className}`}>
      <UserAvatar src={avatarSrc} size="lg" className="flex-shrink-0" isLoading={isLoading} />
      <div className="flex flex-col justify-center ml-8 flex-1">
        {isLoading ? (
          <div className="flex flex-col items-end">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : (
          <>
            <span className="text-[var(--black)] font-body-semibold leading-none text-right">
              {name}
            </span>
            <span className="text-[var(--black)] font-small-regular leading-[20px] text-right mt-1.5">
              BADATA와 함께 한지{' '}
              <span className="font-small-semibold text-[var(--black)]">{days}</span>
              일째
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfileCard;
