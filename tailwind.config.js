/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      container: {
         width: '100%',
         center: true,
         padding: {
            DEFAULT: '1.5rem',
            lg: '2rem',
         },
         screens: {
            '2xl': '1600px',
         },
      },
      fontFamily: {
         sans: ['Open Sans', 'sans-serif'],
      },
      extend: {
         colors: {
            dark: '#07020e',
            blue: {
               100: '#535C91',
               200: '#1B1A55',
            },
            purple: '#9290C3',
         },
         transitionDuration: 300,
         transitionTimingFunction: 'ease-in-out',
      },
   },
   plugins: [],
};
