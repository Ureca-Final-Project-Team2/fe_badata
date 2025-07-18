'use client';

import { useSosHistoryQuery } from '../model/quries';

import type { SosHistoryItem } from '../lib/types';

export const SosHistoryPage = () => {
  const { data, isLoading, isError } = useSosHistoryQuery();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>요청 내역을 불러오지 못했습니다.</p>;

  return (
    <div className="flex flex-col gap-4">
      {data.map((item: SosHistoryItem, i: number) => (
        <div key={i} className="flex items-start gap-4">
          <img src={item.imageUrl} alt="상품 이미지" className="w-20 h-20 rounded-md bg-gray-200" />
          <div className="flex flex-col justify-between flex-1">
            <div className="text-sm">
              <div className="text-gray-700">{item.merchantName}</div>
              <div className="font-semibold">{item.menuName}</div>
              <div className="text-pink-500 font-bold">{item.price.toLocaleString()}원</div>
            </div>
            <button className="self-end px-3 py-1 text-sm rounded-full bg-main-1 text-white">
              상세 정보
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
