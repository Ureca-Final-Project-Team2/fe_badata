import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

import { LoginButton } from './LoginButton';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof LoginButton> = {
  title: 'Components/LoginButton',
  component: LoginButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginButton>;

// Zustand store 초기화 decorator
const StoreInitializer = ({ children }: { children: React.ReactNode }) => {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    logout(); // 초기 상태: isLoggedIn = false
  }, [logout]);

  return <>{children}</>;
};

export const Default: Story = {
  render: () => (
    <StoreInitializer>
      <LoginButton />
    </StoreInitializer>
  ),
};
