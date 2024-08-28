/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
      },
      boxShadow: {
        shape: "0px 12px 12px rgba(0, 0, 0, 0.15), 0px 6px 6px rgba(0, 0, 0, 0.15), 0px 3px 3px rgba(0, 0, 0, 0.15), 0px 0px 0px 2px rgba(0, 0, 0, 0.15), inset 0px 0px 0px 2px rgba(255, 255, 255, 0.05), inset 0px 2px 0px rgba(255, 255, 255, 0.05)",
        shapeBottom: "  0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.1), inset 0px -1px 0px rgba(255, 255, 255, 0.03);"
      },
      colors: {
        hoverAside: 'rgba(255, 255, 255, 0.055)',
      }
    },
  },
  plugins: [],
}