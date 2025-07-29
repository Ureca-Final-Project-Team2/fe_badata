import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/shared/config/iconPath';

export const TradeSection = () => (
  <>
    <h2 className="mb-2 font-body-semibold">나의 거래</h2>
    <section className="bg-[var(--main-1)] rounded-xl p-4">
      <ul className="space-y-5">
        <li>
          <Link href="/mypage/sales-history" className="flex items-center gap-3 group transition">
            <Image
              src={ICONS.MYPAGE.TRADE_CELL}
              alt="판매 내역"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-label-regular group-hover:text-[var(--main-3)]">판매 내역</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage/purchase-history" className="flex items-center gap-3 group transition">
            <Image
              src={ICONS.MYPAGE.TRADE_BUY}
              alt="구매 내역"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-label-regular group-hover:text-[var(--main-3)]">구매 내역</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage/like-trade-post" className="flex items-center gap-3 group transition">
            <Image
              src={ICONS.MYPAGE.TRADE_LIKE}
              alt="관심 게시글"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-label-regular group-hover:text-[var(--main-3)]">관심 게시글</span>
          </Link>
        </li>
      </ul>
    </section>
  </>
);
