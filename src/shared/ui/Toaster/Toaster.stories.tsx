import { makeToast } from '@/shared/lib/makeToast';

import { Toaster } from './Toaster';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Toaster> = {
  title: 'Feedback/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const ToastDemo: Story = {
  render: () => (
    <div>
      <Toaster />
      <div style={{ display: 'flex', gap: 16 }}>
        <button
          style={{ padding: '12px 24px', background: '#4ade80', color: '#fff', borderRadius: 8 }}
          onClick={() => makeToast('성공 토스트 예시입니다.', 'success')}
        >
          성공 토스트
        </button>
        <button
          style={{ padding: '12px 24px', background: '#f87171', color: '#fff', borderRadius: 8 }}
          onClick={() => makeToast('경고 토스트 예시입니다.', 'warning')}
        >
          경고 토스트
        </button>
      </div>
    </div>
  ),
};
