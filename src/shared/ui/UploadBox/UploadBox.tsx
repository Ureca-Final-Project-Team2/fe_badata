interface UploadBoxProps {
  label?: string;
  onClick?: () => void;
}

export const UploadBox = ({ label = '사진을 추가해 주세요', onClick }: UploadBoxProps) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center cursor-pointer rounded-lg
        w-[220px] h-[110px] bg-[var(--main-2)]
      `}
      onClick={onClick}
    >
      <p
        className={`
          mb-2 text-[length:var(--font-body-semibold)] font-semibold text-[var(--black)]
        `}
      >
        {label}
      </p>
      <div className="flex items-center justify-center rounded-full bg-white w-[50px] h-[50px]">
        <span className="text-[30px] leading-none text-[var(--main-5)]">+</span>
      </div>
    </div>
  );
};
