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
      },
      boxShadow: {
        "custom-blue": "0px 2px 0.9px 0px rgba(33, 30, 89, 0.29)",
      },
      gridTemplateRows: {
        authWrapper: "1fr minmax(65%, fit-content)",
        authWrapperDesktop: "1fr 36rem 1fr",
      },
      gridTemplateColumns: {
        authWrapper: "1fr 40rem 1fr",
      },
      borderRadius: {
        "custom-authForm": "40px",
      },
    },
  },
  plugins: [],
};
export default config;
