/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      fontFamily: {
        sans: ['Pressura'],
        display: ['Inter'],
        // display: ['Gravity']
        // sans: ['GT Pressura'],
        // display: ['GT Pressura Mono'],
      },
      extend: {
        fontSize: {
          '4xl': '45px',
          base: '19px',
          sm: '15px',
          'base-mobile': '17px',
        },
        borderRadius: {
          'lg': '40px',
        },
      }
    },
    plugins: []
  };