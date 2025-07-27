'use client';

import { useEffect, useState } from 'react';

import { ArcElement, Chart, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { useUserDataUsageQuery } from '@/entities/data/model/queries';

Chart.register(ArcElement, Tooltip);

export const DataUsageCardSection = () => {
  const { data: usageData } = useUserDataUsageQuery(); // usageData: { used: number }
  const [mainColor, setMainColor] = useState<string>('#0f225e');

  useEffect(() => {
    const cssMain = getComputedStyle(document.documentElement).getPropertyValue('--main-5').trim();
    if (cssMain) setMainColor(cssMain);
  }, []);

  const used = usageData?.dataAmount ?? 5;
  const total = 10;

  const chartData = {
    labels: ['사용량'],
    datasets: [
      {
        data: [used, total - used],
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
    <div className="flex flex-col items-center">
      <div className="relative w-[160px] h-[160px]">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center font-semibold text-gray-900">
          <span className="text-sm">{used}GB / {total}GB</span>
        </div>
      </div>
    </div>
  );
};
