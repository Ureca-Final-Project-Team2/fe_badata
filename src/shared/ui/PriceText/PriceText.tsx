interface PriceTextProps {
  value: number | string;
  unit?: string;
  size?: 'sm' | 'md'; // sm: 12px, md: 16px
  className?: string;
}

/**
 * PriceText - 가격 표시 텍스트 통일 컴포넌트
 * @param value - 가격 값
 * @param unit - 단위(기본값: 원)
 * @param size - 'sm'(12px) | 'md'(16px)
 * @param className - 추가 커스텀 클래스
 */
const sizeMap = {
  sm: 'text-[12px]',
  md: 'text-[16px]',
};

const PriceText = ({ value, unit = '원', size = 'sm', className = '' }: PriceTextProps) => {
  return (
    <span
      className={`text-[var(--main-5)] font-sans font-bold leading-none ${sizeMap[size]} ${className}`}
    >
      {value}
      <span className="ml-0.5 font-normal">{unit}</span>
    </span>
  );
};

export default PriceText;
