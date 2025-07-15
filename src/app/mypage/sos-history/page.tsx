'use client';

import { SosHistoryList } from '@features/mypage/components/SosHistoryList';
import { DataUsageCard } from '@ui/DataUsageCard/DataUsageCard';

const SosHistoryPage = () => {
  return (
    <div className="px-4 py-6 flex flex-col gap-8">
      <h1 className="text-xl font-bold">SOS 요청 내역</h1>

      {/* 데이터 카드 */}
      <section>
        <h2 className="mb-2 text-[20px] font-semibold">나의 데이터 서랍</h2>
        <DataUsageCard
          phoneMasked="010-1**4-5**8"
          planName="5G 청춘 요금제"
          billMonth="5월 청구요금"
          billStatus="납부 완료"
          billAmount="150,340원"
          remainingLabel="남은 데이터"
          totalAmount="5GB"
          totalValue={100}
          remainingValue={30}
        />
      </section>

      {/* SOS 요청 내역 */}
      <section>
        <h2 className="mb-2 text-[20px] font-semibold">나의 SOS 요청 내역</h2>
        <SosHistoryList />
      </section>
    </div>
  );
};

export default SosHistoryPage;
