import { colors } from './src/utils/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: colors.base,
        primary: colors.primary,
        secondary: colors.secondary,
        
      },
    },
    plugins: [],
  }
}