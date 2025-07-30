import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/shared/config/iconPath';

export const RentalSection = () => (
  <>
    <h2 className="font-body-semibold mb-2">나의 공유기 대여</h2>
    <section className="bg-[var(--main-1)] rounded-xl px-6 py-4 shadow-sm">
      <ul className="space-y-5">
        <li>
          <Link href="/mypage/rental-history" className="flex items-center gap-4 group transition">
            <Image
              src={ICONS.MYPAGE.RENTAL_LIST}
              alt="공유기 대여 내역"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-label-regular group-hover:text-[var(--main-3)]">
              공유기 대여 내역
            </span>
          </Link>
        </li>
        <li>
          <Link href="/mypage/like-store" className="flex items-center gap-4 group transition">
            <Image
              src={ICONS.MYPAGE.RENTAL_LIKE}
              alt="관심 매장"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-label-regular group-hover:text-[var(--main-3)]">관심 매장</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage/restock-alarm" className="flex items-center gap-4 group transition">
            <Image
              src={ICONS.MYPAGE.RENTAL_NOTIFICATION}
              alt="재입고 알림"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-label-regular group-hover:text-[var(--main-3)]">재입고 알림</span>
          </Link>
        </li>
      </ul>
    </section>
  </>
);
