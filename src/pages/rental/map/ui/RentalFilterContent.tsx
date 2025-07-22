import { useEffect, useReducer } from 'react';

import {
  initialRentalFilterState,
  RENTAL_DATA_AMOUNTS,
  RENTAL_DATA_TYPES,
  RENTAL_DEVICE_COUNTS,
  rentalFilterReducer,
} from '@/pages/rental/map/model/rentalFilterReducer';
import { Score } from '@/pages/rental/map/ui';
import { OptionButton } from '@/pages/rental/map/ui/OptionButton';
import SectionField from '@/pages/rental/map/ui/SectionField';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { Slider } from '@/shared/ui/Slider';

const dataAmountOptions = RENTAL_DATA_AMOUNTS;
const dataTypeOptions = RENTAL_DATA_TYPES;
const deviceCountOptions = RENTAL_DEVICE_COUNTS;
const LOCAL_STORAGE_KEY = 'rentalFilterState';

interface RentalFilterContentProps {
  onClose?: () => void;
}

export default function RentalFilterContent({ onClose }: RentalFilterContentProps) {
  // localStorage에서 초기값 불러오기
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
    return initialRentalFilterState;
  };
  const [state, dispatch] = useReducer(rentalFilterReducer, undefined, getInitialState);

  // 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <form className="flex flex-col rounded-lg p-4 ">
      <div className="flex flex-col gap-5 border-b border-[var(--gray)] pb-6">
        {/* 헤더 */}
        <div className="flex items-center gap-2 border-b border-[var(--gray)] pb-2 mb-2">
          <span className="font-body-semibold">플레이스 필터</span>
          <span className="text-[var(--gray-dark)] text-small-regular">|</span>
          <span className="text-small-regular">지도</span>
          <button
            type="button"
            className="ml-auto text-2xl text-[var(--gray-dark)]"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <SectionField title="대여 기간">
          <DatePicker
            value={state.dateRange}
            onChange={(range) => dispatch({ type: 'SET_DATE_RANGE', payload: range })}
            placeholder="대여 기간을 선택해주세요"
          />
        </SectionField>
        <SectionField title="별점">
          <Score value={state.star} onChange={(n) => dispatch({ type: 'SET_STAR', payload: n })} />
        </SectionField>
        <Slider />

        <SectionField title="일일 데이터 제공량">
          <div className="flex gap-2">
            {dataAmountOptions.map((opt) => (
              <OptionButton
                key={opt}
                selected={state.dataAmount === opt}
                onClick={() => dispatch({ type: 'SET_DATA_AMOUNT', payload: opt })}
              >
                {opt}
              </OptionButton>
            ))}
          </div>
        </SectionField>
        <SectionField title="데이터 타입">
          <div className="flex gap-2">
            {dataTypeOptions.map((opt) => (
              <OptionButton
                key={opt}
                selected={state.dataType === opt}
                onClick={() => dispatch({ type: 'SET_DATA_TYPE', payload: opt })}
              >
                {opt}
              </OptionButton>
            ))}
          </div>
        </SectionField>
        <SectionField title="최대 접속 가능 기기 수">
          <div className="flex gap-2">
            {deviceCountOptions.map((opt) => (
              <OptionButton
                key={opt}
                selected={state.deviceCount === opt}
                onClick={() => dispatch({ type: 'SET_DEVICE_COUNT', payload: opt })}
              >
                {opt}
              </OptionButton>
            ))}
          </div>
        </SectionField>
      </div>
      {/* 하단 버튼 */}
      <div className="flex gap-4 mt-4">
        <RegisterButton
          type="button"
          variant="outline"
          size="sm"
          isFormValid={true}
          className="flex-1"
          onClick={() => dispatch({ type: 'RESET' })}
        >
          초기화
        </RegisterButton>
        <RegisterButton
          type="submit"
          variant="primary"
          size="sm"
          isFormValid={true}
          className="flex-1"
        >
          결과보기
        </RegisterButton>
      </div>
    </form>
  );
}
