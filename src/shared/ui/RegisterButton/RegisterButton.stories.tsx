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
export const Default: Story = {
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
