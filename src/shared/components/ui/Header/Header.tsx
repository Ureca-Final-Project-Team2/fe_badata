'use client';

import { LoginButton } from '@/shared/components/ui/LoginButton/LoginButton';

export const Header = () => {
  return (
    <header className="w-full h-[70px] px-4 flex items-center justify-between bg-white shadow-sm">
      <h1 className="text-xl font-extrabold text-[#0F225E] tracking-wide">BADATA</h1>
      <LoginButton label="로그인" />
    </header>
  );
};
