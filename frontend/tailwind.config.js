/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        baskerville: ['Baskerville', 'serif'],

      },

      backgroundImage:{
       'headphboy': "url('./assets/images/boyheadph.jpg')"
       
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
