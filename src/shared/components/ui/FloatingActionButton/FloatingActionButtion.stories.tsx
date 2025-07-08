import { FaGift, FaList, FaPen, FaPlus } from 'react-icons/fa';
import { FloatingActionButton } from '@ui/FloatingActionButton/FloatingActionButton';
import type { Meta, StoryObj } from '@storybook/react';

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

export const ExpandMode: Story = {
  args: {
    mode: 'expand',
    triggerAction: {
      label: '글쓰기',
      icon: <FaPlus />,
      onClick: () => {},
    },
    actions: [
      {
        label: '데이터',
        icon: <FaGift />,
        onClick: () => alert('데이터 탭으로 이동'),
      },
      {
        label: '쿠폰',
        icon: <FaPen />,
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
      icon: <FaList />,
      onClick: () => alert('목록으로 이동'),
    },
  },
};
