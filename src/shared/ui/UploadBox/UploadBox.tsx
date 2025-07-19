
interface UploadBoxProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  tabIndex?: number;
  ariaLabel?: string;
}

export const UploadBox = ({
  label = '사진을 추가해 주세요',
  onClick,
  disabled = false,
  tabIndex,
  ariaLabel,
}: UploadBoxProps) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center rounded-lg
        w-[220px] h-[110px] bg-[var(--main-2)]
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-[var(--main-5)]
      `}
      onClick={() => {
        if (!disabled) onClick?.();
      }}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={tabIndex ?? 0}
      role="button"
      aria-label={ariaLabel ?? label}
    >
      <p className="mb-2 text-[length:var(--font-body-semibold)] font-semibold text-[var(--black)]">
        {label}
      </p>
      <div className="flex items-center justify-center rounded-full bg-white w-[50px] h-[50px]">
        <span className="text-[30px] leading-none text-[var(--main-5)]">+</span>
      </div>
    </div>
  );
};
