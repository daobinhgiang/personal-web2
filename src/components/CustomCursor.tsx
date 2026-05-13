"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const brackets = bracketsRef.current!;
    const corners = brackets.querySelectorAll(".corner");

    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(brackets, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(corners, { attr: { "data-size": "sm" }, scale: 0.8, duration: 0.1 });
      gsap.to(dot, { scale: 1.5, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(corners, { scale: 1, duration: 0.15 });
      gsap.to(dot, { scale: 1, duration: 0.15 });
    };

    const handleEnterInteractive = () => {
      gsap.to(brackets, {
        width: 48,
        height: 48,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(corners, { borderColor: "rgb(59, 130, 246)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const handleLeaveInteractive = () => {
      gsap.to(brackets, {
        width: 28,
        height: 28,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(corners, { borderColor: "rgb(107, 114, 128)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label[for]");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleEnterInteractive);
        el.addEventListener("mouseleave", handleLeaveInteractive);
      });
      return interactives;
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    let interactives = addInteractiveListeners();

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
        el.removeEventListener("mouseenter", handleEnterInteractive);
        el.removeEventListener("mouseleave", handleLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  const cornerStyle = "absolute w-[8px] h-[8px] border-gray-500";

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[5px] h-[5px] bg-blue-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      {/* Corner brackets */}
      <div
        ref={bracketsRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ width: 28, height: 28 }}
      >
        {/* Top-left */}
        <div className={`corner ${cornerStyle} top-0 left-0 border-t-[1.5px] border-l-[1.5px]`} />
        {/* Top-right */}
        <div className={`corner ${cornerStyle} top-0 right-0 border-t-[1.5px] border-r-[1.5px]`} />
        {/* Bottom-left */}
        <div className={`corner ${cornerStyle} bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]`} />
        {/* Bottom-right */}
        <div className={`corner ${cornerStyle} bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]`} />
      </div>
    </>
  );
}
