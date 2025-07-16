'use client';

import { ICONS } from '@constants/iconPath';
import { FileText, Home, LucideIcon, Repeat, User } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: '홈', icon: Home },
  { label: '거래', icon: FileText },
  { label: '대여', icon: Repeat },
  { label: '마이', icon: User },
];

const MAIN_COLOR = 'var(--main-1)';
const GRAY_COLOR = 'var(--gray-dark)';

interface BottomNavProps {
  onSosClick?: () => void;
  sosActive?: boolean;
}

const NavItem = ({
  label,
  Icon,
  active,
  onClick,
}: {
  label: string;
  Icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    className="flex flex-col items-center justify-center gap-1 text-sm w-[60px]"
    onClick={onClick}
  >
    <Icon size={20} color={active ? MAIN_COLOR : GRAY_COLOR} />
    <span className="text-[12px] font-bold" style={{ color: active ? MAIN_COLOR : GRAY_COLOR }}>
      {label}
    </span>
  </button>
);

export const BottomNav = ({ onSosClick, sosActive = false }: BottomNavProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <nav className="bottom-0 inset-x-0 h-[70px] bg-white border-t border-gray-200 flex justify-around items-center">
      {navItems.slice(0, 2).map(({ label, icon: Icon }, idx) => (
        <NavItem
          key={label}
          label={label}
          Icon={Icon}
          active={activeIdx === idx && !sosActive}
          onClick={() => setActiveIdx(idx)}
        />
      ))}

      <div className="relative -mt-8 transition-transform duration-300">
        <button
          className={`w-[67px] h-[67px] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center transition-all duration-200 ${sosActive ? 'bg-black scale-100' : 'bg-white scale-100'}`}
          onClick={onSosClick}
        >
          <div className="flex flex-col items-center justify-center transition-opacity duration-200">
            {sosActive ? (
              <>
                <span className="text-white text-[32px] leading-none">×</span>
                <span className="text-white text-[14px]">닫기</span>
              </>
            ) : (
              <img
                src={ICONS.LOGO.SOS}
                alt="SOS 아이콘"
                className="w-[40px] h-[40px] transition-transform duration-300"
              />
            )}
          </div>
        </button>
      </div>

      {navItems.slice(2).map(({ label, icon: Icon }, idx) => (
        <NavItem
          key={label}
          label={label}
          Icon={Icon}
          active={activeIdx === idx + 2 && !sosActive}
          onClick={() => setActiveIdx(idx + 2)}
        />
      ))}
    </nav>
  );
};
