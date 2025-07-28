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
    userId: {
      control: { type: 'number' },
      description: '사용자 ID',
    },
    name: {
      control: { type: 'text' },
      description: '사용자 이름',
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
    userId: 1,
    name: '이은채',
  },
};

export const Following: Story = {
  args: {
    userId: 2,
    name: '박은서',
    isFollowing: true,
  },
};

export const WithAvatar: Story = {
  args: {
    userId: 3,
    name: '박지회',
    avatarSrc: 'https://via.placeholder.com/58x58',
  },
};

export const LongName: Story = {
  args: {
    userId: 4,
    name: '이시현이시현이시현',
  },
};

export const ShortName: Story = {
  args: {
    userId: 5,
    name: '이',
  },
};

export const ManyTrades: Story = {
  args: {
    userId: 6,
    name: '이진우',
  },
};

export const ZeroTrades: Story = {
  args: {
    userId: 7,
    name: '조윤주',
  },
};

export const WithCustomClass: Story = {
  args: {
    userId: 8,
    name: '김도연',
    className: 'bg-gray-50',
  },
};
