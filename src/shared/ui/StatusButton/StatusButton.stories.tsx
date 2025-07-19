import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusButton } from './StatusButton';

const meta: Meta<typeof StatusButton> = {
  title: 'Components/StatusButton',
  component: StatusButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      defaultValue: '✨ 기기 상태가 좋아요',
    },
    selected: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusButton>;

export const Default: Story = {
  args: {
    label: '✨ 기기 상태가 좋아요',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    label: '✨ 기기 상태가 좋아요',
    selected: true,
  },
};
