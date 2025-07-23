import DdayBadge from '@/shared/ui/DdayBadge';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof DdayBadge> = {
  title: 'UI/DdayBadge',
  component: DdayBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    dday: {
      control: { type: 'number' },
      description: '표시할 디데이 값 (예: 5)',
    },
    children: {
      control: { type: 'text' },
      description: '직접 텍스트를 넘길 수도 있음',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: '뱃지 크기 (sm: 30x18, md: 50x30)',
    },
    className: {
      control: { type: 'text' },
      description: '추가 커스텀 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dday: 5,
    size: 'md',
  },
};

export const SmallSize: Story = {
  args: {
    dday: 5,
    size: 'sm',
  },
};

export const WithCustomText: Story = {
  args: {
    children: 'D-3',
    size: 'md',
  },
};

export const Zero: Story = {
  args: {
    dday: 0,
  },
};

export const LargeNumber: Story = {
  args: {
    dday: 30,
  },
};

export const WithCustomClass: Story = {
  args: {
    dday: 7,
    className: 'bg-red-500',
  },
};

export const Empty: Story = {
  args: {},
};
