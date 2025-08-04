interface SosHistoryListProps {
  name: string;
  date: string;
  amount: string;
  status: '요청 완료' | '요청 중';
}

export const SosHistoryList = ({ name, date, amount, status }: SosHistoryListProps) => {
  const isDone = status === '요청 완료';

    return (
    <div className="space-y-1">
      <p className="font-small-regular text-[var(--gray-dark)] px-1">{date}</p>

      <li className="rounded-xl border border-[var(--gray)] bg-[var(--white)] p-4 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <p className="font-label-semibold leading-[16px]">데이터 기부자</p>
          <p className="font-small-regular text-[var(--black)] leading-[16px]">: {name}</p>
        </div>

        <div className="flex flex-col items-end gap-1 w-[110px]">
          <p className="font-label-semibold leading-[16px] text-[var(--gray-mid)]">받은 데이터량</p>
          <p className="font-small-regular text-[var(--gray-mid)] leading-[16px]">{amount}</p>

          <button
            className={`w-[86px] py-1 rounded-full text-center font-title-regular text-[16px] ${
              isDone
                ? 'bg-[var(--white)] border border-[var(--main-5)] text-[var(--main-5)]'
                : 'bg-[var(--main-5)] text-[var(--white)]'
            }`}
            type="button"
          >
            {status}
          </button>
        </div>
      </li>
    </div>
  );
};
