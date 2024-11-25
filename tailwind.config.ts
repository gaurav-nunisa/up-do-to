import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkBlue : "#3d5a80",
        lightBlue : "#98c1d9",
        blue: "#65A7FC",
        orange : '#ee6c4d',
        gray : '#293241',
        semiWhite : "#D9D9D9"
          // //  //  //

      },
    },
  },
  plugins: [
    daisyui
  ],
} satisfies Config;
