import { ICONS } from '@/constants/iconPath';

export const MySettings = () => (
  <>
    <h2
      className="mb-2"
      style={{
        fontSize: 'var(--font-title-semibold)',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
      }}
    >
      설정
    </h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={ICONS.MYPAGE.NOTIFICATION}
          alt="알림 설정"
          className="w-[20px] h-[20px] object-contain"
        />
        <span
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          알림 설정
        </span>
      </div>
    </section>
  </>
);
