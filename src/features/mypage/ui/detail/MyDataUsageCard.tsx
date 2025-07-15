'use client';

import { ICONS } from '@/constants/iconPath';
import { useUserDataUsage } from '@/features/mypage/model/useUserDataUsageQuery';
import { ArcElement, Chart, Tooltip } from 'chart.js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useUserCoin } from '../../model/useUserCoinQuery';

Chart.register(ArcElement, Tooltip);

export const MyDataUsageCard = () => {
  const { data: coinData } = useUserCoin();
  const { data: usageData } = useUserDataUsage();
  const [mainColor, setMainColor] = useState<string>('#0f225e');

  useEffect(() => {
    const cssMain = getComputedStyle(document.documentElement).getPropertyValue('--main-1').trim();
    if (cssMain) setMainColor(cssMain);
  }, []);

const used = usageData?.used ?? 0;
const coinAmount = coinData?.coin ?? 0;

  const chartData = {
    labels: ['사용량'],
    datasets: [
      {
        data: [used, 100 - used],
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
            className="flex items-center gap-1.5 underline hover:font-semibold"
          >
            <img src={ICONS.MYPAGE.COIN} alt="coin" className="w-4 h-4 object-contain" />
            현재 <span className="font-semibold">{coinAmount}</span> 코인
          </Link>
        </div>
      </div>
    </div>
  );
};
