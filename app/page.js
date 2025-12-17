"use client";

import Link from "./Link";
import { display, mono, sans } from "./fonts";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MatrixRain />
      <ScanLines />
      <Hero />
      <Projects />
      <BlogSection />
    </div>
  );
}

// Matrix-style falling code background
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01אבגדהוזחטיכלמנסעפצקרשת";
    const fontSize = 20;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ccfc14';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = i % 3 === 0 ? '#ccfc14' : (i % 2 === 0 ? '#00ffff' : '#0f0');
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0" />;
}

// CRT scanlines effect
function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
      <div className="absolute inset-0" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
      }}></div>
    </div>
  );
}

function Hero() {
  const [glitchText, setGlitchText] = useState("OZIPI");
  const [displayedCommand, setDisplayedCommand] = useState("");
  const fullCommand = "whoami && cat /dev/urandom | base64 | head -c 1000";

  useEffect(() => {
    // Glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitched = "OZIPI".split('').map(char =>
          Math.random() > 0.7 ? String.fromCharCode(33 + Math.random() * 94) : char
        ).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText("OZIPI"), 100);
      }
    }, 150);

    // Typing effect
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullCommand.length) {
        setDisplayedCommand(fullCommand.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 py-20">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#ccfc14]/10 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* ASCII Art Border */}
        <div className={`${mono.className} text-[#ccfc14] text-xs mb-8 overflow-hidden`}>
          <pre className="opacity-40">
{`╔═══════════════════════════════════════════════════════════════════════════════╗
║ SYSTEM ONLINE :: NEURAL NETWORK ACTIVE :: SECURITY: COMPROMISED              ║
╚═══════════════════════════════════════════════════════════════════════════════╝`}
          </pre>
        </div>

        {/* Terminal Window */}
        <div className="border-4 border-[#ccfc14] bg-black/80 backdrop-blur-sm shadow-[0_0_50px_rgba(204,252,20,0.5)] mb-12 transform hover:scale-[1.01] transition-transform duration-300">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-[#ccfc14] bg-[#ccfc14]/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]"></div>
              <div className="w-3 h-3 rounded-full bg-[#00ffff] shadow-[0_0_10px_#00ffff]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ccfc14] shadow-[0_0_10px_#ccfc14]"></div>
            </div>
            <div className={`${mono.className} text-xs text-[#ccfc14] ml-4`}>
              root@mainframe:/home/ozipi
            </div>
          </div>

          {/* Terminal Content */}
          <div className={`${mono.className} p-8 space-y-4 text-sm`}>
            <div className="flex items-center gap-2">
              <span className="text-[#00ffff]">root@ozipi</span>
              <span className="text-white">:</span>
              <span className="text-[#ff00ff]">~</span>
              <span className="text-white">$</span>
              <span className="text-[#ccfc14] ml-2">{displayedCommand}</span>
              <span className="animate-pulse">█</span>
            </div>

            <div className="text-white/60 font-light leading-relaxed">
              <span className="text-[#00ffff]">&gt;</span> Initializing neural interface...<br/>
              <span className="text-[#00ffff]">&gt;</span> Loading profile: <span className="text-[#ccfc14]">OZIPI</span><br/>
              <span className="text-[#00ffff]">&gt;</span> Status: <span className="text-[#0f0]">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Main Title with Glitch */}
        <div className="text-center mb-12 relative">
          <h1
            className={`${display.className} text-[12rem] sm:text-[16rem] lg:text-[20rem] font-bold leading-none tracking-tighter select-none`}
            style={{
              color: '#ccfc14',
              textShadow: `
                3px 3px 0 #00ffff,
                -3px -3px 0 #ff00ff,
                0 0 50px #ccfc14,
                0 0 100px #ccfc14
              `,
              transform: 'scaleY(1.2)',
            }}
          >
            {glitchText}
          </h1>

          {/* Glitch layers */}
          <div className="absolute inset-0 mix-blend-screen pointer-events-none">
            <h1
              className={`${display.className} text-[12rem] sm:text-[16rem] lg:text-[20rem] font-bold leading-none tracking-tighter opacity-50`}
              style={{
                color: '#00ffff',
                transform: 'scaleY(1.2) translateX(3px)',
              }}
            >
              {glitchText}
            </h1>
          </div>
        </div>

        {/* Subtitle with rotation */}
        <div className="flex items-center justify-center gap-8 mb-16 flex-wrap">
          <div className={`${sans.className} text-3xl text-white flex items-center gap-4`}>
            <span className="inline-block transform -rotate-3 bg-[#ccfc14] text-black px-6 py-3 font-black shadow-[4px_4px_0_#00ffff]">
            ׳ה
            </span>
            <span className="text-[#ccfc14] text-5xl">×</span>
            <span className="inline-block transform rotate-2 bg-[#00ffff] text-black px-6 py-3 font-black shadow-[4px_4px_0_#ff00ff]">
            אל
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center flex-wrap">
          <a
            href="#projects"
            className={`${mono.className} px-12 py-5 text-lg bg-transparent border-4 border-[#ccfc14] text-[#ccfc14] font-bold relative overflow-hidden group hover:scale-110 transition-transform duration-300`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10">[ PROJECTS ]</span>
            <div className="absolute inset-0 bg-[#ccfc14] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              [ PROJECTS ]
            </span>
          </a>

          <Link
            href="/blog"
            className={`${mono.className} px-12 py-5 text-lg bg-transparent border-4 border-[#00ffff] text-[#00ffff] font-bold relative overflow-hidden group hover:scale-110 transition-transform duration-300`}
          >
            <span className="relative z-10">[ BLOG ]</span>
            <div className="absolute inset-0 bg-[#00ffff] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              [ BLOG ]
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="mb-24 relative">
          <div className={`${mono.className} text-[#ccfc14] text-sm mb-4 opacity-60`}>
            &gt; ls -la ~/projects
          </div>
          <h2 className={`${display.className} text-8xl sm:text-9xl font-bold text-white mb-4`}
            style={{
              textShadow: '0 0 30px #ccfc14, 5px 5px 0 #00ffff',
            }}
          >
            PROJECTS
          </h2>
          <div className="h-2 w-full bg-gradient-to-r from-[#ccfc14] via-[#00ffff] to-[#ff00ff]"></div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="transform lg:-rotate-1">
            <ProjectCard3D
              title="BRAINLOOP"
              subtitle="./neuroscience.sh"
              description="Spaced repetition on steroids. Science-backed learning platform that makes your brain work like a supercomputer. Memory retention through the roof."
              url="https://brainloop.cc/"
              accent="#ccfc14"
              secondaryAccent="#00ffff"
              icon="🧠"
              tags={["NEURAL", "LEARNING", "MEMORY"]}
            />
          </div>

          <div className="transform lg:rotate-1 lg:translate-y-24">
            <ProjectCard3D
              title="BOXS"
              subtitle="./pentesting.sh"
              description="Cloud pentesting playground. Instant hacking environments with zero setup. Record your sessions, pwn all the things, live in the terminal."
              url="https://boxs.sh/"
              accent="#00ffff"
              secondaryAccent="#ff00ff"
              icon="⚡"
              tags={["SECURITY", "TERMINAL", "HACKING"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard3D({ title, subtitle, description, url, accent, secondaryAccent, icon, tags }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowPreview(true);
    }, 600);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShowPreview(false);
    setIsLoading(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 blur-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${accent}, ${secondaryAccent})` }}
      ></div>

      {/* Card */}
      <div
        className="relative bg-black border-4 transition-all duration-300 ease-out overflow-hidden"
        style={{
          borderColor: accent,
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: `
            0 0 0 2px ${secondaryAccent},
            0 0 50px ${accent},
            inset 0 0 50px rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Scanline effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-10"
          style={{
            background: `repeating-linear-gradient(0deg, transparent, transparent 1px, ${accent} 1px, ${accent} 2px)`,
          }}
        ></div>

        {/* Holographic Screenshot Preview */}
        {(showPreview || isLoading) && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/98 transition-opacity duration-300"
          >
            {isLoading ? (
              <div className={`${mono.className} text-center space-y-4 p-8`}>
                <div className="text-[#00ffff] text-sm mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-pulse">█</span>
                    <span>LOADING VISUAL FEED...</span>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-left">
                  <div style={{ color: accent }}>
                    <span className="text-[#0f0]">&gt;</span> Establishing secure connection...
                  </div>
                  <div style={{ color: accent }}>
                    <span className="text-[#0f0]">&gt;</span> Bypassing firewall...
                  </div>
                  <div style={{ color: accent }}>
                    <span className="text-[#0f0]">&gt;</span> Rendering hologram...
                  </div>
                </div>
                <div className="flex justify-center gap-1 mt-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-8"
                      style={{
                        background: accent,
                        animation: `pulse 1s ease-in-out ${i * 0.1}s infinite`,
                        opacity: 0.3,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full p-6">
                {/* Screenshot iframe with smooth effects */}
                <div className="relative w-full h-full" style={{
                  filter: 'contrast(1.15) saturate(1.25)',
                }}>
                  {/* Subtle chromatic aberration layer */}
                  <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
                    <iframe
                      src={url}
                      className="w-full h-full"
                      style={{
                        transform: 'translate(-1px, -1px)',
                        filter: `hue-rotate(180deg)`,
                      }}
                    />
                  </div>

                  {/* Main iframe */}
                  <iframe
                    src={url}
                    className="relative w-full h-full border-2"
                    style={{
                      borderColor: accent,
                      boxShadow: `
                        0 0 30px ${accent},
                        inset 0 0 30px rgba(0,0,0,0.5)
                      `,
                    }}
                  />

                  {/* Holographic scanlines - slower */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        ${accent}11 2px,
                        ${accent}11 4px
                      )`,
                      animation: 'scan 15s linear infinite',
                    }}
                  ></div>

                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4" style={{ borderColor: accent }}></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4" style={{ borderColor: accent }}></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4" style={{ borderColor: accent }}></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4" style={{ borderColor: accent }}></div>

                  {/* Status indicator */}
                  <div className={`${mono.className} absolute top-4 right-4 px-4 py-2 bg-black/90 border-2 text-xs flex items-center gap-2`}
                    style={{ borderColor: accent, color: accent }}
                  >
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }}></div>
                    LIVE FEED
                  </div>
                </div>

                {/* Close hint */}
                <div className={`${mono.className} absolute bottom-8 left-1/2 -translate-x-1/2 text-xs px-4 py-2 bg-black/90 border-2`}
                  style={{ borderColor: secondaryAccent, color: secondaryAccent }}
                >
                  [MOVE MOUSE TO EXIT]
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative p-10 space-y-6">
          {/* Icon with 3D effect */}
          <div className="text-8xl mb-4 transform group-hover:scale-125 transition-transform duration-500"
            style={{
              filter: `drop-shadow(0 0 20px ${accent})`,
              transform: 'translateZ(50px)',
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <h3 className={`${display.className} text-6xl font-bold mb-2`}
            style={{
              color: accent,
              textShadow: `3px 3px 0 ${secondaryAccent}, 0 0 30px ${accent}`,
            }}
          >
            {title}
          </h3>

          {/* Subtitle */}
          <div className={`${mono.className} text-lg`} style={{ color: secondaryAccent }}>
            $ {subtitle}
          </div>

          {/* Description */}
          <p className={`${sans.className} text-white/80 text-lg leading-relaxed`}>
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 pt-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={`${mono.className} text-xs px-4 py-2 font-bold border-2`}
                style={{
                  borderColor: i % 2 === 0 ? accent : secondaryAccent,
                  color: i % 2 === 0 ? accent : secondaryAccent,
                  backgroundColor: 'black',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? accent : secondaryAccent}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Preview hint */}
          <div className={`${mono.className} text-xs text-center py-3 border-2 border-dashed opacity-50`}
            style={{ borderColor: accent, color: accent }}
          >
            [HOVER TO PREVIEW LIVE]
          </div>

          {/* CTA */}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${mono.className} block text-center text-xl font-bold py-6 mt-6 border-4 relative overflow-hidden group/btn`}
            style={{
              borderColor: accent,
              color: accent,
            }}
          >
            <span className="relative z-10">LAUNCH PROJECT →</span>
            <div className="absolute inset-0 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"
              style={{ background: accent }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-20">
              LAUNCH PROJECT →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function BlogSection() {
  return (
    <section className="py-32 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="border-4 border-[#ff00ff] bg-black/90 backdrop-blur-sm p-12 relative overflow-hidden"
          style={{
            boxShadow: '0 0 50px rgba(255,0,255,0.5), inset 0 0 50px rgba(255,0,255,0.1)',
          }}
        >
          {/* Diagonal stripes */}
          <div className="absolute inset-0 opacity-5"
            style={{
              background: 'repeating-linear-gradient(45deg, #ff00ff 0, #ff00ff 10px, transparent 10px, transparent 20px)',
            }}
          ></div>

          <div className="relative z-10">
            <div className={`${mono.className} text-[#00ffff] text-sm mb-6`}>
              $ cat /var/log/thoughts.txt
            </div>

            <h2 className={`${display.className} text-7xl font-bold text-white mb-6`}
              style={{
                textShadow: '0 0 30px #ff00ff, 4px 4px 0 #00ffff',
              }}
            >
              BLOG
            </h2>

            <p className={`${sans.className} text-2xl text-white/70 mb-10 leading-relaxed`}>
              Deep technical writeups. Security research. Learning systems. Brain dumps from the digital trenches.
            </p>

            <Link
              href="/blog"
              className={`${mono.className} inline-block px-12 py-5 text-xl border-4 border-[#ff00ff] text-[#ff00ff] font-bold relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
            >
              <span className="relative z-10">READ THE ARCHIVES →</span>
              <div className="absolute inset-0 bg-[#ff00ff] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                READ THE ARCHIVES →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
