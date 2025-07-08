import type { Meta, StoryObj } from '@storybook/react';
import { FloatingActionButton } from '@ui/FloatingActionButton/FloatingActionButton';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Shared/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Default: Story = {
  args: {
    actions: [
      {
        label: '데이터',
        onClick: () => alert('데이터 탭으로 이동'),
      },
      {
        label: '쿠폰',
        onClick: () => alert('쿠폰 탭으로 이동'),
      },
    ],
  },
};
