"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setDone(true);
      },
    });

    // Lock scroll during animation
    document.body.style.overflow = "hidden";

    const letters = nameRef.current?.querySelectorAll(".letter");
    const subtitleWords = subtitleRef.current?.querySelectorAll(".word");

    tl
      // Letters stagger in from below with rotation
      .from(letters!, {
        y: 80,
        opacity: 0,
        rotateX: -90,
        stagger: 0.06,
        duration: 0.7,
        ease: "back.out(1.7)",
      })
      // Horizontal line sweeps across
      .from(lineRef.current!, {
        scaleX: 0,
        duration: 0.6,
        ease: "power3.inOut",
      }, "-=0.2")
      // Subtitle words fade in
      .from(subtitleWords!, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3")
      // Hold for a beat
      .to({}, { duration: 0.4 })
      // Split the overlay open like curtains
      .to(topHalfRef.current!, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      })
      .to(bottomHalfRef.current!, {
        yPercent: 100,
        duration: 0.8,
        ease: "power4.inOut",
      }, "<")
      // Fade out the text simultaneously
      .to(nameRef.current!, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in",
      }, "<")
      .to(lineRef.current!, {
        opacity: 0,
        duration: 0.3,
      }, "<")
      .to(subtitleRef.current!, {
        opacity: 0,
        duration: 0.3,
      }, "<");

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (done) {
    document.body.style.overflow = "";
    return null;
  }

  const name = "Giang Dao";

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] pointer-events-none">
      {/* Top half */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-gray-950"
      />
      {/* Bottom half */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-gray-950"
      />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          ref={nameRef}
          className="text-[clamp(2.5rem,8vw,5rem)] font-bold text-white tracking-tight"
          style={{ perspective: "600px" }}
        >
          {name.split("").map((char, i) => (
            <span
              key={i}
              className="letter inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <div
          ref={lineRef}
          className="w-24 h-[2px] bg-blue-500 mt-4 mb-4 origin-left"
        />
        <div ref={subtitleRef} className="text-gray-400 text-[clamp(0.875rem,2vw,1.125rem)] tracking-widest uppercase">
          {"AI Engineer & Technologist".split(" ").map((word, i) => (
            <span key={i} className="word inline-block mx-1">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
