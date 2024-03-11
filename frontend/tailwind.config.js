/** @type {import('tailwindcss').Config} */
module.exports = {
   purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
   theme: {
      extend: {},
   },
   theme: {
      extend: {
        colors: {
          'dark-green': '#4F6F52',
          'medium-green': '#739072',
          'light-green': '#86A789',
          'very-light-green': '#D2E3C8',
        },
      },
    },
   plugins: [],
};
