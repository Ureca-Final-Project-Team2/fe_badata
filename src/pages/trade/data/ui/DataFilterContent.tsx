'use client';

import { useReducer } from 'react';

import { OptionButton, SectionField } from '@/pages/rental/map/ui';
import { RegisterButton } from '@/shared/ui/RegisterButton';

import { PRICE_RANGES } from '../lib/constants';
import {
  dataFilterReducer,
  initialDataFilterState,
  type DataFilterState,
} from '../model/dataFilterReducer';

import type { PriceRange } from '../model/dataFilterReducer';

const CARRIER_OPTIONS = ['UPLUS', 'KT', 'SKT'] as const;
const CAPACITY_OPTIONS = ['100MB 이하', '100MB~500MB', '500MB~1GB', '1GB~5GB', '5GB 이상'];

const PRICE_OPTIONS = Object.entries(PRICE_RANGES).map(([value, { label }]) => ({
  label,
  value: value as PriceRange,
}));

interface DataFilterContentProps {
  onClose?: () => void;
  onSubmit?: (filters: DataFilterState) => void;
}

export default function DataFilterContent({ onClose, onSubmit }: DataFilterContentProps) {
  const [state, dispatch] = useReducer(dataFilterReducer, initialDataFilterState);

  return (
    <form className="flex flex-col rounded-lg p-4">
      <div className="flex flex-col gap-5 border-b border-[var(--gray)] pb-6">
        {/* 헤더 */}
        <div className="flex items-center gap-2 border-b border-[var(--gray)] pb-2 mb-2">
          <span className="font-body-semibold">데이터 게시물 필터링</span>
          <button
            type="button"
            className="ml-auto text-2xl text-[var(--gray-dark)]"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <SectionField title="통신사">
          {CARRIER_OPTIONS.map((carrier) => (
            <OptionButton
              key={carrier}
              selected={state.carriers.includes(carrier)}
              onClick={() => dispatch({ type: 'TOGGLE_CARRIER', payload: carrier })}
            >
              {carrier}
            </OptionButton>
          ))}
        </SectionField>
        <SectionField title="데이터 용량">
          {CAPACITY_OPTIONS.map((capacity) => (
            <OptionButton
              key={capacity}
              selected={state.capacities.includes(capacity)}
              onClick={() => dispatch({ type: 'TOGGLE_CAPACITY', payload: capacity })}
            >
              {capacity}
            </OptionButton>
          ))}
        </SectionField>
        <SectionField title="가격">
          {PRICE_OPTIONS.map(({ label, value }) => (
            <OptionButton
              key={value}
              selected={state.priceRange === value}
              onClick={() => dispatch({ type: 'SET_PRICE_RANGE', payload: value })}
            >
              {label}
            </OptionButton>
          ))}
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
          type="button"
          variant="primary"
          size="sm"
          isFormValid={true}
          className="flex-1"
          onClick={() => {
            onSubmit?.(state);
            onClose?.();
          }}
        >
          적용하기
        </RegisterButton>
      </div>
    </form>
  );
}
