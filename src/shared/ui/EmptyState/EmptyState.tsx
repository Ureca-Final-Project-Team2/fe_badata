import { Package } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * EmptyState - 게시물이 없을 때 표시하는 공통 컴포넌트
 * @param title - 메인 메시지 (기본값: "게시물이 없습니다")
 * @param description - 부가 설명 메시지
 * @param icon - 커스텀 아이콘 (기본값: Search 아이콘)
 * @param className - 추가 커스텀 클래스
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title = '게시물이 없습니다',
  description,
  icon,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="text-center">
        <div className="w-12 h-12 bg-[var(--gray-light)] rounded-full flex items-center justify-center mx-auto mb-2">
          {icon || <Package className="w-6 h-6 text-[var(--gray-dark)]" />}
        </div>
        <p className="text-[var(--gray-dark)] font-caption-medium">{title}</p>
        {description && (
          <p className="text-[var(--gray-dark)] font-caption-regular">{description}</p>
        )}
      </div>
    </div>
  );
};
