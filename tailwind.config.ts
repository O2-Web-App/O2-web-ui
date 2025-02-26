import type { Config } from "tailwindcss";

export default {
  darkMode: ['class', 'class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#559F34",
        "primary-light": {
          DEFAULT: "#559F34",
          10: "rgba(85, 159, 52, 0.1)", // Opacity version
          70: "rgba(85, 159, 52, 0.7)",
        },
        secondary: "#7ECB2A",
        accent: "#0494FC",
        background_color: "#F8FAFC",
        card_color: "#FFFFFF",
        description: "#97A2B0",
      },
      fontSize: {
        heading: ["30px", "36px"],
        title: ["22px", "28px"],
        body: ["18px", "24px"],
        description: ["16px", "20px"],
      },
    },
    images: {
  		domains: [
  			'127.0.0.1'
  		]
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
