"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";

function CosmicOcean({ theme }: { theme: string | undefined }) {
  const ref = useRef<import("three").Points>(null);

  // Generate random points in a sphere on memo
  const positions = useMemo(() => {
    const p = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const radius = 25 * Math.random();
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      p.set([x, y, z], i * 3);
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  const isLight = theme === "light";

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isLight ? "#9A7A20" : "#FFD700"} /* Stardust tint */
          size={isLight ? 0.08 : 0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isLight ? 0.8 : 0.6}
        />
      </Points>
    </group>
  );
}

export default function Origin() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background text-foreground px-6 transition-colors duration-700 dark:bg-black dark:text-white">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <CosmicOcean theme={mounted ? resolvedTheme : "dark"} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] text-[var(--brand-gold)] dark:text-[#FFD700]">
          The Origin
        </h1>
        <p className="text-lg md:text-2xl font-light tracking-[0.15em] max-w-2xl mx-auto uppercase text-foreground/80 dark:text-white/80">
          Where Ancient Philosophy Meets Frontier Technology.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center z-10 gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-foreground/60 dark:text-white/60">
          Scroll to Enter the Cycle
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-foreground/60 dark:from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
