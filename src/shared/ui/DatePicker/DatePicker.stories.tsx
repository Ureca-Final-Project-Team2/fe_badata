import { useState } from 'react';

import { DatePicker } from './DatePicker';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { DateRange } from 'react-day-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    return (
      <DatePicker value={dateRange} onChange={setDateRange} placeholder="날짜를 선택해주세요" />
    );
  },
};

export const MobileDatePicker: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    return (
      <div
        style={{
          width: '375px',
          padding: '0 24px',
          margin: '0 auto',
        }}
      >
        <DatePicker value={dateRange} onChange={setDateRange} placeholder="날짜를 선택해주세요" />
      </div>
    );
  },
};
