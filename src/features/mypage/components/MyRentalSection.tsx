import { ICONS } from '@/constants/iconPath';

export const MyRentalSection = () => (
  <>
    <h2 className="text-[20px] font-sans font-semibold">나의 공유기 대여</h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <ul className="space-y-5">
        <li className="flex items-center gap-3">
          <img
            src={ICONS.MYPAGE.RENTAL_LIST}
            alt="공유기 대여 내역"
            className="w-[20px] h-[20px] object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">공유기 대여 내역</span>
        </li>
        <li className="flex items-center gap-3">
          <img
            src={ICONS.MYPAGE.RENTAL_LIKE}
            alt="관심 매장"
            className="w-[20px] h-[20px] object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">관심 매장</span>
        </li>
        <li className="flex items-center gap-3">
          <img
            src={ICONS.MYPAGE.RENTAL_NOTIFICATION}
            alt="재입고 알림"
            className="w-[20px] h-[20px] object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">재입고 알림</span>
        </li>
      </ul>
    </section>
  </>
);
