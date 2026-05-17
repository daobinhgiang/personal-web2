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
const PAD = { top: 40, right: 48, bottom: 40, left: 48 };
const NAV_WIDTH = "clamp(120px, 10vw, 180px)";
const BORDER_RADIUS = 16;

function getInsetFromRect(rect: DOMRect) {
  return {
    top: rect.top,
    right: window.innerWidth - rect.right,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
  };
}

/** Left inset for clip-path: nav width + 20px gap */
function getLeftInset() {
  const vw = window.innerWidth;
  const navW = Math.min(180, Math.max(120, vw * 0.10));
  return navW + 20;
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

    const leftInset = getLeftInset();

    // Expand overlay to padded card
    tl.to(overlay, {
      clipPath: `inset(${PAD.top}px ${PAD.right}px ${PAD.bottom}px ${leftInset}px round ${BORDER_RADIUS}px)`,
      duration: 0.9,
      ease: "power4.inOut",
    }, 0);

    // Expand border to match the card
    if (border) {
      tl.to(border, {
        top: `${PAD.top}px`,
        right: `${PAD.right}px`,
        bottom: `${PAD.bottom}px`,
        left: `${leftInset}px`,
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
            left: `calc(${NAV_WIDTH} + 20px)`,
            borderRadius: `${BORDER_RADIUS}px`,
          }}
        >
          <JourneyTimeline
            onSlideChange={(index) => setActiveCategory(getCategoryForIndex(index))}
            onGoToSlide={(fn) => { goToSlideRef.current = fn; }}
          />
        </div>
      </div>

      {/* Category nav on the left — solid bg prevents content leaking */}
      <div
        className="fixed z-[92] flex items-center justify-start bg-black/95 rounded-r-lg"
        style={{
          top: PAD.top,
          bottom: PAD.bottom,
          left: 0,
          width: NAV_WIDTH,
          paddingLeft: 16,
        }}
      >
        <CategoryNav
          activeCategory={activeCategory}
          onCategoryClick={(cat) => {
            const idx = categoryStartIndices[cat];
            goToSlideRef.current?.(idx);
          }}
        />
      </div>
    </>
  );
}
