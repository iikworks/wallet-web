import FlowBite from 'flowbite/plugin.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  safelist: [
    'w-72', 'w-24',
  ],
  theme: {
    colors: {
      'east-bay-light-shade': "#5A5E8C",
      'east-bay': "#4A4D79",
      'east-bay-dark-shade-1': "#3E416B",
      'east-bay-dark-shade-2': "#32345D",
      'wild-blue-light-shade': "#9EA5E1",
      'wild-blue': "#7C83C4",
      'wild-blue-dark-shade-1': "#656ca3",
      'wild-blue-dark-shade-2': "#4D5397",
    },
    extend: {},
  },
  plugins: [
    FlowBite,
  ],
}

