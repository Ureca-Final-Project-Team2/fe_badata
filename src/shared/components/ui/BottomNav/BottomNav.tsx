'use client';

import { cn } from '@/shared/lib/cn';

const navItems = [
  { label: '홈', iconSrc: '/Home.svg' },
  { label: '거래', iconSrc: '/File.svg' },
  { label: '대여', iconSrc: '/Loop.svg' },
  { label: '마이', iconSrc: '/Person.svg' },
];

export const BottomNav = () => {
  return (
    <nav className="absolute bottom-0 inset-x-0 h-[70px] bg-white border-t border-gray-200 flex justify-around items-center z-20">
      {navItems.slice(0, 2).map(({ label, iconSrc }) => (
        <NavItem key={label} label={label} iconSrc={iconSrc} />
      ))}

      {/* 중앙 SOS 버튼 */}
      <div className="relative -mt-8 z-30">
        <button className="w-[67px] h-[67px] rounded-full bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
          <img src="/SOS.svg" alt="SOS 아이콘" className="w-[40px] h-[40px]" />
        </button>
      </div>

      {navItems.slice(2).map(({ label, iconSrc }) => (
        <NavItem key={label} label={label} iconSrc={iconSrc} />
      ))}
    </nav>
  );
};

const NavItem = ({ label, iconSrc }: { label: string; iconSrc: string }) => (
  <button className="flex flex-col items-center justify-center gap-1 text-sm text-black w-[60px]">
    <img src={iconSrc} alt={`${label} 아이콘`} className="w-[20px] h-[20px]" />
    <span className="text-[12px] text-gray-dark">{label}</span>
  </button>
);
