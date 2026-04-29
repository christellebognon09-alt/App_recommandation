/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00685f",
        "primary-container": "#008378",
        "on-primary": "#ffffff",
        surface: "#f7f9fb",
        "on-surface": "#191c1e",
        "on-surface-variant": "#3d4947",
        outline: "#6d7a77",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
      },
      fontFamily: {
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
}