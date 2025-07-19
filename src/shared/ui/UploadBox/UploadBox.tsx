interface UploadBoxProps {
  label?: string;
  onClick?: () => void;
}

export const UploadBox = ({ label = '사진/영상을 추가해 주세요', onClick }: UploadBoxProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg cursor-pointer"
      style={{
        width: 220,
        height: 110,
        backgroundColor: '#C3E7F4',
      }}
      onClick={onClick}
    >
      <p className="text-sm font-bold text-black mb-2">{label}</p>
      <div
        className="flex items-center justify-center rounded-full bg-white"
        style={{
          width: 50,
          height: 50,
        }}
      >
        <span
          style={{
            color: '#3E9FDC',
            fontSize: 30,
            lineHeight: 1,
          }}
        >
          +
        </span>
      </div>
    </div>
  );
};
