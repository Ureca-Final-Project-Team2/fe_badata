import { BottomNav } from '@ui/BottomNav';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BottomNav> = {
  title: 'Components/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // 전체화면에 붙여서 보기
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        width: '375px',
        height: '812px',
        margin: '0 auto',
        border: '1px solid #ccc',
        position: 'relative',
        backgroundColor: '#f9f9f9',
      }}
    >
      <main style={{ height: 'calc(100% - 70px)' }} />
      <BottomNav />
    </div>
  ),
};
