module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  purge: [],

  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "white": "#fff",
        "black": "#000",
        "l-gray": "#ccd6f6",
        "d-gray": "#1C1E1F",
        "c-black": "#181818",
        "l-blue": "#F4F5F8"
      },
      
      backgroundImage: {
        "banner": "url('../src/images/chessBanner.jpeg')",
      },

      minHeight: {
        '15': '15rem',
        
      },

      height: {
        "120":"30rem",
        "128": "32rem",
        "144": "36rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
