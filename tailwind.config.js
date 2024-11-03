/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: ["app.vue","./components/**/*.{html,js,vue}"],
  theme: {
    extend: {
      translate: {
        '2full': '200%',
      },
      maxHeight:{
        '69vh': '69vh'
      }
    },
  },
  plugins: [],
}

