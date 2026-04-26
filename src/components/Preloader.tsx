"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setComplete(true);
        }
      });

      // Seed pulsing
      tl.to(".hiranyagarbha-seed", {
        scale: 1.5,
        boxShadow: "0px 0px 50px 20px rgba(255,215,0,0.8)",
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      })
      // Shatter/Expand
      .to(".hiranyagarbha-seed", {
        scale: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.in"
      })
      .to(".preloader-bg", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  return (
    <div ref={containerRef} className="preloader-bg fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="hiranyagarbha-seed w-8 h-8 rounded-full bg-[#FFD700] shadow-[0_0_20px_5px_rgba(255,215,0,0.5)]"></div>
    </div>
  );
}
