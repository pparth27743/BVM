"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LocationHub() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".glow-dot", {
                scale: 1.6,
                opacity: 1,
                duration: 1.2,
                yoyo: true,
                repeat: -1,
                stagger: 0.25,
                ease: "power2.inOut",
            });

            gsap.fromTo(
                ".data-stream",
                { strokeDasharray: 1000, strokeDashoffset: 1000 },
                { strokeDashoffset: 0, duration: 3.5, repeat: -1, ease: "linear" }
            );

            gsap.fromTo(
                ".hub-content",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 65%",
                    },
                }
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 border-t transition-colors duration-700"
            style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border-subtle)",
            }}
        >
            {/* Animated SVG data streams */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 1000 500" className="w-[110vw] h-auto max-w-none opacity-60">
                    <defs>
                        <linearGradient id="gradientMap" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--brand-indigo)" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="var(--brand-gold)" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0.6" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path
                        className="data-stream"
                        d="M 500 300 Q 400 150 200 100"
                        fill="none"
                        stroke="url(#gradientMap)"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                    />
                    <path
                        className="data-stream"
                        d="M 500 300 Q 600 100 800 150"
                        fill="none"
                        stroke="url(#gradientMap)"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                    />
                    <path
                        className="data-stream"
                        d="M 500 300 Q 600 400 900 350"
                        fill="none"
                        stroke="url(#gradientMap)"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                    />
                    <path
                        className="data-stream"
                        d="M 500 300 Q 300 400 150 450"
                        fill="none"
                        stroke="url(#gradientMap)"
                        strokeWidth="1.5"
                        filter="url(#glow)"
                    />
                    {/* Hub dot */}
                    <circle cx="500" cy="300" r="8" fill="var(--brand-gold)" className="glow-dot" filter="url(#glow)" />
                    {/* Destination dots */}
                    <circle cx="200" cy="100" r="4" fill="var(--brand-blue)" className="glow-dot" filter="url(#glow)" />
                    <circle cx="800" cy="150" r="4" fill="var(--brand-blue)" className="glow-dot" filter="url(#glow)" />
                    <circle cx="900" cy="350" r="4" fill="var(--brand-blue)" className="glow-dot" filter="url(#glow)" />
                    <circle cx="150" cy="450" r="4" fill="var(--brand-blue)" className="glow-dot" filter="url(#glow)" />
                </svg>
            </div>

            {/* Content */}
            <div className="hub-content relative z-20 max-w-4xl mx-auto px-6 text-center mt-24">
                <span
                    className="text-xs uppercase tracking-[0.45em] mb-6 block font-semibold"
                    style={{ color: "var(--text-muted)" }}
                >
                    The BVM Hub
                </span>
                <h2
                    className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.08]"
                    style={{ color: "var(--foreground)" }}
                >
                    India to the World.
                </h2>
                <div
                    className="w-full max-w-xl mx-auto backdrop-blur-md rounded-2xl p-8 mb-8 border"
                    style={{
                        backgroundColor: "var(--surface-raised)",
                        borderColor: "var(--border-subtle)",
                    }}
                >
                    <p
                        className="text-xl font-light leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        &quot;High-End Engineering, Rooted in Indian Wisdom.&quot;
                    </p>
                </div>
                <p
                    className="font-light text-sm tracking-wide"
                    style={{ color: "var(--text-muted)" }}
                >
                    Exporting the ultimate standard of technical truth.
                </p>
            </div>
        </section>
    );
}
