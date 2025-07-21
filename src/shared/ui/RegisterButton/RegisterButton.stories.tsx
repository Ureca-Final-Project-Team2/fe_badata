import { RegisterButton } from './RegisterButton';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof RegisterButton> = {
  title: 'Components/RegisterButton',
  component: RegisterButton,
  args: {
    children: '등록하기',
  },
};

export default meta;
type Story = StoryObj<typeof RegisterButton>;

// 기본 활성화 상태
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    isFormValid: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
    isFormValid: true,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'lg',
    isFormValid: true,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'lg',
    isFormValid: true,
  },
};

// 비활성화 상태 (폼이 유효하지 않을 때)
export const Inactive: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    isFormValid: false,
    children: '정보를 입력해주세요',
  },
};

// 로딩 상태
export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    loading: true,
    isFormValid: true,
  },
};

// 비활성화 (disabled)
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: true,
    isFormValid: true,
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    isFormValid: true,
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    isFormValid: true,
  },
};

export const LargeThin: Story = {
  args: {
    variant: 'primary',
    size: 'lg_thin',
    isFormValid: true,
  },
};

export const StateComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        <h3 className="font-semibold">비활성화 상태 (폼 미완성)</h3>
        <RegisterButton isFormValid={false}>정보를 입력해주세요</RegisterButton>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">활성화 상태 (폼 완성)</h3>
        <RegisterButton isFormValid={true}>등록하기</RegisterButton>
      </div>
    </div>
  ),
};
