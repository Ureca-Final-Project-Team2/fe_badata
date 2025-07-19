'use client';

import * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Calendar, CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/cn';

export interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange, placeholder }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toLocaleDateString() : <span>{placeholder ?? ''}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* @ts-expect-error: Calendar is not from lucide-react, but from a custom component */}
        <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
};
