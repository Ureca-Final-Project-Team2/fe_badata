'use client';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/entities/auth/model/authStore';
import { useReportStatusQuery } from '@/features/mypage/report-status/model/queries';

export const ReportStatusSection = () => {
  const { isLoggedIn } = useAuthStore();
  const { data } = useReportStatusQuery();

  const questionCount = isLoggedIn ? (data?.questionCount ?? 0) : 0;
  const answerCount = isLoggedIn ? (data?.answerCount ?? 0) : 0;
  const completeCount = isLoggedIn ? (data?.completeCount ?? 0) : 0;

  const statusList = [
    { count: questionCount, label: '신고 접수' },
    { count: answerCount, label: '신고 검토' },
    { count: completeCount, label: '신고 완료' },
  ];

  return (
    <section className="mt-8">
      <div className="flex justify-between items-end mb-2">
        <h2 className="font-body-semibold leading-[28px]">나의 신고 내역 조회</h2>
        <Link
          href="/mypage/report-history"
          className="hover:text-[var(--main-3)] flex items-center gap-1"
        >
          접수 내역보기
          <ChevronRight size={17} />
        </Link>
      </div>

      <section className="grid grid-cols-3 gap-2 text-center">
        {statusList.map(({ count, label }) => (
          <div key={label} className="bg-[var(--main-1)] rounded-xl p-4 flex flex-col items-center">
            <div className="font-body-semibold">{count}</div>
            <div className="font-label-regular mt-1">{label}</div>
          </div>
        ))}
      </section>
    </section>
  );
};
