import React from 'react';

interface DdayBadgeProps {
  children?: React.ReactNode;
  dday?: string | number;
  size?: 'sm' | 'md'; // sm: 30x18, md: 50x30
  className?: string;
}

/**
 * DdayBadge - D-5 등 디데이 표시 뱃지
 * @param dday - 표시할 디데이 값 (예: 5)
 * @param children - 직접 텍스트를 넘길 수도 있음
 * @param size - 'sm'(30x18, 10px) | 'md'(50x30, 16px)
 * @param className - 추가 커스텀 클래스
 */
const sizeMap = {
  sm: 'w-[30px] h-[18px] text-[10px]',
  md: 'w-[50px] h-[30px] text-[16px]',
};

const DdayBadge: React.FC<DdayBadgeProps> = ({ dday, children, size = 'md', className = '' }) => {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[10px] bg-[var(--main-2)] text-white font-sans font-bold leading-none ${sizeMap[size]} ${className}`}
    >
      {children ? children : dday !== undefined ? `D-${dday}` : null}
    </span>
  );
};

export default DdayBadge;
