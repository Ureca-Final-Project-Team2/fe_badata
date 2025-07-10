import type { Meta, StoryObj } from '@storybook/react';
import { RentalProduct } from '@ui/RentalProduct';

const meta: Meta<typeof RentalProduct> = {
  title: 'Components/RentalProduct',
  component: RentalProduct,
};

export default meta;
type Story = StoryObj<typeof RentalProduct>;

export const Default: Story = {
  args: {
    imageUrl: '/assets/sample.png',
    title:
      '국내 포켓와이파이 데이터 연장 15GB 30GB 60GB 120GB 240GB 30일 와이파이도시락 에그마요 덮밥 어쩌구 0일 와이파이도시락 에그마요 덮밥 어쩌구 ',
    price: 10000,
  },
};
