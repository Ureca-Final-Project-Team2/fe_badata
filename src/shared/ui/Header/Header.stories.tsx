import '@/app/globals.css';
import { ICONS } from '@/shared/config/iconPath';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const MockLoginButton = () => (
  <button className="h-[35px] w-[70px] px-4 py-3 rounded-[6px] bg-white text-[11px] font-extrabold shadow-md border-none mr-[24px]">
    로그인
  </button>
);

const MockHeader = () => (
  <header className="w-[428px] h-[70px] px-4 flex justify-between items-center bg-white shadow-sm">
    <div className="w-[90px] h-[90px] ml-[24px] flex items-center justify-center">
      <img src={ICONS.LOGO.BADATA} alt="BADATA 로고" className="object-contain w-[90px] h-[90px]" />
    </div>
    <MockLoginButton />
  </header>
);

const meta: Meta<typeof MockHeader> = {
  title: 'Components/Header',
  component: MockHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MockHeader>;

export const Default: Story = {
  render: () => (
    <div className="w-[428px] h-[812px] mx-auto border border-[#ccc] flex flex-col">
      <MockHeader />
    </div>
  ),
};
