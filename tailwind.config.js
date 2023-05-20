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
      'sapling-light-shade': "#FCEDC0",
      'sapling': "#EAD9A6",
      'sapling-dark-shade-1': "#CBB780",
      'sapling-dark-shade-2': "#AD965B",
      'flame-sea-light-shade': "#F97C58",
      'flame-sea': "#E15A38",
      'flame-sea-dark-shade-1': "#C94223",
      'flame-sea-dark-shade-2': "#AC2D13",
    },
    extend: {},
  },
  plugins: [
    FlowBite,
  ],
}

