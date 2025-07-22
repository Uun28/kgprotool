/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        accent: "#014B7C",
      },
      keyframes: {
        'blob-move': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '33%': { transform: 'translateY(-16px) scale(1.04)' },
          '66%': { transform: 'translateY(12px) scale(0.98)' },
        },
      },
      animation: {
        'blob-move': 'blob-move 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
