"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BAR_COUNT = 10;

// Each bar's "lead" — higher value = that bar rises faster (finishes sooner)
// Creates an uneven, rhythmic skyline edge between white and dark
const RHYTHM = [0.0, 0.28, 0.08, 0.38, 0.16, 0.42, 0.04, 0.32, 0.12, 0.22];

export default function ThemeTransition() {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tweens: gsap.core.Tween[] = [];
    const triggers: ScrollTrigger[] = [];

    // --- Expand: bars rise from bottom at different speeds ---
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const lead = RHYTHM[i] ?? 0;
      // Bars with more lead finish sooner (end point is lower on screen)
      const endY = Math.round(lead * 80);

      const tween = gsap.to(bar, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: "#theme-transition-zone",
          start: "top bottom",
          end: `top ${endY}%`,
          scrub: true,
        },
      });

      tweens.push(tween);
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    // Nav / theme toggle on expand
    const navExpandTrigger = ScrollTrigger.create({
      trigger: "#theme-transition-zone",
      start: "top bottom",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        const isDark = self.progress > 0.25;
        document.documentElement.classList.toggle("nav-dark", isDark);
        const timeline = document.getElementById("journey-timeline");
        if (timeline) {
          timeline.setAttribute("data-theme", isDark ? "dark" : "light");
        }
      },
    });
    triggers.push(navExpandTrigger);

    // --- Shrink: bars recede downward with reversed rhythm ---
    // Use ScrollTrigger + gsap.set (not fromTo tween): a scrubbed fromTo applies its
    // "from" (full visibility) whenever progress is 0, including before the shrink zone
    // starts — which overwrote the expand tween and left black bars under the nav's
    // backdrop-blur on initial load.
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const lead = RHYTHM[i] ?? 0;
      const startY = Math.round((1 - lead) * 80); // reverse the rhythm

      const shrinkSt = ScrollTrigger.create({
        trigger: "#theme-transition-end",
        start: `top ${100 - startY}%`,
        end: "bottom top",
        scrub: true,
        onUpdate(self) {
          const p = self.progress;
          if (!self.isActive) {
            if (p >= 1) {
              gsap.set(bar, { clipPath: "inset(0% 0% 100% 0%)" });
            }
            return;
          }
          gsap.set(bar, {
            clipPath: `inset(0% 0% ${p * 100}% 0%)`,
          });
        },
        onLeaveBack() {
          gsap.set(bar, { clipPath: "inset(0% 0% 0% 0%)" });
        },
      });
      triggers.push(shrinkSt);
    });

    // Nav / theme toggle on shrink
    const navShrinkTrigger = ScrollTrigger.create({
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
    });
    triggers.push(navShrinkTrigger);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className="fixed top-0 bottom-0 bg-[#0a0a0a] pointer-events-none z-[1]"
          style={{
            left: `${(i / BAR_COUNT) * 100}%`,
            width: `${100 / BAR_COUNT + 0.5}%`,
            clipPath: "inset(100% 0% 0% 0%)",
            willChange: "clip-path",
          }}
        />
      ))}
    </>
  );
}
