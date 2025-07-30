import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface StoreLikeButtonProps {
  isLiked: boolean;
  isLoading?: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StoreLikeButton({
  isLiked,
  isLoading = false,
  onClick,
  className = '',
  size = 'sm',
}: StoreLikeButtonProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const imageSize = {
    sm: 21,
    md: 28,
    lg: 35,
  };

  return (
    <div
      className={`rounded-full bg-white flex items-center justify-center shadow-lg ${sizeClasses[size]} ${className}`}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        className="cursor-pointer p-0 border-none rounded-full flex items-center justify-center min-w-0 min-h-0"
        style={{ width: imageSize[size], height: imageSize[size] }}
      >
        <Image
          src={
            isLiked
              ? typeof ICONS.ETC.LIKE_ACTIVE === 'string'
                ? ICONS.ETC.LIKE_ACTIVE
                : ICONS.ETC.LIKE_ACTIVE.src
              : typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
                ? ICONS.ETC.LIKE_NONACTIVE
                : ICONS.ETC.LIKE_NONACTIVE.src
          }
          alt={isLiked ? '좋아요 활성' : '좋아요 비활성'}
          width={imageSize[size]}
          height={imageSize[size]}
          className={isLoading ? 'opacity-50' : ''}
        />
      </button>
    </div>
  );
}
