/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#63e",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(135deg, #a2d9ff 30%, #63e 60%, #1e3a8a 100%)",
      },
    },
  },
  plugins: [],
};
