import React from 'react';

interface PaymentButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  isSold?: boolean;
}

export const PaymentButton = React.memo(function PaymentButton({
  onClick,
  children,
  disabled = false,
  isSold = false,
}: PaymentButtonProps) {
  const isButtonDisabled = disabled || isSold;
  const buttonText = isSold ? '거래 완료' : (children ?? '구매하기');

  return (
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
  );
});
