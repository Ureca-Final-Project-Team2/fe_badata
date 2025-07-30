import React from 'react';

import { DetailLikeButton } from '@/widgets/trade/ui/DetailLikeButton';
import { PaymentButton } from '@/widgets/trade/ui/PaymentButton';

interface TradeActionButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  likeActive?: boolean;
  onLikeClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  isSold?: boolean;
}

export const TradeActionButton = React.memo(function TradeActionButton({
  onClick,
  likeActive = false,
  onLikeClick,
  children,
  disabled = false,
  isSold = false,
}: TradeActionButtonProps) {
  return (
    <div className="flex flex-row items-center gap-6">
      <DetailLikeButton active={likeActive} onClick={onLikeClick} disabled={disabled || isSold} />
      <PaymentButton onClick={onClick} disabled={disabled} isSold={isSold}>
        {children}
      </PaymentButton>
    </div>
  );
});
