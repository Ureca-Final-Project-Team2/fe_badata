interface SosHistoryListProps {
  name: string;
  date: string;
  amount: string;
  status: '요청 완료' | '요청 중';
}

export const SosHistoryList = ({ name, date, amount, status }: SosHistoryListProps) => {
  const isDone = status === '요청 완료';

  return (
    <li className="flex justify-between items-center bg-[var(--white)] px-4 py-3 rounded-xl shadow-sm">
      <div className="flex flex-col">
        <p className="text-[16px] font-semibold">데이터 기부자 : {name}</p>
        <p className="text-[12.8px] text-[var(--gray-mid)]">{date}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="text-[16px] font-semibold text-[var(--gray-mid)]">받은 데이터량 {amount}</p>
        <button
          className={`text-[12.8px] px-3 py-1 rounded-full font-semibold ${
            isDone
              ? 'bg-[var(--main-5)] text-white'
              : 'bg-white border border-[var(--main-5)] text-[var(--main-5)]'
          }`}
        >
          {status}
        </button>
      </div>
    </li>
  );
};
