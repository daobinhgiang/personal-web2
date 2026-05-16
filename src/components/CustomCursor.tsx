"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const isInteractive = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const icon = iconRef.current!;
    const ripple = rippleRef.current!;
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      // Main cursor follows instantly
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
      // Trailing star follows with delay
      gsap.to(icon, {
        x: e.clientX + 20,
        y: e.clientY + 20,
        duration: 1.4,
        ease: "power4.out",
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
      gsap.to(icon, { scale: 0.5, rotation: "+=90", duration: 0.1 });

      gsap.set(ripple, {
        x: e.clientX,
        y: e.clientY,
        scale: 0.3,
        opacity: 0.5,
      });
      gsap.to(ripple, {
        scale: isInteractive.current ? 4 : 2.5,
        opacity: 0,
        duration: isInteractive.current ? 0.6 : 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.15, ease: "back.out(2)" });
      gsap.to(icon, {
        scale: isInteractive.current ? 1.3 : 1,
        duration: 0.2,
        ease: "back.out(2)",
      });
    };

    const handleEnterInteractive = () => {
      isInteractive.current = true;
      gsap.to(cursor, { scale: 1.2, duration: 0.3, ease: "power3.out" });
      gsap.to(icon, {
        scale: 1.3,
        rotation: "+=180",
        borderRadius: "50%",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleLeaveInteractive = () => {
      isInteractive.current = false;
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(icon, {
        scale: 1,
        borderRadius: "0%",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, label[for]"
      );
      interactives.forEach((el) => {
        (el as HTMLElement).style.cursor = "none";
        el.addEventListener("mouseenter", handleEnterInteractive);
        el.addEventListener("mouseleave", handleLeaveInteractive);
      });
      return interactives;
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    let interactives = addInteractiveListeners();

    // Slow spin on the trailing star
    gsap.to(icon, {
      rotation: "+=360",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnterInteractive);
        el.removeEventListener("mouseleave", handleLeaveInteractive);
      });
      interactives = addInteractiveListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactives.forEach((el) => {
        (el as HTMLElement).style.cursor = "";
        el.removeEventListener("mouseenter", handleEnterInteractive);
        el.removeEventListener("mouseleave", handleLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Custom cursor - minimal futuristic pointer */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
      >
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
        >
          <path
            d="M1 0.5L1 17.5L5 13L13 13L1 0.5Z"
            fill="#111"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Trailing star */}
      <div
        ref={iconRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: "14px",
          height: "14px",
          marginLeft: "-7px",
          marginTop: "-7px",
          background: "currentColor",
          color: "white",
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          filter: "drop-shadow(0 0 4px rgba(255,255,255,0.3))",
          mixBlendMode: "difference",
          transition: "clip-path 0.3s ease, border-radius 0.3s ease",
        }}
      />

      {/* Ripple */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 w-[12px] h-[12px] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 border border-gray-400 opacity-0"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
