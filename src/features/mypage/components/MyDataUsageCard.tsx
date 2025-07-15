'use client';

import { useUserCoin } from '@features/mypage/hooks/useUserCoin';
import { useUserDataUsage } from '@features/mypage/hooks/useUserDataUsage';
import { ICONS } from '@/constants/iconPath';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

Chart.register(ArcElement, Tooltip);

export const MyDataUsageCard = () => {
  const { data: coinData } = useUserCoin();
  const { data: usageData } = useUserDataUsage();
  const [mainColor, setMainColor] = useState<string | null>(null);

  useEffect(() => {
    const cssMain = getComputedStyle(document.documentElement).getPropertyValue('--main-1').trim();
    setMainColor(cssMain || '#0f225e');
  }, []);

  if (!mainColor) return null;
  if (!usageData || !coinData) return <p>데이터를 불러오지 못했습니다.</p>;

  const used = usageData.used;

  const chartData = {
    labels: ['사용량'],
    datasets: [
      {
        data: [used, 100], // 100은 여백용, 시각적 비율만 표현
        backgroundColor: [mainColor, '#f3f4f6'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: { tooltip: { enabled: false } },
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative w-[160px] h-[160px]">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center font-semibold text-main-1">
            <span>{used}GB 사용</span>
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <span>코인 모으기</span>
          <Link
            href="/mypage/coin"
            className="flex items-center gap-1.5 hover:underline hover:font-semibold"
          >
            현재
            <img src={ICONS.MYPAGE.COIN} alt="coin" className="w-4 h-4 object-contain" />
            {coinData.coin} 코인
          </Link>
        </div>
      </div>
    </div>
  );
};
