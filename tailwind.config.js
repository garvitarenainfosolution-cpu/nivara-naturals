/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0F1C15',
          800: '#15291E', // Primary Dark Forest Green
          700: '#1D3B2B',
          600: '#2A523D',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E6ECE5',
          200: '#CFDBCF',
          300: '#AEC2AE',
          500: '#7B8E78', // Organic Sage Green
          600: '#637560',
        },
        sand: {
          50: '#FCFAF6', // Ivory Canvas
          100: '#F7F4EE', // Warm Sand / Soft Beige
          200: '#EFECE4', // Neutral Clay Tone
          300: '#DDD8CB',
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A059', // Botanical Gold Accent
          600: '#A9843F',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(21, 41, 30, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(21, 41, 30, 0.15)',
        'soft': '0 4px 20px -2px rgba(21, 41, 30, 0.04)',
      },
      borderRadius: {
        'luxury': '16px',
      }
    },
  },
  plugins: [],
}
