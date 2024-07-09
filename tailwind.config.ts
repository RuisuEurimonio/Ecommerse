import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      colors: {
        'principal-color': "#0D0D0D",
        'secondary-color': "#442273",
        'third-color': "#F2F2F2",
        "fourth-color": "#9C5EF2",
        "fifth-color": "#A772F2",
        "sixth-color": "#B678F4"
      },
    }
  },
  plugins: [],
};
export default config;
