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
  const [submitted, setSubmitted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : "dark";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center transition-colors duration-700 bg-background text-foreground overflow-hidden py-24">
      
      {/* Deep portal backdrop */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <ambientLight intensity={1} />
          <BlackHole theme={theme} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full">
        <span
          className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium mb-6 block"
          style={{ color: "var(--text-muted)" }}
        >
          The Horizon
        </span>
        <h2
          className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-4"
          style={{ color: "var(--foreground)" }}
        >
          The Future Lab
        </h2>
        <p
          className="text-lg md:text-xl font-light tracking-widest uppercase mb-12"
          style={{ color: "var(--text-muted)" }}
        >
          Step into the Lab.
        </p>

        {/* Waitlist Form */}
        {submitted ? (
          <div
            className="w-full max-w-md text-center py-5 rounded-full border backdrop-blur-md transition-all duration-500"
            style={{
              backgroundColor: "var(--surface-raised)",
              borderColor: "var(--brand-gold)",
              color: "var(--brand-gold)",
            }}
          >
            <span className="text-sm font-medium tracking-widest uppercase">
              Transmission Received ✦
            </span>
          </div>
        ) : (
          <form 
            className="relative w-full max-w-md group flex flex-col sm:flex-row gap-3 items-center"
            onSubmit={handleSubmit}
          >
            {/* Ambient Glow behind input */}
            <div 
              className={`absolute inset-0 rounded-full blur-[20px] transition-all duration-700 ease-out pointer-events-none ${
                isHovered ? "opacity-20" : "opacity-0"
              }`}
              style={{ background: isHovered ? "var(--brand-gold)" : "transparent" }}
            />
            
            <input
              type="email"
              placeholder="Enter your transmission coordinates"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              required
              className="relative w-full backdrop-blur-md rounded-full outline-none font-sans text-sm tracking-widest transition-all duration-500 px-8 py-4"
              style={{
                backgroundColor: "var(--surface-raised)",
                border: "1px solid var(--border-mid)",
                color: "var(--foreground)",
              }}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 hover:opacity-80 cursor-pointer"
              style={{
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  );
}