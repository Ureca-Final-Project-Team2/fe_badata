import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UploadBox } from './UploadBox';

const meta: Meta<typeof UploadBox> = {
  title: 'Components/UploadBox',
  component: UploadBox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      defaultValue: '사진을 추가해 주세요',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UploadBox>;

export const Default: Story = {
  args: {
    label: '사진을 추가해 주세요',
  },
};
