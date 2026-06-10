import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    // Flynet components ship their classes in the published package — include it
    // so Tailwind keeps their styles.
    "./node_modules/@flynetdev/react/dist/**/*.{js,cjs}",
  ],
} satisfies Config;
