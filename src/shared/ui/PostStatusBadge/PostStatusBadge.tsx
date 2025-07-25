export type PostStatusBadgeProps =
  | { text: string; children?: never; className?: string }
  | { children: React.ReactNode; text?: never; className?: string };

/**
 * PostStatusBadge - 거래 완료 등 상태 뱃지
 * @param text - 표시할 텍스트 (예: 거래 완료)
 * @param children - 직접 텍스트를 넘길 수도 있음
 * @param className - 추가 커스텀 클래스
 */
const PostStatusBadge = ({ text, children, className = '' }: PostStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center gap-[10px] px-[10px] py-[4px] rounded-full bg-[var(--gray-dark)] text-white font-sans font-medium text-[12px] leading-none ${className}`}
    >
      {children ? children : text}
    </span>
  );
};

export default PostStatusBadge;
