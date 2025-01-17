// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['bebas-neue', 'sans-serif'],
        'inter': ['inter', 'sans-serif'],
        'pixdortwo': ['PixdorTwo', 'sans-serif'],
        'depixelbreit': ['DePixelBreit', 'DePixelKlein'],
        'depixelklein': ['DePixelKlein', 'DePixelBreit'],
      },
      animation: {
        marquee: 'marquee 5s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
        loadingImage: 'loading 1s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        loading: {
          '0%': { transform: 'translate(500%, 500%)' },
          '100%': { transform: 'translate(-100%, -80%)' },
      },
      },
      
    },
  },
};