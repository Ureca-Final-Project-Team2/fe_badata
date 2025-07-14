'use client';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { ICONS } from '@/constants/iconPath';

Chart.register(ArcElement, Tooltip);

export const MyDataUsageCard = () => {
  const [mainColor, setMainColor] = useState<string | null>(null);

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const cssMain = rootStyle.getPropertyValue('--main-1').trim();
    setMainColor(cssMain || '#0f225e');
  }, []);

  if (!mainColor) return null;

  const used = 5;
  const total = 10;

  const data = {
    labels: ['사용량', '잔여량'],
    datasets: [
      {
        data: [used, total - used],
        backgroundColor: [mainColor, 'white'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative w-[160px] h-[160px]">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-main-1 font-semibold leading-[1.3] text-[--font-title-semibold] font-sans">
            <span>{used}GB</span>
            <span>/ {total}GB</span>
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <span className="font-medium text-[--font-body-semibold] font-sans">코인 모으기</span>
          <span className="flex items-center gap-1.5 font-medium text-[--font-body-semibold] font-sans">
            현재
            <img
              src={ICONS.MYPAGE.COIN}
              alt="코인 아이콘"
              className="w-[18px] h-[18px] object-contain"
            />
            77 코인
          </span>
        </div>
      </div>
    </div>
  );
};
