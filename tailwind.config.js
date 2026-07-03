/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#1f1a14',
          900: '#2e261c',
          850: '#3a3024',
          800: '#4a3f32',
          700: '#5c4d3a',
          600: '#6b5344',
          500: '#7a6548',
        },
        primary: {
          50: '#fafafa',
          100: '#f0f0f0',
          200: '#e8e8e8',
          300: '#d4d4d8',
          400: '#c0c0c0',
          500: '#b8b8b8',
          600: '#a1a1aa',
          700: '#8a8a96',
          800: '#71717a',
          900: '#52525b',
          950: '#3f3f46',
        },
        gold: {
          50: '#faf6ef',
          100: '#f2ead8',
          200: '#e5d5b0',
          300: '#d4af37',
          400: '#c5a572',
          500: '#b8956a',
          600: '#a67b4a',
          700: '#8b6914',
          800: '#6b5344',
          900: '#4a3c2e',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        metallic: '0 0 20px -5px rgba(192, 192, 192, 0.15)',
        gold: '0 0 24px -6px rgba(197, 165, 114, 0.25)',
      },
    },
  },
  plugins: [],
}
