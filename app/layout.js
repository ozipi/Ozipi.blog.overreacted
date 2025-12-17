import { Analytics } from "@vercel/analytics/react";
import Link from "./Link";
import HomeLink from "./HomeLink";
import { serif, sans, display, mono } from "./fonts";
import "./global.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ProgressBars from "./components/ProgressBars";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://ozipi.dev"),
};

const Activity = Symbol.for("react.activity");

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4771KKXF1Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4771KKXF1Y');
          `}
        </Script>
      </head>
      <body className={`${serif.className} mx-auto max-w-7xl bg-[--bg] px-6 sm:px-8 lg:px-12 py-16 sm:py-20 text-[--text] relative`}>
        <header className="mb-20 flex flex-row items-start justify-between relative z-10">
          <div className="flex-1">
            <HomeLink />
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="https://github.com/ozipi"
              target="_blank"
              className="text-[--text-tertiary] hover:text-[--text-primary] transition-all duration-300 hover:scale-110 transform"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href="https://linkedin.com/in/ozipi"
              target="_blank"
              className="text-[--text-tertiary] hover:text-[--text-primary] transition-all duration-300 hover:scale-110 transform"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              href="https://ozipi.dev"
              target="_blank"
              className="relative group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[--accent-gradient-start] to-[--accent-gradient-end] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
              <img
                alt="Oscar"
                src="/ozipi.jpg"
                className="relative h-10 w-10 rounded-full border-2 border-[--bg-tertiary] group-hover:border-[--accent-primary] transition-all duration-300 object-cover"
              />
            </Link>
          </nav>
        </header>
        <main className="relative z-10">
          <Activity mode="visible">{children}</Activity>
        </main>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
