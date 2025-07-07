import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'], // Pretendard 설정
      },
      colors: {
        // Point 색상
        'point-1': '#FF5D8F',
        'point-2': '#FF87AB',
        'point-3': '#FFA6C1',

        // Main 색상
        'main-1': '#0F225E',
        'main-2': '#4B7AA5',
        'main-3': '#86D1EB',

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
