import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';

import {
  RENTAL_DATA_AMOUNTS,
  RENTAL_DATA_TYPES,
  RENTAL_MAX_SUPPORT_CONNECTIONS,
  initialRentalFilterState,
} from '@/pages/rental/map/model/rentalFilterReducer';
import { Score } from '@/pages/rental/map/ui';
import { OptionButton } from '@/pages/rental/map/ui/OptionButton';
import SectionField from '@/pages/rental/map/ui/SectionField';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { Slider } from '@/shared/ui/Slider';

import type { RentalFilterState } from '@/pages/rental/map/model/rentalFilterReducer';

const dataAmountOptions = RENTAL_DATA_AMOUNTS;
const dataTypeOptions = RENTAL_DATA_TYPES;
const maxSupportConnectionOptions = RENTAL_MAX_SUPPORT_CONNECTIONS;
const LOCAL_STORAGE_KEY = 'rentalFilterState';

interface RentalFilterContentProps {
  onClose?: () => void;
  filterState: RentalFilterState;
  setFilterState: Dispatch<SetStateAction<RentalFilterState>>;
  onSubmit: (s: RentalFilterState) => void;
}

export default function RentalFilterContent({
  onClose,
  filterState,
  setFilterState,
  onSubmit,
}: RentalFilterContentProps) {
  // 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filterState));
    } catch (error) {
      console.warn('Failed to save filter state:', error);
    }
  }, [filterState]);

  return (
    <form
      className="flex flex-col rounded-lg p-4 "
      onSubmit={(e) => {
        e.preventDefault();
        console.log('결과보기 클릭 - 선택된 필터값:', filterState);
        onSubmit(filterState);
      }}
    >
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
            value={filterState.dateRange}
            onChange={(range) => setFilterState({ ...filterState, dateRange: range })}
            placeholder="대여 기간을 선택해주세요"
          />
        </SectionField>
        <SectionField title="별점">
          <Score
            value={filterState.star}
            onChange={(n) => setFilterState({ ...filterState, star: n })}
          />
        </SectionField>
        <Slider
          min={0}
          max={50000}
          value={filterState.maxPrice ?? 50000}
          onValueChange={(max: number) =>
            setFilterState({
              ...filterState,
              maxPrice: max,
              minPrice: filterState.minPrice ?? 0,
            })
          }
        />

        <SectionField title="일일 데이터 제공량">
          <div className="flex gap-2">
            {dataAmountOptions.map((opt) => (
              <OptionButton
                key={opt}
                selected={filterState.dataAmount === opt}
                onClick={() =>
                  setFilterState({
                    ...filterState,
                    dataAmount: filterState.dataAmount === opt ? undefined : opt,
                  })
                }
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
                selected={filterState.dataType === opt}
                onClick={() =>
                  setFilterState({
                    ...filterState,
                    dataType: filterState.dataType === opt ? undefined : opt,
                  })
                }
              >
                {opt}
              </OptionButton>
            ))}
          </div>
        </SectionField>
        <SectionField title="최대 접속 가능 기기 수">
          <div className="flex gap-2">
            {maxSupportConnectionOptions.map((opt) => (
              <OptionButton
                key={opt}
                selected={filterState.maxSupportConnection === opt}
                onClick={() =>
                  setFilterState({
                    ...filterState,
                    maxSupportConnection:
                      filterState.maxSupportConnection === opt ? undefined : opt,
                  })
                }
              >
                {opt}대
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
          onClick={() => setFilterState(initialRentalFilterState)}
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
