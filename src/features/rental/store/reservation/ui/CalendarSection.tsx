import React from 'react';

import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';

import type { DateRange } from 'react-day-picker';

interface CalendarSectionProps {
  dateRange: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ dateRange, onChange }) => (
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
        required
        className="rounded-md w-full"
      />
    </div>
  </>
);

export default CalendarSection;
