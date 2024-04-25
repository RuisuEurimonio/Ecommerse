import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'red-mafer': "#f11009",
      'blue-mafer': "#0c1e5e",
      'white-mafer': "#ffffff",
      "black-mafer": "#000000",
      "transparent": "transparent",
      "light-white-mafer": "#FFFFF7",
      "gray": "#d3d3d3 "
    },
  },
  plugins: [],
};
export default config;
