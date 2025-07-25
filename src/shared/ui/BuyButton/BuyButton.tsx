import { DetailLikeButton } from '../LikeButton/DetailLikeButton';

interface BuyButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  likeActive?: boolean;
  onLikeClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  isSold?: boolean;
}

export function BuyButton({
  onClick,
  likeActive = false,
  onLikeClick,
  children,
  disabled = false,
  isSold = false,
}: BuyButtonProps) {
  // 거래 완료 상태이거나 disabled 상태일 때 버튼 비활성화
  const isButtonDisabled = disabled || isSold;

  // 거래 완료 상태일 때 텍스트 변경
  const buttonText = isSold ? '거래 완료' : (children ?? '구매하기');

  return (
    <div className="flex flex-row items-center gap-6">
      <DetailLikeButton active={likeActive} onClick={onLikeClick} disabled={isButtonDisabled} />
      <button
        type="button"
        onClick={onClick}
        disabled={isButtonDisabled}
        className={`w-[300px] h-[55px] rounded-[20px] text-[var(--white)] flex items-center justify-center transition-colors min-w-0 min-h-0 ${
          isButtonDisabled
            ? 'bg-[var(--gray-mid)] cursor-not-allowed'
            : 'bg-[var(--main-5)] active:bg-[var(--main-4)]'
        }`}
      >
        <span className="font-body-semibold text-[var(--white)]">{buttonText}</span>
      </button>
    </div>
  );
}
