/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ea004b", // Ana Pembe
          dark: "#b5003a",    // Koyu
          light: "#fff0f5",   // Çok açık pembe (Lavender Blush)
        },
      },
      // ✨ ANİMASYON MOTORU ✨
      keyframes: {
        // Havada Süzülme (Float)
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-12deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-6deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0) rotate(12deg)' },
          '50%': { transform: 'translateY(-15px) rotate(6deg)' },
        },
        // Alttan Kayma
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // Patlayarak Gelme
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatReverse 7s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 2s infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pop-in': 'popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulseSlow 3s infinite ease-in-out',
      },
      backgroundImage: {
        // Noktalı Desen
        'dot-pattern': 'radial-gradient(#ea004b 0.7px, transparent 0.7px)',
      },
      backgroundSize: {
        'dot-size': '24px 24px',
      },
      boxShadow: {
        'brand-glow': '0 10px 30px -10px rgba(234, 0, 75, 0.5)',
        'deep': '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};