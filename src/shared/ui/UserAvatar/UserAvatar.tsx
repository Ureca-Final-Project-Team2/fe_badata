import { useEffect, useState } from 'react';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'lg' | 'md'; // lg: 70x70, md: 58x58
  className?: string;
  isLoading?: boolean;
}

/**
 * UserAvatar - 사용자 프로필 이미지 컴포넌트
 * @param src - 이미지 URL
 * @param alt - 대체 텍스트
 * @param size - 'lg'(70x70) | 'md'(58x58)
 * @param className - 추가 커스텀 클래스
 * @param isLoading - 로딩 상태 여부
 */
const sizeMap = {
  lg: 'w-[70px] h-[70px]',
  md: 'w-[58px] h-[58px]',
};

const DEFAULT_AVATAR = ICONS.ETC.SHELL;

const UserAvatar = ({
  src,
  alt = '유저 아바타',
  size = 'md',
  className = '',
  isLoading = false,
}: UserAvatarProps) => {
  const [imgSrc, setImgSrc] = useState<typeof DEFAULT_AVATAR | string>(DEFAULT_AVATAR);

  // src가 변경될 때마다 imgSrc 업데이트
  useEffect(() => {
    if (src) {
      setImgSrc(src);
    } else {
      setImgSrc(DEFAULT_AVATAR);
    }
  }, [src]);

  // 로딩 중일 때는 스켈레톤 효과 적용
  if (isLoading) {
    return (
      <div
        className={`rounded-full border border-[var(--gray)] bg-[var(--gray-light)] ${sizeMap[size]} ${className} animate-pulse`}
      />
    );
  }

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
