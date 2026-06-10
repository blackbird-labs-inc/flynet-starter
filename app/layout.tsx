import "./globals.css";
// The Flynet component theme. Import it once, at the root.
import "@flynetdev/react/styles.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Flynet Starter",
  description: "A minimal app built on the Flynet SDK.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
