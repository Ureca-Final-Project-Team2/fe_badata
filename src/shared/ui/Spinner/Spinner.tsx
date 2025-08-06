import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  content?: string;
}

export function Spinner({ size = 'md', className = '', content = '' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-30 h-30',
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={sizeClasses[size]}>
        <Image
          src={ICONS.ETC.SPINNER}
          alt="Loading..."
          width={24}
          height={24}
          className="w-full h-full"
        />
      </div>
      {content && (
        <p className="text-[var(--main-5)] text-center whitespace-nowrap mt-2">{content}</p>
      )}
    </div>
  );
}
