import { ICONS } from '@/shared/config/iconPath';
import { HEADER_WIDTH } from '@/shared/config/ui';
import Image from 'next/image';

interface HeaderDetailProps {
  title: string;
}

export function Header_Detail({ title }: HeaderDetailProps) {
  return (
    <header
      className={`w-full max-w-[${HEADER_WIDTH.MAX}px] min-w-[${HEADER_WIDTH.MIN}px] h-[70px] px-0 flex items-center justify-between bg-white relative`}
    >
      {/* 왼쪽 아이콘 */}
      <div className="flex items-center justify-center w-[60px] h-[58px] absolute left-[24px] top-1/2 -translate-y-1/2">
        <Image
          src={ICONS.ETC.BACK}
          alt="뒤로가기"
          width={60}
          height={58}
          className="object-contain"
        />
      </div>
      {/* 가운데 텍스트 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none">
        <span className="text-black text-xl font-semibold">{title}</span>
      </div>
    </header>
  );
}
