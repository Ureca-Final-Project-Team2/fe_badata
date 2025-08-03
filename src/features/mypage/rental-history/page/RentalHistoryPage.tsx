'use client';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

import { useRentalHistoryQuery } from '@/features/mypage/rental-history/model/queries';
import { PATH } from '@/shared/config/path';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import type { RentalHistoryItem } from '@/features/mypage/rental-history/lib/types';

export default function RentalHistoryPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useRentalHistoryQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!data || !Array.isArray(data.item)) return <div>대여 내역을 불러올 수 없습니다.</div>;

  const rentalHistoryData = data.item;

  const handleReviewClick = (reservationId: number, storeId: number, hasWrittenReview: boolean) => {
    if (hasWrittenReview) {
      router.push(`/store/${storeId}/reviews`);
    } else {
      router.push(`${PATH.RENTAL.REGISTER_REVIEW}?reservationId=${reservationId}&mode=register`);
    }
  };

  const statusMap = {
    PENDING: '예약 중',
    BURROWING: '대여 중',
    COMPLETE: '반납 완료',
  } as const;

  return (
    <BaseLayout
      header={<PageHeader title="공유기 대여 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px] flex-1 overflow-y-auto pt-4 pb-[84px] px-4">
        {rentalHistoryData.length === 0 && (
          <div className="text-center text-gray-400 mt-10">대여 내역이 없습니다.</div>
        )}
        {rentalHistoryData.map((item: RentalHistoryItem, idx: number) => {
          const dateObj = new Date(item.rentalStartDate);
          const date = format(dateObj, 'M.d', { locale: ko });
          const day = format(dateObj, 'eee', { locale: ko });

          const status = statusMap[item.reservationStatus];
          const price = item.price.toLocaleString('ko-KR') + '원';
          const showReviewButton = item.reservationStatus === 'COMPLETE';

          return (
            <div key={item.id} className={`relative mb-8${idx === 0 ? ' mt-4' : ''}`}>
              <div className="absolute -top-6 left-2 flex items-center gap-2">
                <span className="font-body-xs-medium">{date}</span>
                <span className="font-body-xs-medium text-[var(--gray-mid)]">{day}</span>
              </div>
              <div className="border-2 border-[var(--gray-light)] rounded-2xl bg-white px-4 py-4 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-y-1 mb-2">
                  <span className="font-body-xs-medium max-w-[calc(100%-100px)] break-words">
                    {item.storeName}
                  </span>
                  {showReviewButton && (
                    <button
                      onClick={() => handleReviewClick(item.id, item.storeId, item.isReviewed)}
                      className="flex-shrink-0 whitespace-nowrap flex items-center gap-1 text-[var(--main-5)] font-title-regular cursor-pointer ml-auto"
                    >
                      {item.isReviewed ? (
                        <>
                          <span className="text-[16px]">👀</span>
                          리뷰보기
                        </>
                      ) : (
                        <>
                          <span className="text-[16px]">🖊️</span>
                          리뷰쓰기
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="border-dashed border-t border-[var(--gray-light)] my-2" />
                <div className="flex items-center justify-between">
                  <button
                    className="w-[86px] py-1 rounded-full text-center font-title-regular bg-[var(--main-5)] text-white"
                    type="button"
                  >
                    {status}
                  </button>
                  <span className="font-body-xs-semibold">{price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BaseLayout>
  );
}
