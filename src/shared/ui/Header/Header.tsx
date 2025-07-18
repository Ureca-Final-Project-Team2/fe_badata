'use client';

import { ICONS } from '@/shared/config/iconPath';

import { LoginButton } from '../LoginButton';

export const Header = () => {
  return (
    <header className="w-full h-[70px] px-4 flex items-center justify-between bg-white">
      <div className="relative w-[100px] h-[30px]">
        <img src={ICONS.LOGO.BADATA} alt="BADATA 로고" className="object-contain" />
      </div>
      <LoginButton />
    </header>
  );
};
