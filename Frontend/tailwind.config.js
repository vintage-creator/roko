/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        tenPixels: "10px",
        twelvePixels: "12px",
        fourteenPixels: "14px",
        sixteenPixels: "16px",
        eighteenPixels: "18px",
        twentyPixels: "20px",
        twentyTwoPixels: "22px",
        twentyFourPixels: "24px",
        twentySixPixels: "26px",
        twentyEightPixels: "28px",
        thirtyPixels: "30px",
        fortyPixels: "40px",
        fortyEightPixels: "48px",
        fiftyPixels: "50px",
      },
      height: {},
      width: {},
      colors: {
        primaryA: "#cce6e6",
        primaryB: "#aad5d5",
        primaryC: "#80c0c0",
        base: "#008080",
        white: "#ffffff",
        secondary: "#D1833A",
        gray: "#DBDDE1",
      },
      backgroundColor: {
        base: "#008080",
        shades: "#D9D9D9",
      },
      borderColor: {
        base: "#008080",
        shades: "#D9D9D9",
      },
    },
  },
  plugins: [],
};

/*
Fonts: 
100 - Thin
200 - ExtraLight
300 - Light
400 - Regular
500 - Medium
600 - Semibold
700 - Bold
800 - ExtraBold
*/
