import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alexandria: ["var(--font-alexandria)"],
        arial: ["var(--font-arial)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-desktop": "url(/img/hero-desktop.svg)",
        "hero-mobile": "url(/img/hero-mobile.svg)",
        "group-trip": "url(/img/public-trip.svg)",
        "private-trip": "url(/img/private-trip.svg)",
        "travel-planning": "url(/img/travel-planning.svg)",
        "tripcook-pattern": "url(/img/Tripcooks_Pattern.svg)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          "100": "hsl(var(--primary-100))",
          "200": "hsl(var(--primary-200))",
          "300": "hsl(var(--primary-300))",
          "400": "hsl(var(--primary-400))",
          "500": "hsl(var(--primary-500))",
          "600": "hsl(var(--primary-600))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          "forest-green": "hsl(var(--secondary-forest-green))",
          "irish-green": "hsl(var(--secondary-irish-green))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        neutral: {
          "grey-0": "hsl(var(--neutral-grey-0))",
          "grey-100": "hsl(var(--neutral-grey-100))",
          "grey-200": "hsl(var(--neutral-grey-200))",
          "grey-300": "hsl(var(--neutral-grey-300))",
          "grey-500": "hsl(var(--neutral-grey-500))",
          "300": "hsla(var(--neutral-300))",
          text: "hsla(var(--neutral-text))",
          subtext: "hsla(var(--neutral-subtext))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--secondary-irish-green))",
        },
        warning: {
          "100": "hsl(var(--warning-100))",
          "200": "hsl(var(--warning-200))",
        },
        error: {
          "100": "hsl(var(--error-100))",
          "200": "hsl(var(--error-200))",
        },
        coming_soon_bg: "hsl(var(--coming-soon-bg))",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
