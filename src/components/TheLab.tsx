"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TheLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(portalRef.current, {
        scale: 1.12,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".lab-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-40 flex flex-col items-center justify-center overflow-hidden min-h-[80vh] border-t transition-colors duration-700"
      style={{
        backgroundColor: "var(--surface-1)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Blurred gradient portal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={portalRef}
          className="w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(ellipse, rgba(var(--brand-gold-rgb), 0.18) 0%, rgba(var(--brand-blue-rgb), 0.12) 45%, rgba(var(--brand-indigo-rgb), 0.1) 75%, transparent 100%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="lab-content relative z-10 text-center max-w-2xl px-6">
        {/* Pill label */}
        <div
          className="inline-flex items-center mb-8 px-4 py-1.5 rounded-full border backdrop-blur-md"
          style={{
            borderColor: "var(--border-mid)",
            backgroundColor: "var(--surface-raised)",
          }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.25em] font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            The Future
          </span>
        </div>

        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter mb-6 leading-[1.05]"
          style={{ color: "var(--foreground)" }}
        >
          Building for the
          <br /> Next Billion.
        </h2>

        <p
          className="text-lg md:text-xl font-light mb-12 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          We are engineering the tools that will redefine global technical equilibrium.
        </p>

        {/* Waitlist form */}
        <form
          className="flex flex-col sm:flex-row gap-3 items-center justify-center max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-full px-6 py-3.5 text-sm outline-none transition-all"
            style={{
              backgroundColor: "var(--surface-2)",
              border: "1px solid var(--border-mid)",
              color: "var(--foreground)",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--brand-gold)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-mid)")
            }
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-all hover:opacity-80"
            style={{
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </section>
  );
}
