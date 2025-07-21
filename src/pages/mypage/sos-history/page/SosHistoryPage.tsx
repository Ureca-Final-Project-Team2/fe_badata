'use client';

import { BottomNav } from '@/shared/ui/BottomNav';
import { DataUsageCard } from '@/shared/ui/DataUsageCard';
import { PageHeader } from '@/shared/ui/Header';
import { useRouter } from 'next/navigation';

export default function SosHistoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--white)] flex flex-col items-center">
      <div className="w-full max-w-[428px] flex flex-col justify-between flex-0">
        <PageHeader title="SOS 요청 내역" onBack={() => router.back()} />

        <div className="px-4 pt-4 pb-24">
          <h2 className="text-[20px] font-semibold mb-4">나의 데이터 요금</h2>
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
            <SosHistoryList name="박○○" date="2025.07.07" amount="100MB" status="요청 완료" />
            <SosHistoryList name="박○○" date="2025.07.07" amount="100MB" status="요청 중" />
          </ul>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

interface SosHistoryListProps {
  name: string;
  date: string;
  amount: string;
  status: string;
}

export function SosHistoryList({ name, date, amount, status }: SosHistoryListProps) {
  return (
    <li className="rounded-xl border border-[var(--gray-light)] p-4 flex justify-between items-start bg-[var(--white)]">
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-semibold leading-[16px]">데이터 기부자</p>
        <p className="text-[12.8px] text-[var(--black)] leading-[16px]">: {name}</p> {/* ← 여기 */}
        <p className="text-[12.8px] text-[var(--gray-mid)] leading-[16px]">{date}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="text-[16px] font-semibold leading-[16px] text-[var(--gray-mid)]">
          받은 데이터량
        </p>
        <p className="text-[12.8px] text-[var(--gray-mid)] leading-[16px]">{amount}</p>
        <button
          className="mt-1 px-3 py-[2px] rounded-full bg-[var(--main-5)] text-[12.8px] text-[var(--white)]"
          type="button"
        >
          {status}
        </button>
      </div>
    </li>
  );
}
