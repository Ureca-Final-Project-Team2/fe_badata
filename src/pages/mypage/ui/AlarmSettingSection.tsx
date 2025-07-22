'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/shared/config/iconPath';

export const AlarmSettingSection = () => (
  <>
  <h2 className="mb-2 text-[20px] font-sans font-semibold">설정</h2>
  <section className="bg-white rounded-xl p-4 shadow-sm">
    <Link href="/mypage/alarm-setting" className="flex items-center gap-3 cursor-pointer">
      <Image
        src={ICONS.MYPAGE.NOTIFICATION}
        alt="알림 설정"
        width={20}
        height={20}
        className="object-contain"
      />
      <span className="text-[--font-body-regular] font-sans font-normal">알림 설정</span>
    </Link>
    </section>
    </>
);
