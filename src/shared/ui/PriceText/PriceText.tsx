interface PriceTextProps {
  value: number | string;
  unit?: string;
  className?: string;
}

/**
 * PriceText - 가격 표시 텍스트 통일 컴포넌트
 * @param value - 가격 값
 * @param unit - 단위(기본값: 원)
 * @param className - 추가 커스텀 클래스
 */
const PriceText = ({ value, unit = '원', className = '' }: PriceTextProps) => {
  return (
    <span
      className={`text-[var(--color-main-5)] font-sans font-bold text-[16px] leading-none ${className}`}
    >
      {value}
      <span className="ml-0.5 font-normal">{unit}</span>
    </span>
  );
};

export default PriceText;
