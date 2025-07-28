import UserProfileCard from '@/widgets/user/ui/UserProfileCard';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof UserProfileCard> = {
  title: 'Widgets/User/UserProfileCard',
  component: UserProfileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: '사용자 이름',
    },
    tradeCount: {
      control: { type: 'number' },
      description: '거래내역 수',
    },
    avatarSrc: {
      control: { type: 'text' },
      description: '아바타 이미지 URL',
    },
    isFollowing: {
      control: { type: 'boolean' },
      description: '팔로잉 상태',
    },
    onFollowClick: {
      action: 'follow clicked',
      description: '팔로우/팔로잉 버튼 클릭 핸들러',
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
    name: '이은채',
    tradeCount: 15,
  },
};

export const Following: Story = {
  args: {
    name: '박은서',
    tradeCount: 8,
    isFollowing: true,
  },
};

export const WithAvatar: Story = {
  args: {
    name: '박지회',
    tradeCount: 25,
    avatarSrc: 'https://via.placeholder.com/58x58',
  },
};

export const LongName: Story = {
  args: {
    name: '이시현이시현이시현',
    tradeCount: 12,
  },
};

export const ShortName: Story = {
  args: {
    name: '이',
    tradeCount: 3,
  },
};

export const ManyTrades: Story = {
  args: {
    name: '이진우',
    tradeCount: 100,
  },
};

export const ZeroTrades: Story = {
  args: {
    name: '조윤주',
    tradeCount: 0,
  },
};

export const WithCustomClass: Story = {
  args: {
    name: '김도연',
    tradeCount: 18,
    className: 'bg-gray-50',
  },
};
