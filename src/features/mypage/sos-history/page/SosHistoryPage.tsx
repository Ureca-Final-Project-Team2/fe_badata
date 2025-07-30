'use client';

import { useRouter } from 'next/navigation';

import { useSosHistoryListQuery } from '@/features/mypage/sos-history/model/queries';
import { SosHistoryList } from '@/features/mypage/sos-history/ui/SosHistoryList';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { DataUsageWidgetContainer } from '@/widgets/data-usage/ui/DataUsageWidgetContainer';

export default function SosHistoryPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useSosHistoryListQuery();

  if (isLoading) {
    return (
      <BaseLayout
        header={<PageHeader title="SOS 요청 내역" onBack={() => router.back()} />}
        showBottomNav
      >
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center">불러오는 중...</div>
        </div>
      </BaseLayout>
    );
  }

  if (isError) {
    return (
      <BaseLayout
        header={<PageHeader title="SOS 요청 내역" onBack={() => router.back()} />}
        showBottomNav
      >
        <div className="w-full max-w-[428px] flex flex-col justify-center items-center flex-1">
          <div className="text-center text-red-500">에러 발생</div>
        </div>
      </BaseLayout>
    );
  }

  const items = data?.item ?? [];

  return (
    <BaseLayout
      header={<PageHeader title="SOS 요청 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px]">
        <div className="px-4 pt-0 pb-[96px]">
          <h2 className="font-body-semibold mb-4 mt-4">나의 데이터 요금</h2>
          <DataUsageWidgetContainer />

          <h2 className="font-body-semibold mt-8 mb-4">나의 SOS 요청 내역</h2>
          <ul className="flex flex-col gap-4">
            {items.length > 0 ? (
              items.map((item) => (
                <SosHistoryList
                  key={item.sosId}
                  name={item.responderId ? `응답자 ${item.responderId}` : '미정'}
                  date={item.createdAt.slice(0, 10)}
                  amount={item.dataAmount}
                  status={item.isSuccess ? '요청 완료' : '요청 중'}
                />
              ))
            ) : (
              <div className="text-center py-8 text-[var(--gray-mid)]">
                SOS 요청 내역이 없습니다.
              </div>
            )}
          </ul>
        </div>
      </div>
    </BaseLayout>
  );
}
