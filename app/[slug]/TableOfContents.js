"use client";

import { useEffect, useState } from "react";
import { sans } from "../fonts";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Extract headings from the page
    const elements = Array.from(document.querySelectorAll("h2, h3")).map(
      (elem) => ({
        id: elem.id,
        text: elem.textContent,
        level: parseInt(elem.tagName.substring(1)),
      })
    );
    setHeadings(elements);

    // Intersection Observer to track which heading is active
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    );

    elements.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`${sans.className} hidden xl:block fixed right-8 top-32 w-64 max-h-[calc(100vh-200px)] overflow-y-auto`}
    >
      <div className="sticky top-0 pb-4 bg-gradient-to-b from-[--bg-primary] to-transparent">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[--text-tertiary] mb-4 flex items-center gap-2">
          <span className="w-4 h-[2px] bg-gradient-to-r from-[--accent-gradient-start] to-[--accent-gradient-end]"></span>
          On this page
        </h2>
      </div>

      <ul className="space-y-1 relative">
        {/* Animated indicator bar */}
        <div
          className="absolute left-0 w-[2px] bg-gradient-to-b from-[--accent-gradient-start] to-[--accent-gradient-end] transition-all duration-300 ease-out"
          style={{
            top: `${
              headings.findIndex((h) => h.id === activeId) * 32 + 4
            }px`,
            height: "24px",
            opacity: activeId ? 1 : 0,
          }}
        />

        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <li
              key={heading.id}
              style={{
                animation: `fade-in-up 0.4s ease-out ${index * 0.05}s both`,
              }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  w-full text-left px-4 py-1 text-sm transition-all duration-300 rounded-md
                  relative overflow-hidden group
                  ${isH3 ? "pl-8" : "pl-4"}
                  ${
                    isActive
                      ? "text-[--text-primary] font-medium"
                      : "text-[--text-tertiary] hover:text-[--text-primary]"
                  }
                `}
              >
                {/* Hover background effect */}
                <span
                  className={`
                  absolute inset-0 bg-gradient-to-r from-[--accent-primary]/5 to-transparent
                  transition-opacity duration-300
                  ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                `}
                />

                {/* Text content */}
                <span className="relative z-10 block truncate">
                  {heading.text}
                </span>

                {/* Bottom border for active state */}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[--accent-primary]/30 to-transparent" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Decorative bottom fade */}
      <div className="sticky bottom-0 h-12 bg-gradient-to-t from-[--bg-primary] to-transparent pointer-events-none" />
    </nav>
  );
}
