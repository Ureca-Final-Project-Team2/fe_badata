import React from 'react';

interface NoticeSectionProps {
  agreed: boolean;
  onToggleAgreed: () => void;
}

const NoticeSection: React.FC<NoticeSectionProps> = ({ agreed, onToggleAgreed }) => (
  <div className="w-full bg-white rounded-xl px-2 pt-4 pb-2 text-black flex flex-col items-center">
    <div className="font-body-semibold mt-5 mb-10 text-center">
      아래 주의 사항을 꼭 읽어보시고
      <br />
      약관 내용에 동의해 주세요
    </div>
    <ul className="list-disc pl-5 space-y-1 font-label-regular w-full">
      <li>
        기기는 반드시{' '}
        <span className="text-[var(--main-5)] font-label-semibold">
          대여 신청 당일 대리점 영업시간 내에 수령
        </span>
        하셔야 합니다.
      </li>
      <li>
        대여 신청 당일에 수령하지 않을 시 해당 기기에 대한 예약 내역은{' '}
        <span className="text-[var(--main-5)] font-semibold">자동 취소</span>되오니 신중히 예약
        부탁드립니다.
      </li>
      <li>
        반납은{' '}
        <span className="text-[var(--main-5)] font-label-semibold">
          대여 종료일 당일 대리점 영업시간 내에
        </span>{' '}
        하셔야 합니다.
      </li>
      <li>
        기기 미반납 시{' '}
        <span className="text-[var(--main-5)] font-label-semibold">연체료 및 기기 손해배상금</span>
        이 발생하며, 법적 조치를 취할 수 있습니다.
      </li>
      <li>
        단말기에 대한 손실 및 파손 발생 시,{' '}
        <span className="text-[var(--main-5)] font-label-semibold">추가 비용</span>이 발생할 수
        있습니다.
      </li>
      <li>
        분실/파손/기기 반환지연이 반복적으로 발생되는 경우, 고객은{' '}
        <span className="text-[var(--main-5)] font-label-semibold">즉시 대여이용이 제한</span>될 수
        있습니다.
      </li>
      <li>
        단말기 대리점으로 연락하지 않고 미반납/미수령 시, 대리점은 이에 대한{' '}
        <span className="text-[var(--main-5)] font-label-semibold">책임이 없습니다</span>.
      </li>
    </ul>
    <div className="my-10 text-center font-label-medium flex items-center justify-center gap-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={agreed}
        onClick={onToggleAgreed}
        className="w-6 h-6 rounded border-2 border-[var(--main-5)] flex items-center justify-center mr-2 focus:outline-none focus:ring-2 focus:ring-[var(--main-5)] bg-white"
        style={{ minWidth: 24 }}
      >
        {agreed && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8.5L7 11.5L12 5.5"
              stroke="var(--main-5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      위 사항에 동의하십니까?
    </div>
  </div>
);

export default NoticeSection;
