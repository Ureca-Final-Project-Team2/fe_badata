import { ImageCard } from '@ui/ImageCard';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ImageCard> = {
  title: 'Components/ImageCard',
  component: ImageCard,
  args: {
    size: 'md',
    url: '/assets/sample.png',
    expireDate: '2025-07-12',
    defaultLiked: false,
  },
};

export default meta;
type Story = StoryObj<typeof ImageCard>;

export const Default: Story = {};
export const Liked: Story = {
  args: {
    defaultLiked: true,
  },
};
export const Expired: Story = {
  args: {
    expireDate: '2024-01-01',
  },
};
