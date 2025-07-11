export const MySosSection = () => (
  <>
    <h2
      className="mb-2"
      style={{
        fontSize: 'var(--font-title-semibold)',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
      }}
    >
      나의 SOS
    </h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div
        style={{
          fontSize: 'var(--font-body-semibold)',
          fontWeight: 500,
          fontFamily: 'var(--font-sans)',
        }}
      >
        🚨 SOS 요청 내역
      </div>
    </section>
  </>
);
