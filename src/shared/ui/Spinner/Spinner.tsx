import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-30 h-30',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <Image
        src={ICONS.ETC.SPINNER}
        alt="Loading..."
        width={24}
        height={24}
        className="w-full h-full"
      />
    </div>
  );
}
