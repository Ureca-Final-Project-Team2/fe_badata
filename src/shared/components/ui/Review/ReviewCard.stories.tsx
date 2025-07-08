import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReviewCard } from './ReviewCard';

const meta: Meta<typeof ReviewCard> = {
  title: 'EXAMPLE/ReviewCard',
  component: ReviewCard,
  args: {
    title: '공유기 대리점',
    rating: '3.12 토',
    price: '30,000원',
  },
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

export const Default: Story = {
  args: {
    size: 'default',
  },
};

export const WithReviewButton: Story = {
  args: {
    size: 'default',
    showReviewButton: true,
    onReviewClick: () => console.log('리뷰쓰기 클릭'),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    title: '저렴한 공유기 대리점',
    rating: '4.5 토',
    price: '25,000원',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: '비싼 공유기 대리점',
    rating: '2.8 토',
    price: '45,000원',
    showReviewButton: true,
  },
};

export const LongTitle: Story = {
  args: {
    title: '아주 긴 대리점 이름이 들어간 경우 어떻게 표시되는지 확인해보는 테스트',
    rating: '3.95 토',
    price: '50,000원',
    showReviewButton: true,
  },
};

export const HighRating: Story = {
  args: {
    title: '최고 평점 대리점',
    rating: '4.98 토',
    price: '80,000원',
    showReviewButton: true,
  },
};

export const LowRating: Story = {
  args: {
    title: '낮은 평점 대리점',
    rating: '1.2 토',
    price: '15,000원',
  },
};

export const ExpensiveItem: Story = {
  args: {
    title: '프리미엄 대리점',
    rating: '4.7 토',
    price: '150,000원',
    showReviewButton: true,
  },
};

// 카드 비교뷰
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 bg-gray-50 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small (320*110)</h3>
        <ReviewCard size="sm" title="저렴한 공유기 대리점" rating="4.2 토" price="20,000원" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Default (380*130)</h3>
        <ReviewCard
          size="default"
          title="대리점 이름"
          rating="3.12 토"
          price="30,000원"
          showReviewButton={true}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Large (440*150)</h3>
        <ReviewCard
          size="lg"
          title="비싼 공유기 대리점 이름"
          rating="4.8 토"
          price="60,000원"
          showReviewButton={true}
        />
      </div>
    </div>
  ),
};

// 레이아웃
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <ReviewCard title="대리점 A" rating="4.5 토" price="25,000원" showReviewButton={true} />
      <ReviewCard title="대리점 B" rating="3.8 토" price="35,000원" />
      <ReviewCard title="대리점 C" rating="4.9 토" price="55,000원" showReviewButton={true} />
      <ReviewCard title="대리점 D" rating="2.1 토" price="18,000원" />
    </div>
  ),
};
