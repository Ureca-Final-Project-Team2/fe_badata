import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import TradePostCard from './TradePostCard';

const meta: Meta<typeof TradePostCard> = {
  title: 'Widgets/Trade/TradePostCard',
  component: TradePostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: { type: 'text' },
      description: '상품 이미지 URL',
    },
    title: {
      control: { type: 'text' },
      description: '게시물 제목',
    },
    partner: {
      control: { type: 'text' },
      description: '제휴처',
    },
    price: {
      control: { type: 'number' },
      description: '상품 가격',
    },
    likeCount: {
      control: { type: 'number' },
      description: '좋아요 수',
    },
    hasDday: {
      control: { type: 'boolean' },
      description: '디데이 뱃지 표시 여부',
    },
    dday: {
      control: { type: 'number' },
      description: '디데이 값',
    },
    isCompleted: {
      control: { type: 'boolean' },
      description: '거래 완료 상태',
    },
    isLiked: {
      control: { type: 'boolean' },
      description: '좋아요 상태',
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
    imageUrl: '/assets/trade-sample.png',
    title: '쇼콜라 바니드라',
    partner: '제휴처',
    price: 2050,
    likeCount: 5,
    isLiked: false,
  },
};

export const WithDday: Story = {
  args: {
    imageUrl: '/assets/trade-sample.png',
    title: '스타벅스 아메리카노',
    partner: '스타벅스',
    price: 4500,
    likeCount: 8,
    hasDday: true,
    dday: 5,
    isLiked: false,
  },
};

export const Completed: Story = {
  args: {
    imageUrl: '/assets/trade-sample.png',
    title: '올리브영 기프티콘',
    partner: '올리브영',
    price: 10000,
    likeCount: 12,
    isCompleted: true,
    isLiked: false,
  },
};

export const LongTitle: Story = {
  args: {
    imageUrl: '/assets/trade-sample.png',
    title: '매우 긴 상품 제목입니다 이것은 테스트용입니다',
    partner: '긴 제휴처명',
    price: 25000,
    likeCount: 25,
    isLiked: false,
  },
};

export const HighPrice: Story = {
  args: {
    imageUrl: '/assets/trade-sample.png',
    title: '프리미엄 상품',
    partner: '프리미엄 브랜드',
    price: 100000,
    likeCount: 50,
    isLiked: false,
  },
};

export const ManyLikes: Story = {
  args: {
    imageUrl: '/assets/trade-sample.png',
    title: '인기 상품',
    partner: '인기 브랜드',
    price: 15000,
    likeCount: 999,
    isLiked: false,
  },
};

export const ZeroLikes: Story = {
  args: {
    imageUrl: '/assets/trade-sample.png',
    title: '새 상품',
    partner: '새 브랜드',
    price: 5000,
    likeCount: 0,
    isLiked: false,
  },
};

export const WithCustomClass: Story = {
  args: {
    imageUrl: '/assets/trade-sample.png',
    title: '커스텀 스타일',
    partner: '커스텀 브랜드',
    price: 8000,
    likeCount: 12,
    className: 'border-2 border-blue-500',
    isLiked: false,
  },
};

// 인터랙티브 스토리 - 좋아요 버튼이 실제로 작동함
export const Interactive: Story = {
  render: () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(5);

    const handleLikeChange = (liked: boolean) => {
      setIsLiked(liked);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <TradePostCard
          imageUrl="/assets/trade-sample.png"
          title="인터랙티브 상품"
          partner="테스트 브랜드"
          price={15000}
          likeCount={likeCount}
          isLiked={isLiked}
          onLikeChange={handleLikeChange}
        />
        <p className="text-sm text-gray-600">
          좋아요 상태: {isLiked ? '활성' : '비활성'} | 좋아요 수: {likeCount}
        </p>
      </div>
    );
  },
};
