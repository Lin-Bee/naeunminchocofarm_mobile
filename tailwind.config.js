/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        thin: ['PaperlogyThin'],
        extralight: ['PaperlogyExtraLight'],
        light: ['PaperlogyLight'],
        regular: ['PaperlogyRegular'],
        medium: ['PaperlogyMedium'],
        semibold: ['PaperlogySemiBold'],
        bold: ['PaperlogyBold'],
        extrabold: ['PaperlogyExtraBold'],
        black: ['PaperlogyBlack'],
      },
    },
  },
  plugins: [],
};
