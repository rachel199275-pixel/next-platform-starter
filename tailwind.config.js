// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx,mdx}", "./components/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in': { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'slide-up': { '0%': { transform: 'translateY(20px)' }, '100%': { transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in': 'fade-in .6s ease-out both',
        'slide-up': 'slide-up .6s ease-out both',
      },
    },
  },
  safelist: ['animate-fade-in', 'animate-slide-up'], // 用到什麼就列什麼
  plugins: [],
}
