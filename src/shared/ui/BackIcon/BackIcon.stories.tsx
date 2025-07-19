import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BackIcon } from './BackIcon';

const meta: Meta<typeof BackIcon> = {
  title: 'Components/BackIcon',
  component: BackIcon,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number' },
      defaultValue: 24,
    },
    height: {
      control: { type: 'number' },
      defaultValue: 24,
    },
    alt: {
      control: { type: 'text' },
      defaultValue: '뒤로가기 아이콘',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BackIcon>;

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
    alt: '뒤로가기 아이콘',
  },
};

