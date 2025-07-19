import { FilterIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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
    // 'alt' is not a valid prop for Lucide icons, so it has been removed.
  },
};

export default meta;

type Story = StoryObj<typeof FilterIcon>;

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
  },
};

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
  },
};

export const Small: Story = {
  args: {
    width: 16,
    height: 16,
  },
};
