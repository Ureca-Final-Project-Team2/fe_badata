'use client';

import * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/shared/lib/cn';

import type { DateRange } from 'react-day-picker';

export interface DatePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal text-[var(--main-5)] hover:text-[var(--main-5)]',
            !value?.from && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from && value?.to
            ? `${format(value.from, 'yyyy-MM-dd')} ~ ${format(value.to, 'yyyy-MM-dd')}`
            : (placeholder ?? '')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[200]" align="start">
        <Calendar mode="range" selected={value} onSelect={onChange} initialFocus required={false} />
      </PopoverContent>
    </Popover>
  );
};
