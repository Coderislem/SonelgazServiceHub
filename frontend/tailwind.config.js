/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
   
  ],
  daisyui: {
    themes: [{
      mytheme: {
      
"primary": "#3B82F6",
      
"secondary": "#f59e0b",
      
"accent": "#bb0000",
      
"neutral": "#e5e7eb",
      
"base-100": "#fee2e2",
      
"info": "#00c5ff",
      
"success": "#00e08a",
      
"warning": "#e00000",
      
"error": "#ff4a6f",
"chek" : "#01A701",
"inputstyle": "#eee",

      },
    },],
  },
}

