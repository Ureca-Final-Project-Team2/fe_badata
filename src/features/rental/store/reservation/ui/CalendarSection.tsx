import React from 'react';

import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';

import type { DateRange } from 'react-day-picker';

interface CalendarSectionProps {
  dateRange: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ dateRange, onChange }) => {
  console.log('CalendarSection - 받은 dateRange:', dateRange);

  // 예약 기간이 설정되면 시작 날짜의 월을 기본으로 설정, 없으면 현재 월
  const month = dateRange?.from || new Date();

  console.log('CalendarSection - month:', month);
  console.log('CalendarSection - dateRange.from:', dateRange?.from);
  console.log('CalendarSection - 현재 날짜:', new Date());

  return (
    <>
      <div className="font-body-semibold flex items-center gap-2 mt-2">
        <CalendarIcon size={20} className="text-[var(--main-5)]" />
        날짜를 선택해 주세요
      </div>
      <div className="w-full">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onChange}
          month={month}
          required
          className="rounded-md w-full"
        />
      </div>
    </>
  );
};

export default CalendarSection;
