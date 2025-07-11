export const MyReportStatus = () => (
  <>
    <div className="flex justify-between items-center mb-2">
      <h2
        style={{
          fontSize: 'var(--font-title-semibold)',
          fontWeight: 600,
          fontFamily: 'var(--font-sans)',
        }}
      >
        신고 내역 조회
      </h2>
      <span
        className="text-gray-mid"
        style={{
          fontSize: '12px',
          fontWeight: 400,
          fontFamily: 'var(--font-sans)',
        }}
      >
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
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {count}
          </div>
          <div
            style={{
              fontSize: 'var(--font-body-semibold)',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
              marginTop: '4px',
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </section>
  </>
);
