/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


// In summary, both configurations achieve the same goal of specifying the paths to files that Tailwind CSS should process to generate CSS utility classes. The choice between using CommonJS or ES6 syntax for exporting depends on the module system used in your project (e.g., Node.js with CommonJS or a modern JavaScript environment with ES6 modules).