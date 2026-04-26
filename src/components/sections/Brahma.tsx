"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, PresentationControls } from "@react-three/drei";
import { useTheme } from "next-themes";

function LotusCore({ theme }: { theme: string | undefined }) {
  const meshRef = useRef<import("three").Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const isLight = theme === "light";

  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 2]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.2}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={2.5}
          attenuationColor="#ffffff"
          color="#F59E0B"
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function Mantras() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.03] flex items-center justify-center overflow-hidden mix-blend-overlay">
      <div className="text-[12rem] font-serif leading-none rotate-[20deg] scale-150 transform transition select-none tracking-[2rem] text-black dark:text-[#F59E0B]">
        ब्रह्मन् सृष्टेः मूलम् 
        <br />
        अहं ब्रह्मास्मि
      </div>
    </div>
  );
}

export default function Brahma() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : "dark";

  return (
    <section className="relative w-full min-h-screen flex items-center py-20 bg-gradient-to-b from-background via-surface-1 to-[#F2EFE8] text-[var(--brand-brahma)] dark:from-black dark:via-[#111] dark:to-[#1F1c16] dark:text-[#F59E0B] transition-colors duration-700 overflow-hidden">
      <Mantras />

      {/* 3D Visuals */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={theme === "light" ? 1.5 : 0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={theme === "light" ? 1 : 2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#F59E0B" />
          <PresentationControls snap global zoom={1.2} polar={[-0.2, 0.2]} azimuth={[-0.2, 0.2]}>
            <LotusCore theme={theme} />
          </PresentationControls>
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <span className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium mb-4 block opacity-70"
            style={{ color: "var(--brand-brahma)" }}
          >
            Creation
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8 drop-shadow-lg"
            style={{ color: "var(--foreground)" }}
          >
            BRAHMA.
            <br />
            <span className="opacity-80 font-light text-3xl md:text-5xl italic" style={{ color: "var(--brand-brahma)" }}>The Incubation Lab</span>
          </h2>
          <p className="text-lg md:text-xl font-light tracking-wide max-w-lg leading-relaxed font-sans"
            style={{ color: "var(--text-secondary)" }}
          >
            Bringing ideas from zero to one. We architect the genesis of frontier technology, transforming ethereal concepts into structural reality. Every great endeavor requires a divine spark.
          </p>
        </div>
        <div className="hidden md:block pointer-events-none" />
      </div>
    </section>
  );
}
