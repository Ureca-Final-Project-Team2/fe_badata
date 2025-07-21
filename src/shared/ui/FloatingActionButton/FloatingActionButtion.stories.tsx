import { Gift, List, Plus } from 'lucide-react';

import { FloatingActionButton } from './FloatingActionButton';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Components/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Expand: Story = {
  render: () => (
    <FloatingActionButton
      mode="expand"
      triggerAction={{ icon: <Plus />, label: '글쓰기', onClick: () => alert('글쓰기') }}
      actions={[
        { icon: <Gift />, label: '데이터', onClick: () => alert('데이터') },
        { icon: <List />, label: '쿠폰', onClick: () => alert('쿠폰') },
      ]}
    />
  ),
};

export const Single: Story = {
  render: () => (
    <FloatingActionButton
      mode="single"
      triggerAction={{ icon: <Plus />, label: '글쓰기', onClick: () => alert('글쓰기') }}
      actions={[]}
    />
  ),
};
