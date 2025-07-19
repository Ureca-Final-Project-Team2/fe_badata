import { useState } from 'react';
import { LikeButton } from './LikeButton';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof LikeButton> = {
  title: 'Components/LikeButton',
  component: LikeButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    active: {
      control: { type: 'boolean' },
      description: '좋아요 활성 상태',
    },
    onClick: {
      description: '클릭 핸들러',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    active: false,
  },
};

export const Liked: Story = {
  args: {
    active: true,
  },
};

// 클릭 시 상태가 변경되는 인터랙티브 스토리
export const Interactive: Story = {
  render: () => {
    const [isLiked, setIsLiked] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <LikeButton active={isLiked} onClick={() => setIsLiked(!isLiked)} />
        <p className="text-sm text-gray-600">상태: {isLiked ? '좋아요 활성' : '좋아요 비활성'}</p>
      </div>
    );
  },
};
