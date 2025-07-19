import UserAvatar from '@/shared/ui/UserAvatar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof UserAvatar> = {
  title: 'UI/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '이미지 URL',
    },
    alt: {
      control: 'text',
      description: '대체 텍스트',
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md'],
      description: '아바타 크기 (lg: 70x70, md: 56x56)',
    },
    className: {
      control: 'text',
      description: '추가 커스텀 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: '유저 아바타',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: '유저 아바타',
    size: 'lg',
  },
};

export const Medium: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: '유저 아바타',
    size: 'md',
  },
};

export const DefaultAvatar: Story = {
  args: {
    src: undefined,
    alt: '기본 아바타',
    size: 'md',
  },
};

export const InvalidImage: Story = {
  args: {
    src: 'https://invalid-image-url.com/image.jpg',
    alt: '잘못된 이미지',
    size: 'md',
  },
};

export const WithCustomClass: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: '커스텀 클래스가 적용된 아바타',
    size: 'lg',
    className: 'shadow-lg',
  },
};
