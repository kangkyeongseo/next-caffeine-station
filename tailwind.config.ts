import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        toast: {
          '0%': { transform: 'translateY(-100px) translateX(-50%)' },
          '30%': { transform: 'translateY(-0px) translateX(-50%)' },
          '70%': { transform: 'translateY(-0px) translateX(-50%)' },
          '100%': { transform: 'translateY(-100px) translateX(-50%)' },
        },
      },
      animation: {
        toast: 'toast 4s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
