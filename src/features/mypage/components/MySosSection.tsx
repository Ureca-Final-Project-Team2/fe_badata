import { ICONS } from '@/constants/iconPath';

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
      <div className="flex items-center gap-3">
        <img
          src={ICONS.MYPAGE.SOS}
          alt="SOS 요청 내역"
          className="w-[20px] h-[20px] object-contain"
        />
        <span
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          SOS 요청 내역
        </span>
      </div>
    </section>
  </>
);
