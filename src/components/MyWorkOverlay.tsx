"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { milestones, MilestoneCategory, Milestone } from "./JourneyTimeline";

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

type Phase = "categories" | "loading" | "content";

const categories: { key: MilestoneCategory; label: string; description: string }[] = [
  { key: "work", label: "Work", description: "Professional experience & industry roles" },
  { key: "research", label: "Research", description: "Certifications, publications & academic work" },
  { key: "hackathon", label: "Hackathon", description: "Competitions, wins & rapid prototyping" },
  { key: "leadership", label: "Leadership", description: "Organizations, clubs & community building" },
  { key: "sidequest", label: "Side-quest", description: "Adventures, travel & unexpected journeys" },
];

function getMilestonesForCategory(cat: MilestoneCategory): Milestone[] {
  return milestones.filter((m) => m.category === cat);
}

// Card dimensions matching JourneyTimeline
const CARD_WIDTH_RATIO = 0.48;
const CARD_HEIGHT_RATIO = 0.46;
const CARD_GAP_CSS = "clamp(16px, 2vw, 28px)";
const CARD_PADDING_LEFT_CSS = "clamp(24px, 4vw, 48px)";

function getCardGap() {
  return Math.min(28, Math.max(16, window.innerWidth * 0.02));
}
function getCardPaddingLeft() {
  return Math.min(48, Math.max(24, window.innerWidth * 0.04));
}

