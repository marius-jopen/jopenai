/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        fontSize: {
          '4xl': '50px',
          base: '18px',
          sm: '14px',
        },
        borderRadius: {
          'lg': '50px',
        },
      }
    },
    plugins: []
  };