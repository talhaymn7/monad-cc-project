/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ea004b", // Yemeksepeti Pembesi
          dark: "#b5003a",    // Tıklayınca koyulaşsın
          light: "#ff4d85",   // Açık tonu
        },
      },
    },
  },
  plugins: [],
};