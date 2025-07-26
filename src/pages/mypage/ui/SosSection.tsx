'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/shared/config/iconPath';

export const SosSection = () => (
  <>
    <h2 className="mb-2 font-body-semibold">나의 SOS</h2>
    <Link href="/mypage/sos-history" className="group">
      <section className="bg-[var(--main-1)] rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src={ICONS.MYPAGE.MYSOS}
            alt="SOS 요청 내역"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="font-label-regular group-hover:text-[var(--main-3)]">SOS 요청 내역</span>
        </div>
      </section>
    </Link>
  </>
);
