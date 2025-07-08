import type { Meta, StoryObj } from '@storybook/react';
import { LikeButton } from '@ui/LikeButton';

const meta: Meta<typeof LikeButton> = {
  title: 'Components/LikeButton',
  component: LikeButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    defaultLiked: false,
  },
};

export const Liked: Story = {
  args: {
    defaultLiked: true,
  },
};
