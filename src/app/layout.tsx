import { ReactNode } from "react";
import { Cairo, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
});

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
});

/**
 * RootLayout is the top-level layout component for the application.
 * It wraps all child components inside the global application context.
 *
 * @param children - The components that will be rendered within this layout.
 * @returns The rendered children within the root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${cairo.variable} ${ibm.variable}`}>
      <body>{children}</body>
    </html>
  );
}
