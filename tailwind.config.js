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
    extend: {},
  },
  plugins: [
    FlowBite,
  ],
}

