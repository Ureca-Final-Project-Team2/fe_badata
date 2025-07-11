export const MyRentalSection = () => (
  <>
    <h2
      className="mb-2"
      style={{
        fontSize: 'var(--font-title-semibold)',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
      }}
    >
      나의 공유기 대여
    </h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <ul className="space-y-5">
        <li
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          📶 공유기 대여 내역
        </li>
        <li
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          🏪 관심 매장
        </li>
        <li
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          ⏰ 재입고 알림
        </li>
      </ul>
    </section>
  </>
);
