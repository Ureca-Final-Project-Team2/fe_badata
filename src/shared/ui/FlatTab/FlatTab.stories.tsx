import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FlatTab } from './FlatTab';

const meta: Meta<typeof FlatTab> = {
  title: 'Components/FlatTab',
  component: FlatTab,
};

export default meta;

type Story = StoryObj<typeof FlatTab>;

// 전체 / 데이터 / 쿠폰
export const BasicTabs: Story = {
  args: {
    items: [
      { id: 'all', label: '전체' },
      { id: 'data', label: '데이터' },
      { id: 'coupon', label: '쿠폰' },
    ],
    onValueChange: (value: string) => console.log(`Tab changed to: ${value}`),
  },
};
// 판매 중 / 판매 완료
export const SalesStatusTabs: Story = {
  args: {
    items: [
      { id: 'selling', label: '판매 중' },
      { id: 'soldout', label: '판매 완료' },
    ],
  },
};

// 예약 / 상세정보 / 리뷰
export const BookingTabs: Story = {
  args: {
    items: [
      { id: 'reserve', label: '예약' },
      { id: 'detail', label: '상세정보' },
      { id: 'review', label: '리뷰' },
    ],
  },
};

// 전체 / 데이터 / 쿠폰 / 이벤트 / 공지사항 / 설정
export const ExtendedTabs: Story = {
  args: {
    items: [
      { id: 'all', label: '전체' },
      { id: 'data', label: '데이터' },
      { id: 'coupon', label: '쿠폰' },
      { id: 'event', label: '이벤트' },
      { id: 'notice', label: '공지사항' },
      { id: 'setting', label: '설정' },
    ],
  },
};

