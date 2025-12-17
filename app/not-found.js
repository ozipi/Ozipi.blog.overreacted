"use client";

import Link from "./Link";
import { display, mono, sans } from "./fonts";
import { useState, useEffect, useRef } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [errorLines, setErrorLines] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Aggressive glitch effect for 404
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const glitched = "404".split('').map(char =>
          Math.random() > 0.5 ? String.fromCharCode(33 + Math.random() * 94) : char
        ).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText("404"), 80);
      }
    }, 200);

    // Generate scrolling error messages
    const errors = [
      "ERR_PAGE_NOT_FOUND :: 0x7F4A9B2C",
      "CRITICAL :: Memory address corrupted",
      "FATAL :: Segmentation fault at 0xDEADBEEF",
      "WARNING :: Page does not exist in database",
      "ERROR :: Unable to resolve path",
      "BREACH DETECTED :: Unauthorized access attempt",
      "SYSTEM :: Rerouting to safe zone",
      "DEBUG :: Stack trace unavailable",
      "ALERT :: 404 Resource not found",
      "KERNEL PANIC :: System halted",
    ];

    let lineIndex = 0;
    const errorInterval = setInterval(() => {
      setErrorLines(prev => {
        const newLines = [...prev, errors[lineIndex % errors.length]];
        if (newLines.length > 15) newLines.shift();
        return newLines;
      });
      lineIndex++;

      // Auto-scroll
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 300);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(errorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Red alert overlay */}
      <div className="fixed inset-0 bg-red-500/5 animate-pulse pointer-events-none" style={{ animationDuration: '2s' }}></div>

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20">
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff0000 2px, #ff0000 4px)',
        }}></div>
      </div>

      {/* Static noise */}
      <div className="fixed inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: 'grain 0.5s steps(10) infinite',
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Warning header */}
        <div className={`${mono.className} text-red-500 text-sm mb-8 animate-pulse`}>
          <div className="border-4 border-red-500 inline-block px-8 py-3 bg-red-500/10">
            ⚠ SYSTEM BREACH DETECTED ⚠
          </div>
        </div>

        {/* ASCII Skull */}
        <div className={`${mono.className} text-[#ccfc14] text-xs mb-8 leading-tight`}>
          <pre className="opacity-60" style={{ animation: 'glitch-text 1s infinite' }}>
{`
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    █░░░░░░░░▀█▀░░░░░░░░█
    █░░▀░░░░░░█░░░░░░▀░░█
    █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
`}
          </pre>
        </div>

        {/* Massive 404 with extreme glitch */}
        <div className="relative mb-12">
          {/* Background layer - red */}
          <div className="absolute inset-0 flex items-center justify-center opacity-50" style={{ transform: 'translate(4px, 4px)' }}>
            <h1
              className={`${display.className} text-[15rem] sm:text-[20rem] lg:text-[25rem] font-bold leading-none tracking-tighter select-none`}
              style={{
                color: '#ff0000',
                textShadow: '0 0 50px #ff0000',
              }}
            >
              {glitchText}
            </h1>
          </div>

          {/* Middle layer - cyan */}
          <div className="absolute inset-0 flex items-center justify-center opacity-50" style={{ transform: 'translate(-4px, -4px)' }}>
            <h1
              className={`${display.className} text-[15rem] sm:text-[20rem] lg:text-[25rem] font-bold leading-none tracking-tighter select-none`}
              style={{
                color: '#00ffff',
                textShadow: '0 0 50px #00ffff',
              }}
            >
              {glitchText}
            </h1>
          </div>

          {/* Main layer - lime */}
          <h1
            className={`${display.className} text-[15rem] sm:text-[20rem] lg:text-[25rem] font-bold leading-none tracking-tighter select-none relative`}
            style={{
              color: '#ccfc14',
              textShadow: `
                0 0 50px #ccfc14,
                0 0 100px #ccfc14,
                5px 5px 0 #ff0000,
                -5px -5px 0 #00ffff
              `,
              transform: 'scaleY(1.2)',
              animation: 'glitch-skew 0.5s infinite',
            }}
          >
            {glitchText}
          </h1>
        </div>

        {/* Error message */}
        <div className="mb-12">
          <h2 className={`${sans.className} text-3xl sm:text-4xl text-white mb-4 font-bold`}>
            PAGE NOT FOUND
          </h2>
          <p className={`${mono.className} text-lg text-red-500 mb-2`}>
            ERROR: The requested resource does not exist in this dimension
          </p>
          <p className={`${sans.className} text-base text-white/60`}>
            The page you're looking for has been corrupted, deleted, or never existed.
          </p>
        </div>

        {/* Terminal error log */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="border-4 border-red-500 bg-black/90 backdrop-blur-sm">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-red-500 bg-red-500/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_#ff0000] animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              </div>
              <div className={`${mono.className} text-xs text-red-500 ml-4`}>
                /var/log/system_errors.log
              </div>
            </div>

            {/* Scrolling errors */}
            <div
              ref={scrollRef}
              className={`${mono.className} p-6 h-48 overflow-hidden text-left text-sm`}
            >
              {errorLines.map((line, i) => (
                <div
                  key={i}
                  className="mb-1 opacity-80"
                  style={{
                    color: line.includes('CRITICAL') || line.includes('FATAL') ? '#ff0000' :
                           line.includes('WARNING') || line.includes('ALERT') ? '#ffaa00' : '#ccfc14',
                    animation: `fade-in-up 0.3s ease-out ${i * 0.05}s both`
                  }}
                >
                  <span className="text-white/40">[{new Date().toLocaleTimeString()}]</span> {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            href="/"
            className={`${mono.className} px-12 py-5 text-lg bg-[#ccfc14] text-black font-bold relative overflow-hidden group hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(204,252,20,0.5)]`}
          >
            <span className="relative z-10">← RETURN TO SAFE ZONE</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              ← RETURN TO SAFE ZONE
            </span>
          </Link>

          <Link
            href="/blog"
            className={`${mono.className} px-12 py-5 text-lg bg-transparent border-4 border-red-500 text-red-500 font-bold relative overflow-hidden group hover:scale-110 transition-transform duration-300`}
          >
            <span className="relative z-10">VIEW BLOG ARCHIVES</span>
            <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              VIEW BLOG ARCHIVES
            </span>
          </Link>
        </div>

        {/* Bottom warning */}
        <div className={`${mono.className} text-xs text-white/40 mt-16`}>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span>SYSTEM STATUS: COMPROMISED</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
