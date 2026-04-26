"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLParagraphElement>(null);
  const scrollLine = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        shapeRef.current,
        { scale: 0.5, opacity: 0, rotationY: -90 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 2, ease: "expo.out" }
      )
        .fromTo(
          title.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5 },
          "-=1.5"
        )
        .fromTo(
          subtitle.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=1.0"
        )
        .fromTo(
          scrollLine.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        );

      // Slow continuous rotation
      gsap.to(shapeRef.current, {
        rotationX: 360,
        rotationY: 360,
        rotationZ: 180,
        duration: 28,
        repeat: -1,
        ease: "none",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Ambient gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none blur-[120px] opacity-25"
        style={{ background: "var(--brand-gold-glow)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full pointer-events-none blur-[100px] opacity-20"
        style={{ background: "var(--brand-blue-glow)" }}
      />

      {/* 3D Core Shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-24 lg:-mt-36 z-0 pointer-events-none">
        <div
          ref={shapeRef}
          className="relative w-64 h-64 md:w-96 md:h-96"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Gold / Saffron ring */}
          <div
            className="absolute inset-0 border rounded-full blur-sm rotate-[45deg]"
            style={{
              borderColor: "rgba(var(--brand-gold-rgb), 0.35)",
              background: `conic-gradient(from 0deg, transparent 60%, rgba(var(--brand-gold-rgb), 0.12) 100%)`,
            }}
          />
          {/* Blue ring */}
          <div
            className="absolute inset-0 border rounded-full blur-sm rotate-[120deg] scale-110"
            style={{
              borderColor: "rgba(var(--brand-blue-rgb), 0.3)",
              background: `conic-gradient(from 120deg, transparent 60%, rgba(var(--brand-blue-rgb), 0.1) 100%)`,
            }}
          />
          {/* Indigo ring */}
          <div
            className="absolute inset-0 border rounded-full blur-sm rotate-[200deg] scale-90"
            style={{
              borderColor: "rgba(var(--brand-indigo-rgb), 0.3)",
              background: `conic-gradient(from 200deg, transparent 60%, rgba(var(--brand-indigo-rgb), 0.1) 100%)`,
            }}
          />
          {/* Inner glow core */}
          <div className="absolute inset-1/4 rounded-full blur-[40px] mix-blend-screen opacity-30"
            style={{ background: "var(--brand-gold)" }}
          />
        </div>
      </div>

      {/* Text content */}
      <div className="z-10 text-center px-6 max-w-5xl mx-auto mt-44">
        <h1
          ref={title}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-6 opacity-0"
          style={{ color: "var(--foreground)" }}
        >
          The Architects of
          <br className="hidden md:block" /> Equilibrium.
        </h1>
        <p
          ref={subtitle}
          className="text-lg md:text-2xl font-light tracking-wide opacity-0 max-w-3xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Creating the New. Sustaining the Great. Dissolving the Obsolete.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollLine}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Discover BVM</span>
        <div
          className="w-[1px] h-10"
          style={{ background: "linear-gradient(to bottom, var(--text-muted), transparent)" }}
        />
      </div>
    </section>
  );
}
