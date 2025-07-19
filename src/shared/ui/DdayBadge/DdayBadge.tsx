interface DdayBadgeProps {
  children?: React.ReactNode;
  dday?: string | number;
  className?: string;
}

/**
 * DdayBadge - D-5 등 디데이 표시 뱃지
 * @param dday - 표시할 디데이 값 (예: 5)
 * @param children - 직접 텍스트를 넘길 수도 있음
 * @param className - 추가 커스텀 클래스
 */
const DdayBadge: React.FC<DdayBadgeProps> = ({ dday, children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center justify-center w-[50px] h-[30px] rounded-[10px] bg-[var(--main-2)] text-white font-sans font-bold text-[16px] leading-none ${className}`}
    >
      {children ? children : dday !== undefined ? `D-${dday}` : null}
    </span>
  );
};

export default DdayBadge;
