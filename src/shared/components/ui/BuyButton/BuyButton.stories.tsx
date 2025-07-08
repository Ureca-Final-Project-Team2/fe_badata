import type { Meta, StoryObj } from '@storybook/react';
import { BuyButton } from '@/shared/components/ui/BuyButton/BuyButton';

const meta: Meta<typeof BuyButton> = {
  title: 'EXAMPLE/BuyButton',
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
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
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
