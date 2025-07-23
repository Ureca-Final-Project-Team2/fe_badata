'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/shared/config/iconPath';

export const AlarmSettingSection = () => (
  <>
    <h2 className="mb-2 font-body-semibold">설정</h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <Link href="/mypage/alarm-setting" className="flex items-center gap-3 cursor-pointer group">
        <Image
          src={ICONS.MYPAGE.NOTIFICATION}
          alt="알림 설정"
          width={20}
          height={20}
          className="object-contain"
        />
        <span className="font-label-regular group-hover:text-[var(--main-3)]">알림 설정</span>
      </Link>
    </section>
  </>
);
