import { useState } from 'react';

import { DatePicker } from './DatePicker';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

export const MobileDatePicker: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div
        style={{
          width: '375px',
          padding: '0 24px',
          margin: '0 auto',
        }}
      >
        <DatePicker date={date} onDateChange={setDate} />
      </div>
    );
  },
};
