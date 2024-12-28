/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        fontSize: {
          base: '20px',
          sm: '16px',
        },
      }
    },
    plugins: []
  };