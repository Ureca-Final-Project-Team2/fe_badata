import type { Meta, StoryObj } from '@storybook/react';
import { ImageBox } from '@ui/ImageBox';

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
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithImageUrl: Story = {
  args: {
    size: 'md',
    url: 'https://source.unsplash.com/300x300/?city',
  },
};
