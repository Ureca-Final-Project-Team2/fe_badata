import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface CoinBalanceSectionProps {
  coinAmount: number;
}

export function CoinBalanceSection({ coinAmount }: CoinBalanceSectionProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={ICONS.MYPAGE.COIN}
        alt="코인 이미지"
        width={150}
        height={150}
        className="rounded-full object-contain"
        unoptimized
      />

      <p className="font-caption-large text-[var(--gray-dark)]">나의 현재 코인</p>
      <p className="font-body-semibold">+{coinAmount}코인</p>
    </div>
  );
} 