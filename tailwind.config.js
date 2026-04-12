/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
      primary: {
        DEFAULT: "#003D9B",
        container: "#0052CC",
      },
      surface: {
        highest: "#D7E2FF",
        low: "#F1F3FF",
      },
      background: "#F9F9FF",

      slate: {
        900: "#041B3C", // Dark Navy
        600: "#4F5F7B", // Grayish Blue
        200: "#C3C6D6", // Light Steel
      },

      success: "#82FFC9",
      error: "#C41E1E",
      warning: "#FFB300",
    },
     fontSize: {
       'display-lg': ['56px', {
         lineHeight: '56px',
         letterSpacing: '-2.8px',
         fontWeight: '700',
       }],
  
       'headline-lg': ['32px', {
         lineHeight: '40px',
         letterSpacing: '0px',
         fontWeight: '600',
       }],
  
       'title-md': ['18px', {
         lineHeight: '27px',
         letterSpacing: '0px',
         fontWeight: '500',
       }],
  
       'body-md': ['14px', {
         lineHeight: '22.75px',
         letterSpacing: '0px',
         fontWeight: '400',
       }],
  
       'label-sm': ['11px', {
         lineHeight: '16.5px',
         letterSpacing: '1.1px',
         fontWeight: '700',
       }],
     },
    },
  },
  plugins: [],
};
