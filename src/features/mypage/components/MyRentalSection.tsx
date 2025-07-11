import { ICONS } from '@/constants/iconPath';

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
        <li className="flex items-center gap-3">
          <img
            src={ICONS.MYPAGE.RENTAL_LIST}
            alt="공유기 대여 내역"
            className="w-[20px] h-[20px] object-contain"
          />
          <span
            style={{
              fontSize: 'var(--font-body-semibold)',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
            }}
          >
            공유기 대여 내역
          </span>
        </li>
        <li className="flex items-center gap-3">
          <img
            src={ICONS.MYPAGE.RENTAL_LIKE}
            alt="관심 매장"
            className="w-[20px] h-[20px] object-contain"
          />
          <span
            style={{
              fontSize: 'var(--font-body-semibold)',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
            }}
          >
            관심 매장
          </span>
        </li>
        <li className="flex items-center gap-3">
          <img
            src={ICONS.MYPAGE.RENTAL_NOTIFICATION}
            alt="재입고 알림"
            className="w-[20px] h-[20px] object-contain"
          />
          <span
            style={{
              fontSize: 'var(--font-body-semibold)',
              fontWeight: 500,
              fontFamily: 'var(--font-sans)',
            }}
          >
            재입고 알림
          </span>
        </li>
      </ul>
    </section>
  </>
);
