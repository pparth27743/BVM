"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnotGeometry } from "three";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";

function TandavaFire({ theme }: { theme: string | undefined }) {
  const pointsRef = useRef<import("three").Points>(null);
  
  const positions = useMemo(() => {
    const geo = new TorusKnotGeometry(10, 3, 150, 20);
    const posAttribute = geo.getAttribute('position');
    const vertices = posAttribute.array;
    
    const scattered = new Float32Array(vertices.length);
    for (let i = 0; i < vertices.length; i += 3) {
      scattered[i] = vertices[i] + (Math.random() - 0.5) * 2;
      scattered[i + 1] = vertices[i + 1] + (Math.random() - 0.5) * 2;
      scattered[i + 2] = vertices[i + 2] + (Math.random() - 0.5) * 2;
    }
    return scattered;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.8;
      pointsRef.current.rotation.x += delta * 0.4;
      
      const time = state.clock.elapsedTime;
      const sin = Math.sin(time * 2);
      pointsRef.current.scale.set(1 + sin * 0.1, 1 + sin * 0.1, 1 + sin * 0.1);
    }
  });

  const isLight = theme === "light";

  return (
    <group rotation={[0, 0, 0]} scale={0.15}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#EF4444"
          size={isLight ? 0.08 : 0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isLight ? 0.4 : 0.7}
          blending={isLight ? 1 : 2} // Normal blending for light mode, Additive for dark mode
        />
      </Points>
    </group>
  );
}

export default function Mahesh() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : "dark";

  return (
    <section className="relative w-full min-h-screen py-24 flex items-center transition-colors duration-700 bg-gradient-to-b from-[#D5E4F5] via-[#EBE4F4] to-surface-1 dark:from-[#010912] dark:via-[#0B0215] dark:to-[#040008] text-[var(--brand-mahesh)] dark:text-[#EF4444] overflow-hidden">
      
      {/* Background Ash Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--brand-mahesh)] dark:bg-[#EF4444] blur-[150px] opacity-10 dark:opacity-20 pointer-events-none rounded-full" />
      
      {/* 3D Visuals */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-60 dark:opacity-80">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <TandavaFire theme={theme} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Content aligned left again */}
        <div className="text-foreground dark:text-[#E0E0E0]">
          <span className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium opacity-70 mb-4 block"
            style={{ color: "var(--brand-mahesh)" }}
          >
            Transformation
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8"
            style={{ color: "var(--foreground)" }}
          >
            MAHESH.
            <br />
            <span className="opacity-80 font-light text-3xl md:text-5xl italic font-sans" style={{ color: "var(--brand-mahesh)" }}>The Transformation Forge</span>
          </h2>
          <p className="text-lg md:text-xl font-light tracking-wide max-w-xl leading-relaxed font-sans"
            style={{ color: "var(--text-secondary)" }}
          >
            Evolution requires Dissolution. We remove the barriers to your future, breaking down the obsolete to make space for the new. The eternal cycle completes and begins again.
          </p>
        </div>
        
        {/* Placeholder for symmetry */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
}