"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const COLUMN_COUNT = 14;

const COLUMNS: { dir: 1 | -1; delay: number; dur: number }[] = [
  { dir: -1, delay: 0.00, dur: 0.55 },
  { dir: -1, delay: 0.02, dur: 0.50 },
  { dir:  1, delay: 0.18, dur: 0.65 },
  { dir: -1, delay: 0.06, dur: 0.40 },
  { dir:  1, delay: 0.30, dur: 0.50 },
  { dir:  1, delay: 0.28, dur: 0.55 },
  { dir: -1, delay: 0.10, dur: 0.70 },
  { dir:  1, delay: 0.03, dur: 0.45 },
  { dir: -1, delay: 0.22, dur: 0.50 },
  { dir:  1, delay: 0.35, dur: 0.60 },
  { dir: -1, delay: 0.08, dur: 0.45 },
  { dir: -1, delay: 0.12, dur: 0.55 },
  { dir:  1, delay: 0.26, dur: 0.40 },
  { dir:  1, delay: 0.05, dur: 0.50 },
];

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    document.body.style.overflow = "hidden";

    const letters = nameRef.current?.querySelectorAll(".letter");
    const subtitleWords = subtitleRef.current?.querySelectorAll(".word");

    gsap.set(nameRef.current!, { visibility: "visible" });
    gsap.set(lineRef.current!, { visibility: "visible" });
    gsap.set(subtitleRef.current!, { visibility: "visible" });

    tl
      .from(letters!, {
        y: 80,
        opacity: 0,
        rotateX: -90,
        stagger: 0.06,
        duration: 0.7,
        ease: "back.out(1.7)",
      })
      .from(lineRef.current!, {
        scaleX: 0,
        duration: 0.6,
        ease: "power3.inOut",
      }, "-=0.2")
      .from(subtitleWords!, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3")
      .to({}, { duration: 0.4 })
      // Fade out text
      .to([nameRef.current!, lineRef.current!, subtitleRef.current!], {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
      })
      .addLabel("scatter");

    // Scatter columns with chaotic independent timing
    columnsRef.current.forEach((col, i) => {
      if (!col) return;
      const { dir, delay, dur } = COLUMNS[i];
      tl.to(col, {
        yPercent: dir > 0 ? -120 : 120,
        duration: dur,
        ease: "power4.inOut",
      }, `scatter+=${delay}`);
    });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (done) return null;

  const name = "Giang Dao";

  return (
    <div ref={overlayRef} className="loading-overlay fixed inset-0 z-[100] pointer-events-none">
      {/* Column strips */}
      <div className="absolute inset-0 flex">
        {COLUMNS.map((_, i) => (
          <div
            key={i}
            ref={(el) => { columnsRef.current[i] = el; }}
            className="bg-gray-950 flex-1 h-full"
          />
        ))}
      </div>

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div
          ref={nameRef}
          className="text-[clamp(2.5rem,8vw,5rem)] font-bold text-white tracking-tight"
          style={{ perspective: "600px", visibility: "hidden" }}
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
          style={{ visibility: "hidden" }}
        />
        <div ref={subtitleRef} className="text-gray-400 text-[clamp(0.875rem,2vw,1.125rem)] tracking-widest uppercase" style={{ visibility: "hidden" }}>
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
