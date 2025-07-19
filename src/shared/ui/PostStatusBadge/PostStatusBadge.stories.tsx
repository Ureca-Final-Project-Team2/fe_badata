import PostStatusBadge from '@/shared/ui/PostStatusBadge';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof PostStatusBadge> = {
  title: 'UI/PostStatusBadge',
  component: PostStatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
      description: '표시할 텍스트 (예: 거래 완료)',
    },
    children: {
      control: { type: 'text' },
      description: '직접 텍스트를 넘길 수도 있음',
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
    text: '거래 완료',
  },
};

export const WithChildren: Story = {
  args: {
    children: '판매 중',
  },
};

export const ShortText: Story = {
  args: {
    text: '예약',
  },
};

export const LongText: Story = {
  args: {
    text: '거래 대기 중',
  },
};

export const WithCustomClass: Story = {
  args: {
    text: '거래 완료',
    className: 'bg-green-500',
  },
};

export const Empty: Story = {
  args: {},
};
