import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "input-gradient":
          "linear-gradient(180deg, rgba(214,213,241,1) 0%, rgba(250,246,255,1) 100%)",
      },
      colors: {
        primary: "#2C2A4A",
        secondary: "#FAF6FF",
        tertiary: "#696680",
        quaternary: "#4F518C",
      },
      boxShadow: {
        "custom-blue": "0px 2px 0.9px 0px rgba(33, 30, 89, 0.29)",
        "custom-note": "8px 8px 1px 0px rgba(0, 0, 0, 1)",
      },
      gridTemplateColumns: {
        "custom-dashboard-header": "auto 1fr auto",
        "custom-dashboard-main": "repeat(auto-fit, 1fr)",
      },
      borderRadius: {
        "custom-authForm": "40px",
      },
    },
  },
  plugins: [],
};
export default config;
