/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
      'text-green-400',
      'text-red-400',
      'text-purple-400',
      'text-blue-400',
      'border-green-400',
      'border-red-400',
      'border-purple-400',
      'border-blue-400',
      'hover:bg-green-400',
      'hover:bg-red-400',
      'hover:bg-purple-400',
      'hover:bg-blue-400',
      'bg-green-400/10',
      'bg-purple-400/10',
      'bg-red-400/10',
      'bg-blue-400/10',
      'hover:text-slate-800',
  ]
};
