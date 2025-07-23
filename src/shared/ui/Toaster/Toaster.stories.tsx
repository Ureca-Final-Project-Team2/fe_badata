import { makeToast } from '@/shared/lib/makeToast';

import { Toaster } from './Toaster';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <div style={{ display: 'flex', gap: 16 }}>
        <button
          className="py-[12px] px-[24px] bg-[var(--green)] text-white rounded-2xl"
          onClick={() => makeToast('성공 토스트 예시입니다.', 'success')}
        >
          성공 토스트
        </button>
        <button
          className="py-[12px] px-[24px] bg-[var(--red)] text-white rounded-2xl"
          onClick={() => makeToast('경고 토스트 예시입니다.', 'warning')}
        >
          경고 토스트
        </button>
      </div>
    </div>
  ),
};
