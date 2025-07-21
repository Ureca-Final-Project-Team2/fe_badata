'use client';



import { useRouter } from 'next/navigation';

import { BottomNav } from '@/shared/ui/BottomNav';
import { PageHeader } from '@/shared/ui/Header';

const rentalHistoryData = [
  {
    date: '3.12',
    day: '토',
    store: '가맹점 이름',
    status: '예약 중',
    price: '30,000원',
    isReview: false,
  },
  {
    date: '3.12',
    day: '토',
    store: '가맹점 이름',
    status: '예약 중',
    price: '30,000원',
    isReview: false,
  },
  {
    date: '3.12',
    day: '토',
    store: '가맹점 이름',
    status: '예약 중',
    price: '30,000원',
    isReview: false,
  },
  {
    date: '3.12',
    day: '토',
    store: '가맹점 이름',
    status: '반납 완료',
    price: '30,000원',
    isReview: true,
  },
];

export default function RentalHistoryPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative">
      {/* 상단 헤더 고정 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] z-20">
        <PageHeader title="공유기 대여 내역" onBack={() => router.back()} />
      </div>
      {/* 리스트 영역: 헤더/바텀바 높이만큼 패딩, 스크롤 */}
      <div className="w-full max-w-[428px] flex-1 overflow-y-auto pt-[88px] pb-[84px] px-4">
        {rentalHistoryData.map((item, idx) => (
          <div key={idx} className={`relative mb-8${idx === 0 ? ' mt-4' : ''}`}>
            {/* 날짜/요일 박스 바깥 왼쪽 상단 */}
            <div className="absolute -top-6 left-2 flex items-center gap-2">
              <span
                className="text-[16px] font-semibold"
                style={{ fontFamily: 'var(--font-body-semibold)' }}
              >
                {item.date}
              </span>
              <span
                className="text-[16px] font-semibold"
                style={{ color: 'var(--gray-mid)', fontFamily: 'var(--font-body-semibold)' }}
              >
                {item.day}
              </span>
            </div>
            <div className="border-2 border-[var(--gray-light)] rounded-2xl bg-white px-4 py-4 pt-6">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[20px] font-semibold"
                  style={{ fontFamily: 'var(--font-title-semibold)' }}
                >
                  {item.store}
                </span>
                {item.isReview && (
                  <button
                    className="flex items-center gap-1 text-[var(--main-5)] text-[14px] font-title-regular"
                    style={{ fontFamily: 'var(--font-title-regular)' }}
                  >
                    <span role="img" aria-label="연필">✏️</span> 리뷰쓰기
                  </button>
                )}
              </div>
              <div className="border-dashed border-t border-[var(--gray-light)] my-2" />
              <div className="flex items-center justify-between">
                <button
                  className="w-[86px] py-1 rounded-full text-center font-title-regular text-[16px] bg-[var(--main-5)] text-white"
                  style={{ fontFamily: 'var(--font-title-regular)' }}
                  type="button"
                >
                  {item.status}
                </button>
                <span className="text-[20px] font-semibold" style={{ fontFamily: 'var(--font-title-semibold)' }}>
                  {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 하단바 고정 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] z-20">
        <BottomNav />
      </div>
    </div>
  );
} 