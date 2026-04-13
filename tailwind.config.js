/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', '-apple-system', 'BlinkMacSystemFont', '"Apple SD Gothic Neo"', '"Malgun Gothic"', 'sans-serif'],
      },
      colors: {
        ios: {
          blue: '#007AFF',
          gray: '#F2F2F7',
          card: '#FFFFFF',
          text: '#1D1D1F',
          secondary: '#6E6E73',
          separator: '#C6C6C8',
        }
      }
    },
  },
  plugins: [],
}
