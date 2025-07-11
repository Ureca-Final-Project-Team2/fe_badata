import { LoginButton } from '@ui/LoginButton';
import { useAuthStore } from '@features/auth/stores/authStore';
import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

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
