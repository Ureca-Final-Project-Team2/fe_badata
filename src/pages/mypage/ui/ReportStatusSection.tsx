'use client';

import Link from 'next/link';

export const ReportStatusSection = () => (
  <>
    <div className="flex justify-between items-end mb-2 mt-6">
      <h2 className="font-title-semibold leading-[28px]">나의 신고 내역 조회</h2>
      <Link href="/mypage/report-history">접수 내역보기 &gt;</Link>
    </div>

    <section className="grid grid-cols-3 gap-2 text-center">
      {[
        { count: 0, label: '신고 접수' },
        { count: 1, label: '신고 검토' },
        { count: 1, label: '신고 완료' },
      ].map(({ count, label }) => (
        <div key={label} className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
          <div className="font-title-semibold">{count}</div>
          <div className="font-label-regular mt-1">{label}</div>
        </div>
      ))}
    </section>
  </>
);
