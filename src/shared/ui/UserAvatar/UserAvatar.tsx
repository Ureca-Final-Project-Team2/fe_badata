import { ICONS } from '@/shared/config/iconPath';
import Image from 'next/image';
import { useState } from 'react';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'lg' | 'md'; // lg: 70x70, md: 58x58
  className?: string;
}

/**
 * UserAvatar - 사용자 프로필 이미지 컴포넌트
 * @param src - 이미지 URL
 * @param alt - 대체 텍스트
 * @param size - 'lg'(70x70) | 'md'(58x58)
 * @param className - 추가 커스텀 클래스
 */
const sizeMap = {
  lg: 'w-[70px] h-[70px]',
  md: 'w-[58px] h-[58px]',
};

const DEFAULT_AVATAR = ICONS.ETC.SHELL;

const UserAvatar = ({ src, alt = '유저 아바타', size = 'md', className = '' }: UserAvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_AVATAR);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={size === 'lg' ? 70 : 58}
      height={size === 'lg' ? 70 : 58}
      className={`rounded-full object-cover border border-[var(--gray)] bg-white ${sizeMap[size]} ${className}`}
      style={imgSrc === DEFAULT_AVATAR ? { padding: '12px' } : {}}
      onError={() => setImgSrc(DEFAULT_AVATAR)}
    />
  );
};

export default UserAvatar;
