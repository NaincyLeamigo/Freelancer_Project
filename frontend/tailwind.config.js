// /** @type {import('tailwindcss').Config} */
// export default {
//    content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        /* Firefox scrollbar */
        '.scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#c1c1c1 #f1f1f1', // thumb color #c1c1c1, track #f1f1f1
        },
        /* Chrome / Webkit scrollbar */
        '.scrollbar::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '.scrollbar::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '10px',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '10px',
        },
        '.scrollbar::-webkit-scrollbar-thumb:hover': {
          background: '#a0a0a0', // darker grey on hover
        },
      });
    },
  ],
};
