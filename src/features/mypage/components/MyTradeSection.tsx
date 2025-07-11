export const MyTradeSection = () => (
  <>
    <h2
      className="mb-2"
      style={{
        fontSize: 'var(--font-title-semibold)',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
      }}
    >
      나의 거래
    </h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          📄 판매 내역
        </div>
        <div
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          🛍 구매 내역
        </div>
        <div
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          💗 찜 목록
        </div>
      </div>
    </section>
  </>
);
