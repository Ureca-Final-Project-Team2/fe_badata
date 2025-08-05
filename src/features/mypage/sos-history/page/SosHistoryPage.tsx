'use client';

import { useRouter } from 'next/navigation';

import { useSosHistoryListQuery } from '@/features/mypage/sos-history/model/queries';
import { SosHistoryList } from '@/features/mypage/sos-history/ui/SosHistoryList';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { DataUsageWidgetContainer } from '@/widgets/data-usage/ui/DataUsageWidgetContainer';

// 공통 메시지 컴포넌트
const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center py-8">
    <p className="font-label-regular text-[var(--gray)]">{children}</p>
  </div>
);

export default function SosHistoryPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useSosHistoryListQuery();

  const items = data?.item ?? [];

  return (
    <BaseLayout
      header={<PageHeader title="SOS 요청 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px]">
        <h2 className="font-body-semibold mb-4 mt-4">나의 데이터 요금</h2>
        <DataUsageWidgetContainer />
        <h2 className="font-body-semibold mt-8 mb-4">나의 SOS 요청 내역</h2>

        {/* 로딩 상태 */}
        {isLoading && <CenteredMessage>불러오는 중...</CenteredMessage>}

        {/* 에러 상태 */}
        {isError && <CenteredMessage>에러 발생</CenteredMessage>}

        {/* 빈 상태 */}
        {!isLoading && !isError && items.length === 0 && (
          <CenteredMessage>SOS 요청 내역이 없습니다.</CenteredMessage>
        )}

        {/* 데이터 표시 */}
        {!isLoading && !isError && items.length > 0 && (
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <SosHistoryList
                key={item.sosId}
                name={item.responderId ? `응답자 ${item.responderId}` : '미정'}
                date={item.createdAt.slice(0, 10)}
                amount={item.dataAmount}
                status={item.isSuccess ? '요청 완료' : '요청 중'}
              />
            ))}
          </ul>
        )}
      </div>
    </BaseLayout>
  );
}
