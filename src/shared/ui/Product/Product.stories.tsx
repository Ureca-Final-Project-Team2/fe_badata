import { Product } from './Product';

import type { ProductProps } from '@/shared/ui/Product';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Product> = {
  title: 'Components/Product',
  component: Product,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Product>;

export const Default: Story = {
  args: {
    imageSrc: '/assets/sample.png',
    brand: '제휴사',
    name: '쇼콜라 바닐라 프레첸토',
    price: 10000,
    likeCount: 1,
  } satisfies ProductProps,
};
