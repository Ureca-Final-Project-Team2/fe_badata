'use client';

import { useRouter } from 'next/router';

import { BottomNav } from '@/shared/ui/BottomNav';
import { DataUsageCard } from '@/shared/ui/DataUsageCard';
import { PageHeader } from '@/shared/ui/Header';

interface SosHistoryListProps {
  name: string;
  date: string;
  amount: string;
  status: string;
}

export default function SosHistoryPage() {
  const router = useRouter();

  const sosHistoryData = [
    { name: '홍길동', date: '2024-06-01', amount: '2GB', status: '완료' },
    { name: '김철수', date: '2024-06-02', amount: '1GB', status: '대기' },
  ];

  return (
    <div className="min-h-screen bg-[var(--white)] flex flex-col items-center relative">
      <div className="w-full max-w-[428px]">
        <PageHeader title="SOS 요청 내역" onBack={() => router.back()} />

        <div className="px-4 pt-0 pb-[96px]">
          <h2 className="text-[20px] font-semibold mb-4 mt-4">나의 데이터 요금</h2>
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

          <h2 className="text-[20px] font-semibold mt-8 mb-4">나의 SOS 요청 내역</h2>
          <ul className="flex flex-col gap-4">
            {sosHistoryData.length > 0 ? (
              sosHistoryData.map((item, index) => (
                <SosHistoryList 
                  key={index}
                  name={item.name} 
                  date={item.date} 
                  amount={item.amount} 
                  status={item.status} 
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

      <div className="fixed bottom-0 w-full max-w-[428px]">
        <BottomNav />
      </div>
    </div>
  );
}

function SosHistoryList({ name, date, amount, status }: SosHistoryListProps) {
  return (
    <li className="rounded-xl border border-[var(--gray-light)] p-4 flex justify-between items-start bg-[var(--white)]">
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-semibold leading-[16px]">데이터 기부자</p>
        <p className="text-[12.8px] text-[var(--black)] leading-[16px]">: {name}</p>
        <p className="text-[12.8px] text-[var(--gray-mid)] leading-[16px]">{date}</p>
      </div>
      <div className="flex flex-col items-end gap-1 w-[110px]">
        <p className="text-[16px] font-semibold leading-[16px] text-[var(--gray-mid)]">
          받은 데이터량
        </p>
        <p className="text-[12.8px] text-[var(--gray-mid)] leading-[16px]">{amount}</p>
        <button
          className="w-[86px] py-1 rounded-full bg-[var(--main-5)] text-[var(--white)] text-[16px] font-title-regular text-center"
          type="button"
        >
          {status}
        </button>
      </div>
    </li>
  );
}
