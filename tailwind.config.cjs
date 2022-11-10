/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        eUkraine: ["e-Ukraine", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: [
          "26px",
          { lineHeight: "28px", fontWeight: "400", letterSpacing: "-0.02em" },
        ],
        h2: [
          "20px",
          { lineHeight: "24px", fontWeight: "400", letterSpacing: "-0.02em" },
        ],
        h3: [
          "18px",
          { lineHeight: "24px", fontWeight: "400", letterSpacing: "-0.02em" },
        ],
        h4: [
          "16px",
          { lineHeight: "20px", fontWeight: "400", letterSpacing: "-0.02em" },
        ],
        h5: [
          "14px",
          { lineHeight: "20px", fontWeight: "400", letterSpacing: "-0.02em" },
        ],
        h6: [
          "13px",
          { lineHeight: "18px", fontWeight: "400", letterSpacing: "-0.02em" },
        ],
        h7: [
          "13px",
          { lineHeight: "18px", fontWeight: "300", letterSpacing: "-0.02em" },
        ],
        h8: ["11px", { lineHeight: "14px", fontWeight: "400" }],
        h9: [
          "10px",
          { lineHeight: "14px", fontWeight: "400", letterSpacing: "-0.02em" },
        ],
      },
      colors: {
        error: "#FA594F",
      },
    },
  },
  plugins: [],
};
