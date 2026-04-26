"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-32 pb-10 border-t overflow-hidden flex flex-col items-center min-h-[50vh] transition-colors duration-700"
      style={{
        backgroundColor: "var(--surface-1)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Subtle radial glow at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 110%, rgba(var(--brand-gold-rgb), 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="z-10 text-center flex flex-col items-center flex-grow justify-center w-full px-6">
        <h2
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter uppercase"
          style={{ color: "var(--foreground)", opacity: 0 }}
        >
          BVMLabs
        </h2>

        <p
          className="mt-6 md:mt-10 font-light tracking-[0.25em] uppercase text-xs md:text-sm max-w-lg mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Based in India. Impacting the World.
        </p>

        <div className="flex gap-8 mt-16">
          {["LinkedIn", "X (Twitter)", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs uppercase tracking-widest font-medium transition-colors duration-300 text-[var(--text-muted)] hover:text-[var(--foreground)]"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div
        className="w-full max-w-7xl mx-auto mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center px-6 gap-4 text-[10px] tracking-wider uppercase"
        style={{
          borderColor: "var(--border-subtle)",
          color: "var(--text-muted)",
        }}
      >
        <p>© {new Date().getFullYear()} BVMLabs. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <a
              key={item}
              href="#"
              className="transition-colors duration-300 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
