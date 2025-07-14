'use client';

import Link from 'next/link';
import { useUserCoin } from '@/features/mypage/hooks/useUserCoin';
import { ICONS } from '@/constants/iconPath';

export const MyCoinSummary = () => {
  const { data, isLoading, isError } = useUserCoin();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>코인 정보를 불러오지 못했습니다.</p>;

  return (
    <div className="flex justify-between w-full px-4 mt-4 text-sm">
      <span>코인 모으기</span>
      <Link
        href="/mypage/coin"
        className="flex items-center gap-1.5 text-main-1 hover:underline hover:font-semibold"
      >
        현재
        <img src={ICONS.MYPAGE.COIN} alt="coin" className="w-4 h-4 object-contain" />
        {data.coin} 코인
      </Link>
    </div>
  );
};
