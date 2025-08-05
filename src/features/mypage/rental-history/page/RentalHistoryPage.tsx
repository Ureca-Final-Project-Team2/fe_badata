'use client';

import { useRouter } from 'next/navigation';

import { differenceInCalendarDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { useRentalHistoryQuery } from '@/features/mypage/rental-history/model/queries';
import { PATH } from '@/shared/config/path';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import type { RentalHistoryItem } from '@/features/mypage/rental-history/lib/types';

// 공통 메시지 컴포넌트
const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center py-8">
    <p className="font-label-regular text-[var(--gray)]">{children}</p>
  </div>
);

const statusMap = {
  PENDING: '예약 중',
  BURROWING: '대여 중',
  COMPLETE: '반납 완료',
} as const;

export default function RentalHistoryPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useRentalHistoryQuery();

  const handleReviewClick = (reservationId: number, storeId: number, hasWrittenReview: boolean) => {
    if (hasWrittenReview) {
      router.push(PATH.RENTAL.STORE_DETAIL.replace(':storeId', String(storeId)));
    } else {
      router.push(`${PATH.RENTAL.REGISTER_REVIEW}?reservationId=${reservationId}&mode=register`);
    }
  };

  return (
    <BaseLayout
      header={<PageHeader title="공유기 대여 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="flex-1 overflow-y-auto max-w-[428px] mx-auto mb-4 mt-4">
        {/* 로딩 상태 */}
        {isLoading && <CenteredMessage>로딩 중...</CenteredMessage>}

        {/* 에러 상태 */}
        {isError && <CenteredMessage>에러가 발생했습니다.</CenteredMessage>}

        {/* 데이터 없음 상태 */}
        {!isLoading && !isError && (!data || !Array.isArray(data.item)) && (
          <CenteredMessage>공유기 대여 내역을 불러올 수 없습니다.</CenteredMessage>
        )}

        {/* 빈 상태 */}
        {!isLoading && !isError && data && Array.isArray(data.item) && data.item.length === 0 && (
          <CenteredMessage>공유기 대여 내역이 없습니다.</CenteredMessage>
        )}

        {/* 데이터 표시 */}
        {!isLoading && !isError && data && Array.isArray(data.item) && data.item.length > 0 && (
          <>
            {data.item.map((item: RentalHistoryItem, idx: number) => {
              const startDate = new Date(item.rentalStartDate);
              const endDate = new Date(item.rentalEndDate);

              const days = differenceInCalendarDays(endDate, startDate) + 1;
              const dateRangeText = `${format(startDate, 'yyyy.MM.dd', { locale: ko })} ~ ${format(endDate, 'MM.dd', { locale: ko })}`;

              const status = statusMap[item.reservationStatus];
              const price = item.price.toLocaleString('ko-KR') + '원';
              const showReviewButton = item.reservationStatus === 'COMPLETE';

              return (
                <div key={item.id} className={`relative mb-10${idx === 0 ? ' mt-6' : ''}`}>
                  <div className="absolute -top-6 left-4 right-4 flex justify-between items-center">
                    <span className="font-body-xs-medium">{dateRangeText}</span>
                    <span className="font-body-xs-medium flex items-center gap-1 text-[var(--gray-mid)]">
                      📅 대여 기간 {days}일
                    </span>
                  </div>

                  <div className="border border-[var(--gray)] rounded-xl bg-white px-4 py-4 pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-y-1 mb-2">
                      <span className="font-body-xs-medium max-w-[calc(100%-100px)] truncate">
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
          </>
        )}
      </div>
    </BaseLayout>
  );
}
