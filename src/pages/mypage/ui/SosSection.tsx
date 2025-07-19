import { ICONS } from '@/shared/config/iconPath';
import Image from 'next/image';

export const SosSection = () => (
  <>
    <h2 className="mb-2 text-[20px] font-sans font-semibold">나의 SOS</h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src={ICONS.MYPAGE.MYSOS}
          alt="SOS 요청 내역"
          width={20}
          height={20}
          className="object-contain"
        />
        <span className="text-[--font-body-regular] font-sans font-normal">SOS 요청 내역</span>
      </div>
    </section>
  </>
);
