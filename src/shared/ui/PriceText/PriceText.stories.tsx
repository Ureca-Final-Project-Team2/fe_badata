import PriceText from '@/shared/ui/PriceText';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof PriceText> = {
  title: 'UI/PriceText',
  component: PriceText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: '가격 값',
    },
    unit: {
      control: { type: 'text' },
      description: '단위(기본값: 원)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: '텍스트 크기 (sm: 12px, md: 16px)',
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
    value: 15000,
  },
};

export const WithStringValue: Story = {
  args: {
    value: '25,000',
  },
};

export const CustomUnit: Story = {
  args: {
    value: 5000,
    unit: 'P',
  },
};

export const LargeAmount: Story = {
  args: {
    value: 1000000,
  },
};

export const SmallAmount: Story = {
  args: {
    value: 500,
  },
};

export const SmallSize: Story = {
  args: {
    value: 15000,
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    value: 15000,
    size: 'md',
  },
};

export const WithCustomClass: Story = {
  args: {
    value: 30000,
    className: 'text-red-500',
  },
};

export const Zero: Story = {
  args: {
    value: 0,
  },
};
