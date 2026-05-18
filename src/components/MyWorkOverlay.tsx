"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import JourneyTimeline, { milestones, MilestoneCategory } from "./JourneyTimeline";
import CategoryNav from "./CategoryNav";

interface MyWorkOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRect: DOMRect | null;
}

// Card-like overlay with padding from screen edges
function getPad() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    top: Math.min(40, Math.max(20, vh * 0.04)),
    right: Math.min(48, Math.max(24, vw * 0.04)),
    bottom: Math.min(40, Math.max(20, vh * 0.04)),
    left: Math.min(48, Math.max(24, vw * 0.04)),
  };
}
const NAV_HEIGHT = "clamp(56px, 7vh, 76px)";
const PAD_Y = "clamp(20px, 4vh, 40px)";
const PAD_X = "clamp(24px, 4vw, 48px)";
const BORDER_RADIUS = 16;

function getInsetFromRect(rect: DOMRect) {
  return {
    top: rect.top,
    right: window.innerWidth - rect.right,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
  };
}


// Compute the first milestone index for each category
const categoryStartIndices: Record<MilestoneCategory, number> = (() => {
  const result = {} as Record<MilestoneCategory, number>;
  for (let i = 0; i < milestones.length; i++) {
    const cat = milestones[i].category;
    if (!(cat in result)) result[cat] = i;
  }
  return result;
})();

function getCategoryForIndex(index: number): MilestoneCategory {
  return milestones[index].category;
}

export default function MyWorkOverlay({
  isOpen,
  onClose,
  triggerRect,
}: MyWorkOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const [activeCategory, setActiveCategory] = useState<MilestoneCategory>("work");
  const goToSlideRef = useRef<((index: number) => void) | null>(null);
  const isNavScrolling = useRef(false);

  const handleClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const overlay = overlayRef.current;
    const border = borderRef.current;
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

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    const pad = getPad();

    // Expand overlay to padded card
    tl.to(overlay, {
      clipPath: `inset(${pad.top}px ${pad.right}px ${pad.bottom}px ${pad.left}px round ${BORDER_RADIUS}px)`,
      duration: 0.9,
      ease: "power4.inOut",
    }, 0);

    // Expand border to match the card
    if (border) {
      tl.to(border, {
        top: `${pad.top}px`,
        right: `${pad.right}px`,
        bottom: `${pad.bottom}px`,
        left: `${pad.left}px`,
        borderRadius: `${BORDER_RADIUS}px`,
        duration: 0.9,
        ease: "power4.inOut",
      }, 0);
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
      <div className="fixed inset-0 z-[89] bg-black/80" onClick={handleClose} />

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
          style={{ top: `calc(${PAD_Y} + 8px)`, right: `calc(${PAD_X} + 16px)` }}
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

        {/* Category nav at the top */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: `calc(${PAD_Y} + 12px)`,
            left: PAD_X,
            right: PAD_X,
            height: NAV_HEIGHT,
          }}
        >
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryClick={(cat) => {
              setActiveCategory(cat);
              isNavScrolling.current = true;
              const idx = categoryStartIndices[cat];
              goToSlideRef.current?.(idx);
              setTimeout(() => { isNavScrolling.current = false; }, 800);
            }}
          />
        </div>

        {/* Content area below the nav, pushed slightly off-center downward */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: `calc(${PAD_Y} + ${NAV_HEIGHT} + 12px)`,
            right: PAD_X,
            bottom: `calc(${PAD_Y} - 8px)`,
            left: PAD_X,
            borderRadius: `${BORDER_RADIUS}px`,
          }}
        >
          <JourneyTimeline
            onSlideChange={(index) => {
              if (!isNavScrolling.current) {
                setActiveCategory(getCategoryForIndex(index));
              }
            }}
            onGoToSlide={(fn) => { goToSlideRef.current = fn; }}
          />
        </div>
      </div>
    </>
  );
}
