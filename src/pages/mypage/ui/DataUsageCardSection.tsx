'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ArcElement, Chart, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { useUserCoinQuery } from '@/entities/coin/model/queries';
import { useUserDataUsageQuery } from '@/entities/data/model/queries';
import { ICONS } from '@/shared/config/iconPath';

Chart.register(ArcElement, Tooltip);

export const DataUsageCardSection = () => {
  const { data: coinData } = useUserCoinQuery(); // coinData: number
  const { data: usageData } = useUserDataUsageQuery(); // usageData: { used: number }
  const [mainColor, setMainColor] = useState<string>('#0f225e');

  useEffect(() => {
    const cssMain = getComputedStyle(document.documentElement).getPropertyValue('--main-5').trim();
    if (cssMain) setMainColor(cssMain);
  }, []);

  const used = usageData?.dataAmount ?? 0;
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
            className="flex items-center gap-1.5 hover:underline hover:font-semibold"
          >
            <Image
              src={ICONS.MYPAGE.COIN}
              alt="coin"
              width={16}
              height={16}
              className="object-contain"
            />
            현재 <span className="font-semibold">{coinAmount}</span> 코인
          </Link>
        </div>
      </div>
    </div>
  );
};
