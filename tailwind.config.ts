import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    backgroundColor: {
      'lyw': 'var(--color-lyw)',
      'dlyw': 'var(--color-dlyw)',
    },
    textColor: {
      'hyw': 'var(--color-hyw)',
    },
    fill: {
      'hyw': 'var(--colo-hyw)',
    },
    fontFamily: {
      'noto-sans-TC': ['var(--font-noto-sans-TC)'],
      'noto-serif-TC': ['var(--font-noto-serif-TC)'],
      'klee-one': ['var(--font-klee-one)'],
    }
  },
  plugins: [],
} satisfies Config;
