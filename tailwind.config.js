/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Permite alternância manual entre os temas
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      spacing: {
        18: '4.5rem',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};
