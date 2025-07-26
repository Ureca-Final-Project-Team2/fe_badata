'use client';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { DataUsageCard } from '@/shared/ui/DataUsageCard';
import { PageHeader } from '@/shared/ui/Header';

import { useSosHistoryListQuery } from '../model/queries';
import { SosHistoryList } from '../ui/SosHistoryList';

export default function SosHistoryPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useSosHistoryListQuery();
  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (!data) return <div>데이터 없음</div>;

  const items = data.item ?? [];

  return (
    <BaseLayout header={<PageHeader title="SOS 요청 내역" onBack={() => router.back()} />} showBottomNav>
      <div className="w-full max-w-[428px]">
        <div className="px-4 pt-0 pb-[96px]">
          <h2 className="font-body-semibold mb-4 mt-4">나의 데이터 요금</h2>
          <DataUsageCard
            phoneMasked="010-1**4-5**8"
            planName="5G 청춘 요금제"
            billMonth="5월 청구요금"
            billStatus="납부 완료"
            billAmount="150,340원"
            remainingLabel="남은 데이터"
            totalAmount="10GB"
            totalValue={10}
            remainingValue={5}
          />

          <h2 className="font-body-semibold mt-8 mb-4">나의 SOS 요청 내역</h2>
          <ul className="flex flex-col gap-4">
            {isLoading ? (
              <div>불러오는 중...</div>
            ) : isError ? (
              <div className="text-center py-8 text-[var(--gray-mid)]">데이터를 불러오지 못했습니다.</div>
            ) : items.length > 0 ? (
              items.map((item) => (
                <SosHistoryList
                  key={item.sosId}
                  name={item.responderId ? `박OO` : '미정'}
                  date={item.createdAt.slice(0, 10)}
                  amount={"100MB"}
                  status={item.isSuccess ? '요청 완료' : '요청 중'}
                />
              ))
            ) : (
              <div className="text-center py-8 text-[var(--gray-mid)]">SOS 요청 내역이 없습니다.</div>
            )}
          </ul>
        </div>
      </div>
    </BaseLayout>
  );
}
