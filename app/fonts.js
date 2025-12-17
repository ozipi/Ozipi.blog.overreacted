import { Antonio, Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

export const display = Antonio({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal"],
  variable: "--font-display",
});

export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-sans",
});

export const serif = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-serif",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-mono",
});
