import { LikeButtonCircle } from '@/shared/ui/LikeButtonCircle/LikeButtonCircle';

interface BuyButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  likeActive?: boolean;
  onLikeClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

// TODO: 거래 완료 상태일 때 버튼 비활성화 및 '거래 완료' 텍스트 표시 기능 추가 예정
export function BuyButton({ onClick, likeActive = false, onLikeClick, children }: BuyButtonProps) {
  return (
    <div className="flex flex-row items-center gap-6">
      <LikeButtonCircle active={likeActive} onClick={onLikeClick} />
      <button
        type="button"
        onClick={onClick}
        className="w-[300px] h-[55px] rounded-[20px] bg-[var(--main-5)] active:bg-[var(--main-4)] text-white flex items-center justify-center transition-colors"
        style={{ minWidth: 0, minHeight: 0 }}
      >
        <span style={{ fontSize: 'var(--font-title-semibold)', fontWeight: 600 }}>
          {children ?? '구매하기'}
        </span>
      </button>
    </div>
  );
}
