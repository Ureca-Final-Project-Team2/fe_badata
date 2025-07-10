import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'UI/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  argTypes: {
    score: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    size: { control: { type: 'radio' }, options: ['sm', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Small: Story = {
  args: {
    score: 3.5,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    score: 4,
    size: 'lg',
  },
};
