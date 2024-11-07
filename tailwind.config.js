/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9FDF2',
          100: '#F0FAE3',
          200: '#E9F8F1',
          300: '#BAE8D4',
          400: '#99DDBF',
          500: '#6BCDA1',
          600: '#4EC38F',
          700: '#22B473', // Main primary color
          800: '#1C9A61',
          900: '#0C4D30',
        },
        secondary: '#ECBB2E',
        dark: {
          bg: '#242424',
          text: '#000000',
        },
        light: {
          bg: '#F9FDF2',
          text: '#FFFFFF',
        },
        neutral: {
          100: '#FCFEF9',
          200: '#FBFEF6',
          300: '#FAFDF5',
          400: '#E3E6DC',
          500: '#B1B4AC',
          600: '#898B85',
          700: '#696A66',
        },
        'custom-green': '#A2DAB2',
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'kantumruy': ['Kantumruy Pro', 'sans-serif'],
      },
      boxShadow: {
        'custom': '4px 4px 100px 20px rgba(0,0,0,0.06)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
