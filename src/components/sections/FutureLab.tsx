"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

function BlackHole({ theme }: { theme: string | undefined }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const rings = 80;
  const tunnelDepth = 20;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * 0.5;
      
      groupRef.current.children.forEach((child) => {
        child.position.z += delta * 2;
        if (child.position.z > 0) {
          child.position.z -= tunnelDepth;
        }
      });
    }
  });

  const isLight = theme === "light";
  const startColor = isLight ? "#9A7A20" : "#FFD700";
  const endColor = isLight ? "#6B6B80" : "#4B0082";

  return (
    <group ref={groupRef}>
      {Array.from({ length: rings }).map((_, i) => {
        const z = -(i / rings) * tunnelDepth;
        const radius = 3 + (i / rings) * 2;
        const opacity = 1 - (i / rings);
        
        return (
          <mesh key={i} position={[0, 0, z]}>
            <ringGeometry args={[radius, radius + 0.02, 64]} />
            <meshBasicMaterial 
              color={new THREE.Color(startColor).lerp(new THREE.Color(endColor), i / rings)} 
              transparent 
              opacity={opacity * (isLight ? 0.7 : 0.5)} 
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function FutureLab() {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : "dark";

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center transition-colors duration-700 bg-background text-foreground dark:bg-black dark:text-white overflow-hidden py-24">
      
      {/* Deep portal backdrop */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <ambientLight intensity={1} />
          <BlackHole theme={theme} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full">
        <h2 className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium text-foreground/50 dark:text-white/50 mb-6">
          The Horizon
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-4 drop-shadow-[0_0_20px_rgba(20,18,16,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          The Future Lab
        </h1>
        <p className="text-lg md:text-xl font-light tracking-widest uppercase mb-12 text-foreground/60 dark:text-gray-400">
          Step into the Lab.
        </p>

        {/* Glowing Waitlist Form */}
        <form 
          className="relative w-full max-w-md group"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Ambient Glow behind input */}
          <div 
            className={`absolute inset-0 rounded-full blur-[20px] transition-all duration-700 ease-out pointer-events-none ${
              isHovered ? "bg-[var(--brand-gold)] opacity-20 dark:bg-[#FFD700] dark:opacity-30" : "bg-transparent opacity-0"
            }`}
          />
          
          <input
            type="email"
            placeholder="Enter your transmission coordinates"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            required
            className="relative w-full bg-[var(--surface-raised)] dark:bg-black/40 backdrop-blur-md border border-[var(--border-mid)] dark:border-white/20 text-foreground dark:text-white placeholder-foreground/40 dark:placeholder-white/40 px-8 py-5 rounded-full outline-none font-sans text-sm tracking-widest transition-all duration-500 focus:border-[var(--brand-gold)] dark:focus:border-[#FFD700] focus:bg-[var(--surface-1)] dark:focus:bg-black/60 shadow-[0_0_0_1px_transparent] focus:shadow-[0_0_15px_1px_rgba(154,122,32,0.2)] dark:focus:shadow-[0_0_15px_1px_rgba(255,215,0,0.3)] text-center"
          />
        </form>
      </div>
    </section>
  );
}