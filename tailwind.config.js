/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(date-picker|calendar|date-input).js",
  ],
  theme: {
    extend: {
      gridTemplateColumns : {
        "auto-fit" : 'repeat(auto-fit, minmax(300px, 1fr))'
      },
      colors : {
        "custom-body" : "#F5F5F5"
      },
      screens : {
        'lc' : {'raw' : '(min-height : 500px)'}, 
      },
    },
  },
  plugins: [nextui()],
};
