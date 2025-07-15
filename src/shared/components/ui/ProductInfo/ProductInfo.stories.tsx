import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductInfo } from '@ui/ProductInfo';

const meta: Meta<typeof ProductInfo> = {
  title: 'Components/ProductInfo',
  component: ProductInfo,
  tags: ['autodocs'],
  args: {
    brand: '이마트',
    name: '상품권 1만원권',
    price: 10000,
  },
};

export default meta;
type Story = StoryObj<typeof ProductInfo>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