export default function MyWorkOverlay({
  isOpen,
  onClose,
  triggerRect,
}: MyWorkOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const [phase, setPhase] = useState<Phase>("categories");
  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory | null>(null);
  const [pressedCategory, setPressedCategory] = useState<MilestoneCategory | null>(null);

  // Category card horizontal scroll refs
  const catContainerRef = useRef<HTMLDivElement>(null);
  const catStripRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const catRafRef = useRef<number | null>(null);
  const catContainerW = useRef(0);
  const [catCardWidthPx, setCatCardWidthPx] = useState(0);

  const LERP = 0.1;
  const SCROLL_SPEED = 1.2;

  // Reset state when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setPhase("categories");
      setSelectedCategory(null);
      setPressedCategory(null);
      targetX.current = 0;
      currentX.current = 0;
    }
  }, [isOpen]);

  // Category card scroll: measure container
  useEffect(() => {
    if (!isOpen || phase !== "categories") return;
    const update = () => {
      const el = catContainerRef.current;
      if (!el) return;
      catContainerW.current = el.offsetWidth;
      setCatCardWidthPx(el.offsetWidth * CARD_WIDTH_RATIO);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isOpen, phase]);

  // Category card scroll: rAF loop
  useEffect(() => {
    if (!isOpen || phase !== "categories") return;
    const tick = () => {
      const diff = targetX.current - currentX.current;
      if (Math.abs(diff) > 0.5) {
        currentX.current += diff * LERP;
      } else {
        currentX.current = targetX.current;
      }
      const strip = catStripRef.current;
      if (strip) {
        strip.style.transform = `translateX(${currentX.current}px)`;
      }
      catRafRef.current = requestAnimationFrame(tick);
    };
    catRafRef.current = requestAnimationFrame(tick);
    return () => {
      if (catRafRef.current) cancelAnimationFrame(catRafRef.current);
    };
  }, [isOpen, phase]);

  // Category card scroll: wheel handler
  useEffect(() => {
    if (!isOpen || phase !== "categories") return;
    const container = catContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * SCROLL_SPEED;
      const cw = catContainerW.current * CARD_WIDTH_RATIO;
      const gap = getCardGap();
      const padL = getCardPaddingLeft();
      const totalWidth = padL + categories.length * cw + (categories.length - 1) * gap;
      const minX = -(totalWidth - catContainerW.current);
      targetX.current = Math.max(minX, Math.min(0, targetX.current - delta));
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [isOpen, phase]);

  const handleClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const overlay = overlayRef.current;
    const border = borderRef.current;

    if (!overlay || !triggerRect) {
      isAnimating.current = false;
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

    tl.to(overlay, {
      clipPath: `inset(${btn.top}px ${btn.right}px ${btn.bottom}px ${btn.left}px round 12px)`,
      duration: 0.8,
      ease: "power4.inOut",
    }, 0.1);
  }, [onClose, triggerRect]);

  // Open animation
  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const border = borderRef.current;
    if (!overlay) return;

    document.body.style.overflow = "hidden";

    if (!triggerRect) return;

    isAnimating.current = true;

    const btn = getInsetFromRect(triggerRect);

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

    tl.to(overlay, {
      clipPath: `inset(${pad.top}px ${pad.right}px ${pad.bottom}px ${pad.left}px round ${BORDER_RADIUS}px)`,
      duration: 0.9,
      ease: "power4.inOut",
    }, 0);

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
      if (e.key === "Escape") {
        if (phase === "content" || phase === "loading") {
          handleBack();
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose, phase]);

  const handleCategoryTap = useCallback((cat: MilestoneCategory) => {
    setPressedCategory(cat);
    // Press animation then transition
    setTimeout(() => {
      setPressedCategory(null);
      setSelectedCategory(cat);
      setPhase("loading");
      // Brief loading screen
      setTimeout(() => {
        setPhase("content");
      }, 600);
    }, 200);
  }, []);

  const handleBack = useCallback(() => {
    setPhase("categories");
    setSelectedCategory(null);
    // Reset scroll position
    targetX.current = 0;
    currentX.current = 0;
  }, []);

  if (!isOpen) return null;

  const categoryMilestones = selectedCategory ? getMilestonesForCategory(selectedCategory) : [];
  const categoryLabel = selectedCategory ? categories.find(c => c.key === selectedCategory)?.label : "";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[89] bg-black/80"
        onClick={handleClose}
      />

      {/* Border element */}
      <div
        ref={borderRef}
        className="fixed z-[91] pointer-events-none border border-gray-600"
        style={{ top: 0, right: 0, bottom: 0, left: 0, opacity: 0 }}
      />

      {/* Main overlay card */}
      <div
        ref={overlayRef}
        className="fixed inset-0 overflow-hidden bg-[#0a0a0a]"
        style={{ clipPath: "inset(100% 100% 100% 100% round 16px)", zIndex: 90 }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="fixed z-[100] w-10 h-10 flex items-center justify-center rounded-full transition-colors bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white"
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

        {/* ===== PHASE: CATEGORIES ===== */}
        {phase === "categories" && (
          <div className="absolute inset-0 flex items-center" style={{
            top: PAD_Y,
            right: PAD_X,
            bottom: PAD_Y,
            left: PAD_X,
          }}>
            <div
              ref={catContainerRef}
              className="relative w-full h-full overflow-hidden flex items-center"
            >
              <div
                ref={catStripRef}
                className="flex items-center"
                style={{
                  gap: CARD_GAP_CSS,
                  paddingLeft: CARD_PADDING_LEFT_CSS,
                  height: "100%",
                  willChange: "transform",
                }}
              >
                {categories.map(({ key, label, description }) => {
                  const isPressed = pressedCategory === key;
                  const catMilestones = getMilestonesForCategory(key);
                  return (
                    <div
                      key={key}
                      className="relative flex-shrink-0 rounded-2xl border overflow-hidden bg-[#141414] border-gray-800/60"
                      style={{
                        width: `${catCardWidthPx}px`,
                        height: `${CARD_HEIGHT_RATIO * 100}%`,
                        transform: isPressed ? "scale(0.95)" : "scale(1)",
                        transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease",
                        zIndex: 1,
                        boxShadow: isPressed ? "0 0 20px rgba(59,130,246,0.2)" : "none",
                      }}
                      onClick={() => handleCategoryTap(key)}
                    >
                      <div className="h-full flex flex-col justify-center" style={{ padding: "clamp(10px, 1.5vh, 12px) clamp(16px, 2.5vw, 24px)" }}>
                        <div style={{ marginBottom: "clamp(8px, 1vh, 12px)" }}>
                          <span
                            className="inline-block font-semibold text-blue-400 bg-blue-500/15 rounded-md"
                            style={{ fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)", padding: "clamp(6px, 1vh, 12px) clamp(20px, 2.4vw, 28px)" }}
                          >
                            {catMilestones.length} {catMilestones.length === 1 ? "milestone" : "milestones"}
                          </span>
                        </div>
                        <h2 className="font-bold leading-tight text-gray-100" style={{ fontSize: "clamp(2.3rem, 4.4vw, 3.2rem)" }}>
                          {label}
                        </h2>
                        <p className="text-gray-400 leading-relaxed mt-2" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)" }}>
                          {description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== PHASE: LOADING ===== */}
        {phase === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center" style={{
            top: PAD_Y,
            right: PAD_X,
            bottom: PAD_Y,
            left: PAD_X,
          }}>
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}>
                Loading {categoryLabel}...
              </p>
            </div>
          </div>
        )}

        {/* ===== PHASE: CONTENT ===== */}
        {phase === "content" && selectedCategory && (
          <div
            className="absolute overflow-y-auto"
            style={{
              top: PAD_Y,
              right: PAD_X,
              bottom: PAD_Y,
              left: PAD_X,
              animation: "fadeInUp 0.4s ease-out",
            }}
          >
            {/* Header with back button */}
            <div className="flex items-center gap-4 mb-8" style={{ paddingTop: "clamp(12px, 2vh, 24px)", paddingLeft: "clamp(8px, 1.5vw, 16px)" }}>
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
              <h1 className="font-bold text-white" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
                {categoryLabel}
              </h1>
            </div>

            {/* Milestones laid out vertically */}
            <div className="flex flex-col gap-6" style={{ paddingLeft: "clamp(8px, 1.5vw, 16px)", paddingRight: "clamp(8px, 1.5vw, 16px)", paddingBottom: "clamp(24px, 4vh, 48px)" }}>
              {categoryMilestones.map((milestone, i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-[#141414] border-gray-800/60"
                  style={{
                    padding: "clamp(16px, 2.5vh, 28px) clamp(20px, 3vw, 32px)",
                    animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both`,
                  }}
                >
                  <div style={{ marginBottom: "clamp(8px, 1vh, 12px)" }}>
                    <span
                      className="inline-block font-semibold text-blue-400 bg-blue-500/15 rounded-md"
                      style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", padding: "clamp(4px, 0.8vh, 8px) clamp(14px, 2vw, 22px)" }}
                    >
                      {milestone.date}
                    </span>
                  </div>
                  <h2 className="font-bold leading-tight text-gray-100" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}>
                    {milestone.link ? (
                      <a
                        href={milestone.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 hover:underline transition-colors"
                      >
                        {milestone.title}
                      </a>
                    ) : (
                      milestone.title
                    )}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mt-2" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)" }}>
                    {milestone.description}
                  </p>
                  {milestone.image && (
                    <div className="mt-4">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        width={400}
                        height={200}
                        unoptimized
                        className="rounded-lg shadow-lg max-w-full h-auto max-h-[25vh] object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </>
  );
}
