"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function DataGlobe({ theme }: { theme: string | undefined }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 3;

  // Generate points on a sphere
  const spherePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 2000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 2000);
      const theta = Math.sqrt(2000 * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      points.push(x, y, z);
    }
    return new Float32Array(points);
  }, []);

  // Center point (representing India roughly on the globe surface)
  const indiaPos = useMemo(() => new THREE.Vector3(
    radius * Math.cos(Math.PI / 4) * Math.sin(Math.PI / 3),
    radius * Math.sin(Math.PI / 8),
    radius * Math.cos(Math.PI / 3)
  ), []);

  // Generate target points for data streams
  const streams = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 15; i++) {
      // Random points on the upper hemisphere mostly
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * 2 * Math.PI;
      const targetPos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );

      // Midpoint to create arc
      const midPos = indiaPos.clone().lerp(targetPos, 0.5).normalize().multiplyScalar(radius + 1.5);
      
      lines.push({ target: targetPos, mid: midPos });
    }
    return lines;
  }, [indiaPos]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const isLight = theme === "light";
  const globeColor = isLight ? "#94a3b8" : "#334155";
  const hubColor = isLight ? "#C5961E" : "#FFD700";
  const destColor = isLight ? "#0F52A8" : "#00ffff";

  return (
    <group ref={groupRef} rotation={[0.2, -Math.PI / 4, 0]}>
      {/* Globe Points */}
      <Points positions={spherePoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={globeColor}
          size={isLight ? 0.03 : 0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isLight ? 0.8 : 0.6}
        />
      </Points>

      {/* India Hub Glow */}
      <mesh position={indiaPos}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={hubColor} />
      </mesh>
      
      <mesh position={indiaPos}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={hubColor} transparent opacity={isLight ? 0.4 : 0.3} />
      </mesh>

      {/* Data Streams */}
      {streams.map((stream, idx) => (
        <QuadraticBezierLine
          key={idx}
          start={indiaPos}
          end={stream.target}
          mid={stream.mid}
          color={hubColor}
          lineWidth={isLight ? 2 : 1.5}
          transparent
          opacity={isLight ? 0.6 : 0.4}
        />
      ))}
      
      {/* Destination Points */}
      {streams.map((stream, idx) => (
        <mesh key={`dest-${idx}`} position={stream.target}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={destColor} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hub() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : "dark";

  return (
    <section className="relative w-full min-h-screen py-24 flex items-center transition-colors duration-700 bg-gradient-to-b from-surface-1 via-[#F4F1ED] to-surface-2 dark:from-[#040008] dark:via-[#05050A] dark:to-[#0A0A0A] overflow-hidden text-foreground dark:text-white">
      
      {/* 3D Visuals */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-90">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={theme === "light" ? 1.5 : 0.5} />
          <DataGlobe theme={theme} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="md:pr-12">
          <span className="text-[10px] md:text-sm uppercase tracking-[0.4em] font-medium opacity-90 dark:opacity-70 mb-4 block"
            style={{ color: "var(--brand-gold)" }}
          >
            The Hub
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8"
            style={{ color: "var(--foreground)" }}
          >
            BVM HUB.
            <br />
            <span className="opacity-80 font-light text-3xl md:text-5xl italic font-sans" style={{ color: "var(--text-secondary)" }}>India to the World</span>
          </h2>
          <p className="text-lg md:text-xl font-light tracking-wide max-w-xl leading-relaxed font-sans"
            style={{ color: "var(--text-secondary)" }}
          >
            Our roots and our reach. From the cradle of ancient mathematics and astronomy, we broadcast next-generation engineering logic globally. High-End Engineering, Rooted in Indian Wisdom.
          </p>
        </div>
        
        {/* Empty div for layout (Globe occupies the rest) */}
        <div className="hidden md:block pointer-events-none" />
      </div>
    </section>
  );
}