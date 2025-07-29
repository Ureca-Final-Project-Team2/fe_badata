import { ImageCard } from './ImageCard';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ImageCard> = {
  title: 'Components/ImageCard',
  component: ImageCard,
  args: {
    size: 'md',
    url: '/assets/sample.png',
    expireDate: '2025-07-12',
  },
};

export default meta;
type Story = StoryObj<typeof ImageCard>;

export const Expired: Story = {
  args: {
    expireDate: '2024-01-01',
  },
};
