import UserAvatar from '@/shared/ui/UserAvatar';

interface MyProfileCardProps {
  name: string;
  days: number;
  avatarSrc?: string;
  className?: string;
}

/**
 * MyProfileCard - 마이페이지용 프로필 카드
 * @param name - 사용자 이름
 * @param days - BADATA와 함께한 일수
 * @param avatarSrc - 아바타 이미지 URL
 * @param className - 추가 커스텀 클래스
 */
const MyProfileCard = ({ name, days, avatarSrc, className = '' }: MyProfileCardProps) => {
  return (
    <div className={`flex items-center w-[380px] h-[70px] ${className}`}>
      <UserAvatar src={avatarSrc} size="lg" className="flex-shrink-0" />
      <div className="flex flex-col justify-center ml-8 flex-1">
        <span className="text-black text-[20px] font-sans font-medium leading-none text-right">
          {name}
        </span>
        <span className="text-black text-[12.8px] font-sans font-light leading-[20px] text-right mt-2">
          BADATA와 함께 한지 {days}일째
        </span>
      </div>
    </div>
  );
};

export default MyProfileCard;
