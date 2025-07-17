export const ReportStatusSection = () => (
  <>
    <div className="flex justify-between items-end mb-2">
      <h2 className="text-[20px] font-sans font-semibold leading-[28px]">신고 내역 조회</h2>
      <span className="text-gray-mid text-[--font-body-regular] font-sans font-normal">
        접수 내역보기 &gt;
      </span>
    </div>
    <section className="grid grid-cols-3 gap-2 text-center">
      {[
        { count: 0, label: '신고 접수' },
        { count: 1, label: '신고 검토' },
        { count: 1, label: '신고 완료' },
      ].map(({ count, label }) => (
        <div key={label} className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
          <div className="text-[20px] font-sans font-bold">{count}</div>
          <div className="text-[--font-body-regular] font-sans font-normal mt-1">{label}</div>
        </div>
      ))}
    </section>
  </>
);
