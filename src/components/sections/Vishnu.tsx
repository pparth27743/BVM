"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";

function DataSphere({ theme }: { theme: string | undefined }) {
  const pointsRef = useRef<import("three").Points>(null);
  const nodes = 7500;
  
  // Calculate fibonacci sphere
  const positions = useMemo(() => {
    const array = new Float32Array(nodes * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
    
    for (let i = 0; i < nodes; i++) {
      const y = 1 - (i / (nodes - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      // Scaling down to typical size
      array[i * 3] = x * 2.5;
      array[i * 3 + 1] = y * 2.5;
      array[i * 3 + 2] = z * 2.5;
    }
    
    return array;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
      // Slight gentle wobble
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const isLight = theme === "light";

  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3B82F6"
          size={isLight ? 0.04 : 0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isLight ? 0.7 : 0.8}
        />
      </Points>
    </group>
  );
}

export default function Vishnu() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : "dark";

  return (
    <section className="relative w-full min-h-screen py-24 flex items-center transition-colors duration-700 bg-gradient-to-b from-[#F2EFE8] via-[#E8EFF8] to-[#D5E4F5] dark:from-[#1F1c16] dark:via-[#05111F] dark:to-[#010912] overflow-hidden">
      
      {/* 3D Visuals overlay */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={theme === "light" ? 1.5 : 1} />
          <DataSphere theme={theme} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Empty div for layout — pushes content to the right column on md+ */}
        <div className="hidden md:block pointer-events-none" />
        
        <div className="md:text-right">
          <span
            className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium opacity-70 mb-4 block"
            style={{ color: "var(--brand-vishnu)" }}
          >
            Preservation
          </span>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8"
            style={{ color: "var(--foreground)" }}
          >
            VISHNU.
            <br />
            <span
              className="opacity-80 font-light text-3xl md:text-5xl italic font-sans"
              style={{ color: "var(--brand-vishnu)" }}
            >The Preservation Core</span>
          </h2>
          <p
            className="text-lg md:text-xl font-light tracking-wide max-w-lg leading-relaxed font-sans md:ml-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Scaling what works. The maintainer of ultimate equilibrium. We don&apos;t just build. We ensure what exists becomes immortal, fortifying structures against the test of time.
          </p>
        </div>
      </div>
    </section>
  );
}