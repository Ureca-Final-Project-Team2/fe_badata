import { Gift, List, Pen, Plus } from 'lucide-react';

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

export const ExpandMode: Story = {
  args: {
    mode: 'expand',
    triggerAction: {
      label: '글쓰기',
      icon: <Plus />,
      onClick: () => {},
    },
    actions: [
      {
        label: '데이터',
        icon: <Gift />,
        onClick: () => alert('데이터 탭으로 이동'),
      },
      {
        label: '쿠폰',
        icon: <List />,
        onClick: () => alert('쿠폰 탭으로 이동'),
      },
    ],
  },
};

export const SingleMode: Story = {
  args: {
    mode: 'single',
    triggerAction: {
      label: '목록보기',
      icon: <Pen />,
      onClick: () => alert('목록으로 이동'),
    },
  },
};
