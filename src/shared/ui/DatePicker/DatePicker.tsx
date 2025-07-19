'use client';

import * as React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/cn';

export interface DatePickerProps {
  date: Date | undefined;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, placeholder }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal hover:text-[var(--main-5)]',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toLocaleDateString() : <span>{placeholder ?? ''}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start"></PopoverContent>
    </Popover>
  );
};
