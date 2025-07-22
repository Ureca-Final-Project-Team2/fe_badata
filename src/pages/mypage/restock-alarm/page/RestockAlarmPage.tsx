'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BottomNav } from '@/shared/ui/BottomNav';
import { PageHeader } from '@/shared/ui/Header';

const initialAlarms = [
  {
    id: 1,
    title: '국내 포켓와이파이 데이터 연장 15GB 30GB 60GB 120GB 240GB 30일 와이파이도시락 에...',
    price: '10,000원',
    img: '/public/assets/empty-image.png', 
  },
  {
    id: 2,
    title: '국내 포켓와이파이 데이터 연장 15GB 30GB 60GB 120GB 240GB 30일 와이파이도시락 에...',
    price: '10,000원',
    img: '/public/assets/empty-image.png',
  },
];

export default function RestockAlarmPage() {
  const [alarms, setAlarms] = useState(initialAlarms);
  const router = useRouter();

  const handleDelete = (id: number) => {
    setAlarms((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] z-20">
        <PageHeader title="재입고 알림 내역" onBack={() => router.back()} />
      </div>
      <div className="w-full max-w-[428px] flex-1 overflow-y-auto pt-[56px] pb-[84px] px-4">
        <div className="flex items-center justify-between mt-6 mb-4">
          <span className="font-body-semibold text-[var(--black)]">
            전체 <span className="text-[var(--main-5)]">{alarms.length}</span>개
          </span>
          <button
            className="font-body-light-lh text-[var(--gray-mid)]"
            onClick={() => setAlarms([])}
          >
            전체 삭제
          </button>
        </div>
        <ul className="flex flex-col gap-4">
          {alarms.map((item) => (
            <li key={item.id} className="flex gap-3 p-0 min-h-[72px]">
              <div className="w-[72px] h-[72px] bg-[var(--gray-light)] rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.img}
                  alt="상품 이미지"
                  width={72}
                  height={72}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between h-[72px]">
                <div className="flex items-start w-full">
                  <div className="font-body-xs-semibold text-[var(--black)] leading-tight break-words whitespace-pre-line overflow-hidden max-h-[52px] flex-1 line-clamp-2">
                    {item.title}
                  </div>
                  <button
                    className="text-[20px] text-[var(--gray-mid)] px-2 py-0 ml-2 flex-shrink-0 relative -top-2"
                    aria-label="삭제"
                    onClick={() => handleDelete(item.id)}
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-end justify-start w-full mt-1">
                  <span className="font-body-semibold text-[var(--main-5)]">{item.price}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border-2 border-[var(--gray-light)] bg-[var(--white)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--main-1)]">
            <span className="font-body-xs-semibold text-[var(--main-5)]">ⓘ</span>
            <span className="font-body-xs-semibold text-[var(--black)]">이용안내</span>
          </div>
          <div className="px-3 pb-3 pt-0 bg-[var(--white)]">
            <ul className="list-disc pl-4">
              <li className="font-body-light-lh text-[var(--gray-mid)] mb-1">
                기기의 입고 시점에 따라 1회 발송되고, 이미 발송된 재입고 알림은 다시 발송되지
                않으므로 고객님께서 확인 후 원하실 때만 알림을 다시 받고 싶으실 경우 해당 상품
                페이지에서 재신청해주시기 바랍니다.
              </li>
              <li className="font-body-light-lh text-[var(--gray-mid)]">
                대여 기간 내에 기기가 재고로 되지 않게 되면 재입고 알림 신청 내역에서 자동으로
                삭제됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] z-20">
        <BottomNav />
      </div>
    </div>
  );
} 