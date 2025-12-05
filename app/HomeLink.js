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
        className="text-4xl font-bold tracking-tight relative text-[#ccfc14]"
      >
        ozipi.dev
      </span>
      {!isActive && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[--accent-gradient-start] to-[--accent-gradient-end] group-hover:w-full transition-all duration-300 ease-out"></span>
      )}
    </Link>
  );
}
