"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import JourneyTimeline, { milestones } from "./JourneyTimeline";

interface MyWorkOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRect: DOMRect | null;
}

// Card padding — larger bottom to leave room for the progress bar
const PAD = { top: 40, right: 64, bottom: 120, left: 64 };
const BORDER_RADIUS = 16;

function getInsetFromRect(rect: DOMRect) {
  return {
    top: rect.top,
    right: window.innerWidth - rect.right,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
  };
}

export default function MyWorkOverlay({
  isOpen,
  onClose,
  triggerRect,
}: MyWorkOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const goToSlideRef = useRef<(index: number) => void>(() => {});

  const handleClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const overlay = overlayRef.current;
    const border = borderRef.current;
    const progress = progressRef.current;
    if (!overlay || !triggerRect) {
      onClose();
      return;
    }

    const btn = getInsetFromRect(triggerRect);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        onClose();
      },
    });

    // Fade out progress bar first
    if (progress) {
      tl.to(progress, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      }, 0);
    }

    // Shrink border back to button
    if (border) {
      tl.to(border, {
        top: `${btn.top}px`,
        right: `${btn.right}px`,
        bottom: `${btn.bottom}px`,
        left: `${btn.left}px`,
        borderRadius: "12px",
        opacity: 1,
        duration: 0.8,
        ease: "power4.inOut",
      }, 0.1);
    }

    // Collapse overlay back to button
    tl.to(overlay, {
      clipPath: `inset(${btn.top}px ${btn.right}px ${btn.bottom}px ${btn.left}px round 12px)`,
      duration: 0.8,
      ease: "power4.inOut",
    }, 0.1);
  }, [onClose, triggerRect]);

  // Open animation
  useEffect(() => {
    if (!isOpen || !triggerRect) return;

    const overlay = overlayRef.current;
    const border = borderRef.current;
    const progress = progressRef.current;
    if (!overlay) return;

    isAnimating.current = true;
    document.body.style.overflow = "hidden";

    const btn = getInsetFromRect(triggerRect);

    // Start as the button
    gsap.set(overlay, {
      clipPath: `inset(${btn.top}px ${btn.right}px ${btn.bottom}px ${btn.left}px round 12px)`,
    });
    if (border) {
      gsap.set(border, {
        top: `${btn.top}px`,
        right: `${btn.right}px`,
        bottom: `${btn.bottom}px`,
        left: `${btn.left}px`,
        borderRadius: "12px",
        opacity: 1,
      });
    }
    if (progress) {
      gsap.set(progress, { opacity: 0, y: 20 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Expand overlay to padded card
    tl.to(overlay, {
      clipPath: `inset(${PAD.top}px ${PAD.right}px ${PAD.bottom}px ${PAD.left}px round ${BORDER_RADIUS}px)`,
      duration: 0.9,
      ease: "power4.inOut",
    }, 0);

    // Expand border to match the card
    if (border) {
      tl.to(border, {
        top: `${PAD.top}px`,
        right: `${PAD.right}px`,
        bottom: `${PAD.bottom}px`,
        left: `${PAD.left}px`,
        borderRadius: `${BORDER_RADIUS}px`,
        duration: 0.9,
        ease: "power4.inOut",
      }, 0);
    }

    // Fade in progress bar after card is mostly open
    if (progress) {
      tl.to(progress, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      }, 0.6);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, triggerRect]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[89] bg-black/60" onClick={handleClose} />

      {/* Border element */}
      <div
        ref={borderRef}
        className="fixed z-[91] pointer-events-none border border-gray-600"
        style={{ top: 0, right: 0, bottom: 0, left: 0, opacity: 0 }}
      />

      {/* Main overlay card */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-[#0a0a0a] overflow-hidden"
        style={{ clipPath: "inset(100% 100% 100% 100% round 16px)" }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="fixed z-[100] w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          style={{ top: PAD.top + 16, right: PAD.right + 16 }}
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content area inside the padded card */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: PAD.top,
            right: PAD.right,
            bottom: PAD.bottom,
            left: PAD.left,
            borderRadius: `${BORDER_RADIUS}px`,
          }}
        >
          <JourneyTimeline
            onSlideChange={setActiveIndex}
            onGoToSlide={(fn) => { goToSlideRef.current = fn; }}
          />
        </div>
      </div>

      {/* Progress bar - OUTSIDE the card, below it */}
      <div
        ref={progressRef}
        className="fixed z-[92] left-1/2 -translate-x-1/2 flex items-center gap-1.5"
        style={{ bottom: 36, opacity: 0 }}
      >
        {milestones.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlideRef.current(i)}
            className={`relative rounded-lg transition-all duration-300 flex items-center justify-center text-[10px] font-medium ${
              i === activeIndex
                ? "w-12 h-8 bg-gray-700/60 border-2 border-gray-400 text-gray-300"
                : "w-10 h-7 bg-gray-800/40 border border-gray-700/50 text-gray-600 hover:border-gray-500 hover:text-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
