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
    img: '/public/assets/empty-image.png', // 예시 이미지
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
      {/* 헤더 고정 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] z-20">
        <PageHeader title="재입고 알림 내역" onBack={() => router.back()} />
      </div>
      {/* 리스트 영역 */}
      <div className="w-full max-w-[428px] flex-1 overflow-y-auto pt-[56px] pb-[84px] px-4">
        {/* 제목 */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <span
            className="text-[20px] font-semibold"
            style={{ fontFamily: 'var(--font-title-semibold)' }}
          >
            전체 <span style={{ color: 'var(--main-5)' }}>{alarms.length}</span>개
          </span>
          <button
            className="text-[12.8px] text-[var(--gray-mid)] font-light"
            style={{ fontFamily: 'var(--font-body-light-lh)' }}
            onClick={() => setAlarms([])}
          >
            전체 삭제
          </button>
        </div>
        {/* 알림 리스트 */}
        <ul className="flex flex-col gap-4">
          {alarms.map((item) => (
            <li key={item.id} className="flex gap-3 relative p-0 min-h-[72px]">
              <div className="w-[72px] h-[72px] bg-[var(--gray-light)] rounded-md overflow-hidden flex-shrink-0">
                <Image src={item.img} alt="상품 이미지" width={72} height={72} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between h-[72px]">
                <div className="flex flex-col h-full justify-between min-h-[72px]">
                  <div className="text-[16px] font-semibold leading-tight break-words whitespace-pre-line overflow-hidden max-h-[52px]" style={{ fontFamily: 'var(--font-body-semibold)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {item.title}
                  </div>
                  <div className="flex items-end justify-start w-full mt-1">
                    <span className="text-[16px] font-semibold text-[var(--main-5)]" style={{ fontFamily: 'var(--font-body-semibold)' }}>
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-0 right-0 text-[20px] text-[var(--gray-mid)] px-2 py-1"
                aria-label="삭제"
                onClick={() => handleDelete(item.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        {/* 안내 박스 */}
        <div className="mt-6 rounded-xl border-2 border-[var(--gray-light)] bg-white overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#ececec' }}>
            <span className="text-[16px] font-semibold" style={{ fontFamily: 'var(--font-body-semibold)', color: 'var(--main-5)' }}>ⓘ</span>
            <span className="text-[16px] font-semibold" style={{ fontFamily: 'var(--font-body-semibold)' }}>이용안내</span>
          </div>
          <div className="px-3 pb-3 pt-0 bg-white">
            <ul className="list-disc pl-4">
              <li className="text-[12.8px] text-[var(--gray-mid)] mb-1" style={{ fontFamily: 'var(--font-body-light-lh)' }}>
                기기의 입고 시점에 따라 1회 발송되고, 이미 발송된 재입고 알림은 다시 발송되지 않으므로 고객님께서 확인 후 원하실 때만 알림을 다시 받고 싶으실 경우 해당 상품 페이지에서 재신청해주시기 바랍니다.
              </li>
              <li className="text-[12.8px] text-[var(--gray-mid)]" style={{ fontFamily: 'var(--font-body-light-lh)' }}>
                대여 기간 내에 기기가 재고로 되지 않게 되면 재입고 알림 신청 내역에서 자동으로 삭제됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* 하단바 고정 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] z-20">
        <BottomNav />
      </div>
    </div>
  );
} 