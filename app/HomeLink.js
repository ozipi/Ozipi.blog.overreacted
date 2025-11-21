"use client";

import { display } from "./fonts";
import { usePathname } from "next/navigation";
import Link from "./Link";

export default function HomeLink() {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <Link
      href="/"
      className={[
        display.className,
        "inline-block relative group",
        isActive ? "" : "hover:scale-[1.02]",
      ].join(" ")}
    >
      <span
        className="text-4xl font-bold tracking-tight relative"
        style={{
          "--myColor1": isActive ? "var(--text-primary)" : "var(--accent-gradient-start)",
          "--myColor2": isActive ? "var(--text-primary)" : "var(--accent-gradient-end)",
          backgroundImage:
            "linear-gradient(135deg, var(--myColor1), var(--myColor2))",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          transition: "--myColor1 0.3s ease-out, --myColor2 0.3s ease-in-out",
        }}
      >
        ozipi.dev
      </span>
      {!isActive && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[--accent-gradient-start] to-[--accent-gradient-end] group-hover:w-full transition-all duration-300 ease-out"></span>
      )}
    </Link>
  );
}
