/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      grayText: "#828282",
      grayText2: "#4F4F4F",
      whiteLight1: "#F3F4F6",
      mainRedLight: "rgba(214, 54, 38, 0.3)",
      whiteLight3: "#BDBDBD",
      mainRed: "#D63626",
      white: "#FFFFFF",
      lightRed: "#EB5757",
      green: "#066839",
      black: "#181617",
      customgray: "#D2D2D4",
      custompurple: "#C035A2",
      categorycolor: "#5A5B70",
      white: "#FFFFFF",
      fontcolorhow: "#828282",
      cardColor: "#F3F4F6",
      textColorGreen: "#6FCF97",
      overlayColorGreen: "#A0D6B4",
    },


    extend: {},
  },
  plugins: [],
}

