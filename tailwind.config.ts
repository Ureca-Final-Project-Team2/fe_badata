import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'], // Pretendard 설정
      },
      colors: {
        'main-1': '#edf7fb',
        'main-2': '#c6eaf8',
        'main-3': '#ade7ff',
        'main-4': '#72c1f2',
        'main-5': '#3e9fdc',

        // Gray scale
        white: '#FFFFFF',
        'gray-light': '#F6F6F6',
        gray: '#CBCBCB',
        'gray-mid': '#9B9B9B',
        'gray-dark': '#656565',
        black: '#222222',

        // Status 색상
        red: '#FF4242',
        green: '#11D85D',
        blue: '#155dfc',
      },
      fontSize: {
        'head-bold': ['31.5px', 'auto'],
        'head-semibold': ['25px', 'auto'],
        'title-semibold': ['20px', 'auto'],
        'title-medium': ['20px', 'auto'],
        'title-regular': ['16px', 'auto'],
        'label-light': ['12.8px', 'auto'],
        'body-light': ['12.8px', 'auto'],
        'body-xs-semibold': ['12.8px', 'auto'],
        'body-light-lh': ['12.8px', '20px'],
        'body-semibold': ['16px', 'auto'],
      },
    },
  },
  plugins: [],
};

export default config;
