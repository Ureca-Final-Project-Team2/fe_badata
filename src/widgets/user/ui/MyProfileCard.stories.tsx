import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof MyProfileCard> = {
  title: 'Widgets/User/MyProfileCard',
  component: MyProfileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: '사용자 이름',
    },
    days: {
      control: { type: 'number' },
      description: 'BADATA와 함께한 일수',
    },
    avatarSrc: {
      control: { type: 'text' },
      description: '아바타 이미지 URL',
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
    name: '김철수',
    days: 30,
  },
};

export const LongName: Story = {
  args: {
    name: '김철수김철수김철수',
    days: 45,
  },
};

export const ShortName: Story = {
  args: {
    name: '김',
    days: 7,
  },
};

export const WithAvatar: Story = {
  args: {
    name: '이영희',
    days: 100,
    avatarSrc: 'https://via.placeholder.com/70x70',
  },
};

export const ManyDays: Story = {
  args: {
    name: '박민수',
    days: 365,
  },
};

export const OneDay: Story = {
  args: {
    name: '최신규',
    days: 1,
  },
};

export const WithCustomClass: Story = {
  args: {
    name: '정다은',
    days: 15,
    className: 'bg-gray-100',
  },
};
