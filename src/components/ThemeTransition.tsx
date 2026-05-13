"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ThemeTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Sweep up: dark rises from bottom
    const expandTrigger = gsap.to(overlay, {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: {
        trigger: "#theme-transition-zone",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const isDark = self.progress > 0.3;
          document.documentElement.classList.toggle("nav-dark", isDark);
          const timeline = document.getElementById("journey-timeline");
          if (timeline) {
            timeline.setAttribute("data-theme", isDark ? "dark" : "light");
          }
        },
      },
    });

    // Sweep down: dark recedes downward
    const shrinkTrigger = gsap.fromTo(
      overlay,
      { clipPath: "inset(0% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 100% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: "#theme-transition-end",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const isDark = self.progress < 0.7;
            document.documentElement.classList.toggle("nav-dark", isDark);
            const timeline = document.getElementById("journey-timeline");
            if (timeline) {
              timeline.setAttribute(
                "data-theme",
                isDark ? "dark" : "light"
              );
            }
          },
        },
      }
    );

    return () => {
      expandTrigger.scrollTrigger?.kill();
      expandTrigger.kill();
      shrinkTrigger.scrollTrigger?.kill();
      shrinkTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-[#0a0a0a] pointer-events-none z-[1]"
      style={{
        clipPath: "inset(100% 0% 0% 0%)",
        willChange: "clip-path",
      }}
    />
  );
}
