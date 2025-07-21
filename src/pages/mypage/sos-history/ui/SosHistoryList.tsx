interface SosHistoryListProps {
  name: string;
  date: string;
  amount: string;
  status: '요청 완료' | '요청 중';
}

export const SosHistoryList = ({ name, date, amount, status }: SosHistoryListProps) => {
  const isDone = status === '요청 완료';

  return (
    <li className="rounded-xl border border-[var(--gray-light)] p-4 flex justify-between items-start bg-[var(--white)]">
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-semibold leading-[16px]">데이터 기부자</p>
        <p className="text-[12.8px] text-[var(--black)] leading-[16px]">: {name}</p>
        <p className="text-[12.8px] text-[var(--gray-mid)] leading-[16px]">{date}</p>
      </div>

      <div className="flex flex-col items-end gap-1 w-[110px]">
        <p className="text-[16px] font-semibold leading-[16px] text-[var(--gray-mid)]">
          받은 데이터량
        </p>
        <p className="text-[12.8px] text-[var(--gray-mid)] leading-[16px]">{amount}</p>

        <button
          className={`w-[86px] py-1 rounded-full text-center font-title-regular text-[16px] ${
            isDone
              ? 'bg-[var(--main-5)] text-[var(--white)]'
              : 'bg-[var(--white)] border border-[var(--main-5)] text-[var(--main-5)]'
          }`}
          type="button"
        >
          {status}
        </button>
      </div>
    </li>
  );
};