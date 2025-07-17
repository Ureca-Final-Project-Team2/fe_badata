import { ICONS } from '@/shared/config/iconPath';

export const SosSection = () => (
  <>
    <h2 className="mb-2 text-[20px] font-sans font-semibold">나의 SOS</h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={ICONS.MYPAGE.MYSOS}
          alt="SOS 요청 내역"
          className="w-[20px] h-[20px] object-contain"
        />
        <span className="text-[--font-body-regular] font-sans font-normal">SOS 요청 내역</span>
      </div>
    </section>
  </>
);
