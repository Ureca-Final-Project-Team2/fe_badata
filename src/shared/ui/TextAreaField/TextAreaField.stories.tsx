import { TextAreaField } from './TextAreaField';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TextAreaField> = {
  title: 'Components/TextAreaField',
  component: TextAreaField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TextAreaField>;

export const Default: Story = {
  args: {
    placeholder: '여러 줄 텍스트 입력 창 입니다.',
    value: '',
  },
};

export const WithError: Story = {
  args: {
    placeholder: '여러 줄 텍스트 입력 창 입니다.',
    isRequired: true,
    value: '',
    errorMessage: '내용을 입력해주세요.',
  },
};
