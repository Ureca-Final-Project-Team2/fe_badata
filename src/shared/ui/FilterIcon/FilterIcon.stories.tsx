import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FilterIcon } from './FilterIcon';

const meta: Meta<typeof FilterIcon> = {
  title: 'Components/FilterIcon',
  component: FilterIcon,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number' },
      defaultValue: 24,
    },
    height: {
      control: { type: 'number' },
      defaultValue: 24,
    },
    alt: {
      control: { type: 'text' },
      defaultValue: '필터 아이콘',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FilterIcon>;

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
    alt: '필터 아이콘',
  },
};

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    alt: '큰 필터 아이콘',
  },
};

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    alt: '작은 필터 아이콘',
  },
};
