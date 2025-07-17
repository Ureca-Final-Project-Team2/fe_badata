import { BuyButton } from '@ui/BuyButton';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof BuyButton> = {
  title: 'Components/BuyButton',
  component: BuyButton,
  args: {
    children: '구매하기',
  },
};

export default meta;
type Story = StoryObj<typeof BuyButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
};
