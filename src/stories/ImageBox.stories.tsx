// src/stories/ImageBox.stories.tsx
import { ImageBox } from '@/shared/components/ui/ImageBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ImageBox> = {
  title: 'UI/ImageBox',
  component: ImageBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageBox>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 's',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
  },
};

export const Large: Story = {
  args: {
    size: 'l',
  },
};

export const WithImageUrl: Story = {
  args: {
    size: 'm',
    url: 'https://source.unsplash.com/300x300/?city',
  },
};
