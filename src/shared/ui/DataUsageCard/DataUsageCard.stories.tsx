import { useState } from 'react';

import { DataUsageCard } from '@ui/DataUsageCard';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof DataUsageCard> = {
  title: 'Components/DataUsageCard',
  component: DataUsageCard,
  args: {
    phoneMasked: '010-1**4-5**8',
    planName: '5G 청춘 요금제',
    billMonth: '5월 청구요금',
    billStatus: '납부 완료',
    billAmount: '150,340원',
    remainingLabel: '남은 데이터',
    totalAmount: '5GB',
    totalValue: 5,
    remainingValue: 2.5,
  },
};

export default meta;

type Story = StoryObj<typeof DataUsageCard>;

export const Default: Story = {};

export const NoData: Story = {
  args: {
    remainingValue: 0,
    totalValue: 5,
    totalAmount: '5GB',
  },
};

export const FullData: Story = {
  args: {
    remainingValue: 5,
    totalValue: 5,
    totalAmount: '5GB',
  },
};

export const Interactive: Story = {
  render: () => {
    const [remain, setRemain] = useState(3.3);
    const total = 5;

    return (
      <div className="space-y-4">
        <DataUsageCard
          phoneMasked="010-9**3-1**0"
          planName="청년 안심 요금제"
          billMonth="6월 청구요금"
          billStatus="미납"
          billAmount="93,200원"
          remainingLabel="남은 데이터"
          totalAmount="5GB"
          totalValue={total}
          remainingValue={remain}
        />

        <input
          type="range"
          min={0}
          max={total}
          step={0.1}
          value={remain}
          onChange={(e) => setRemain(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-center text-[var(--gray-mid)]">
          남은 용량: {remain.toFixed(1)}GB
        </p>
      </div>
    );
  },
};
