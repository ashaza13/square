/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: `1440px`,
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['peer-checked'],
      translate: ['peer-checked'],
    },
  },
}
