/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  safelist: ['bg-blue-400', 'bg-green-400', 'bg-red-400'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#001233',
        'coral-red': '#FF595A',
        'beige': '#CAC0B3',
        'less-deep-blue': '#002233',
        'darker': '#000718'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
