"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function DataSphere() {
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
  }, [nodes]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
      // Slight gentle wobble
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffff" /* Electric Teal */
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export default function Vishnu() {
  return (
    <section className="relative w-full min-h-screen py-24 flex items-center bg-gradient-to-b from-[#1F1c16] via-[#05111F] to-[#010912] text-[#007BFF] overflow-hidden">
      
      {/* 3D Visuals overlay */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={1} />
          <DataSphere />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-right md:-scale-x-100 flex-row-reverse">
        {/* Flip the content over for symmetry or just normal? Layout: left is content or right is content. Let's make content right aligned. */}
        
        {/* Helper layout hack to place content right */}
        <div className="hidden md:block pointer-events-none md:-scale-x-100" />
        
        <div className="md:-scale-x-100 text-[#E0EFFF]">
          <h2 className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium text-[#00ffff] opacity-70 mb-4">
            Preservation
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8 drop-shadow-[0_0_20px_rgba(0,123,255,0.4)]">
            VISHNU.
            <br />
            <span className="opacity-80 font-light text-3xl md:text-5xl italic font-sans text-[#007BFF]">The Preservation Core</span>
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide max-w-lg leading-relaxed text-blue-100 font-sans ml-auto">
            Scaling what works. The maintainer of ultimate equilibrium. We don&apos;t just build. We ensure what exists becomes immortal, fortifying structures against the test of time.
          </p>
        </div>
      </div>
    </section>
  );
}