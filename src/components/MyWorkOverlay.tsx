"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { milestones, CATEGORY_ORDER, MilestoneCategory, Milestone, GitHubIcon, LinkedInIcon } from "./JourneyTimeline";

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

const categoryMeta: Record<MilestoneCategory, { label: string; description: string }> = {
  work: { label: "Work", description: "Professional experience & industry roles" },
  research: { label: "Research", description: "Certifications, publications & academic work" },
  hackathon: { label: "Hackathon", description: "Competitions, wins & rapid prototyping" },
  sidequest: { label: "Side-quest", description: "Organizations, clubs & community building" },
};

const categories = CATEGORY_ORDER.map((key) => ({ key, ...categoryMeta[key] }));

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

  // Track hover during scroll via elementFromPoint
  const [hoveredCategory, setHoveredCategory] = useState<MilestoneCategory | null>(null);
  const mousePos = useRef<{ x: number; y: number } | null>(null);

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

  // Track mouse position over category container
  useEffect(() => {
    if (!isOpen || phase !== "categories") return;
    const container = catContainerRef.current;
    if (!container) return;
    const onMove = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mousePos.current = null; setHoveredCategory(null); };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [isOpen, phase]);

  // Category card scroll: rAF loop + hover detection
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
      // Detect which card is under cursor
      if (mousePos.current) {
        const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
        const card = el?.closest<HTMLElement>("[data-cat-key]");
        const key = (card?.dataset.catKey as MilestoneCategory) || null;
        setHoveredCategory(key);
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
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * SCROLL_SPEED;
      const cw = catContainerW.current * CARD_WIDTH_RATIO;
      const gap = getCardGap();
      const padL = getCardPaddingLeft();
      const padR = padL;
      const totalWidth = padL + categories.length * cw + (categories.length - 1) * gap + padR;
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
      // Loading screen with time for animation
      setTimeout(() => {
        setPhase("content");
      }, 1000);
    }, 200);
  }, []);

  const handleBack = useCallback(() => {
    setPhase("loading");
    setTimeout(() => {
      setPhase("categories");
      setSelectedCategory(null);
    }, 1000);
  }, []);

  if (!isOpen) return null;

  const categoryMilestones = selectedCategory ? getMilestonesForCategory(selectedCategory) : [];

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
          className="fixed z-[100] w-10 h-10 flex items-center justify-center rounded-full transition-all border border-white/40 hover:border-white text-gray-300 hover:text-white bg-transparent"
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

        {/* Back button — fixed like close, only in content phase */}
        {phase === "content" && (
          <button
            onClick={handleBack}
            className="fixed z-[100] w-10 h-10 flex items-center justify-center rounded-full transition-all border border-white/40 hover:border-white text-gray-300 hover:text-white bg-transparent"
            style={{ top: `calc(${PAD_Y} + 8px)`, left: `calc(${PAD_X} + 16px)` }}
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
        )}

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
                  paddingRight: CARD_PADDING_LEFT_CSS,
                  height: "100%",
                  willChange: "transform",
                }}
              >
                {categories.map(({ key, label }, idx) => {
                  const isPressed = pressedCategory === key;
                  const isHovered = hoveredCategory === key && !isPressed;
                  return (
                    <div
                      key={key}
                      data-cat-key={key}
                      className="relative flex-shrink-0 rounded-2xl border overflow-hidden bg-[#141414] fade-in-up cursor-pointer"
                      style={{
                        animationDelay: `${0.1 + idx * 0.15}s`,
                        width: `${catCardWidthPx}px`,
                        height: `${CARD_HEIGHT_RATIO * 100}%`,
                        transform: isPressed ? "scale(0.95)" : "scale(1)",
                        transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease",
                        zIndex: 1,
                        borderColor: isHovered ? "rgba(255,255,255,0.3)" : "rgba(31,41,55,0.6)",
                        boxShadow: isPressed
                          ? "0 0 20px rgba(59,130,246,0.2)"
                          : isHovered
                            ? "0 0 30px rgba(255,255,255,0.08), inset 0 0 30px rgba(255,255,255,0.03)"
                            : "none",
                      }}
                      onClick={() => handleCategoryTap(key)}
                    >
                      {key === "work" && (
                        <Image
                          src="/timeline/work-category.jpg"
                          alt="Work"
                          fill
                          className="object-cover transition-opacity duration-300"
                          style={{ willChange: "opacity", opacity: isHovered ? 0.7 : 0.4 }}
                        />
                      )}
                      {key === "research" && (
                        <Image
                          src="/timeline/research-conference.jpg"
                          alt="Research"
                          fill
                          className="object-cover transition-opacity duration-300"
                          style={{ willChange: "opacity", opacity: isHovered ? 0.7 : 0.4 }}
                        />
                      )}
                      {key === "hackathon" && (
                        <Image
                          src="/timeline/hackathon-rice.jpg"
                          alt="Hackathon"
                          fill
                          className="object-cover transition-opacity duration-300"
                          style={{ willChange: "opacity", opacity: isHovered ? 0.7 : 0.4 }}
                        />
                      )}
                      {key === "sidequest" && (
                        <Image
                          src="/timeline/austria-tv.png"
                          alt="Side-quest"
                          fill
                          className="object-cover transition-opacity duration-300"
                          style={{ willChange: "opacity", opacity: isHovered ? 0.7 : 0.4 }}
                        />
                      )}
                      <div className="relative z-10 h-full flex flex-col justify-start items-start" style={{ padding: "clamp(16px, 2.5vh, 24px) clamp(16px, 2.5vw, 24px)" }}>
                        <h2 className="font-bold leading-tight text-gray-100" style={{ fontSize: "clamp(2.3rem, 4.4vw, 3.2rem)" }}>
                          {label}
                        </h2>
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
            animation: "loadingFadeIn 0.3s ease forwards",
            opacity: 0,
          }}>
            <div className="w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  animation: "loadingBar 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards",
                  width: 0,
                }}
              />
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
            }}
          >
            {/* Milestones laid out vertically */}
            <div className="flex flex-col gap-6" style={{ paddingTop: "calc(clamp(12px, 2vh, 24px) + 48px + 12px)", paddingLeft: "clamp(8px, 1.5vw, 16px)", paddingRight: "clamp(8px, 1.5vw, 16px)", paddingBottom: "clamp(24px, 4vh, 48px)" }}>
              {categoryMilestones.map((milestone, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-800/60 bg-[#141414] p-6 fade-in-up"
                  style={{
                    animationDelay: `${0.1 + i * 0.12}s`,
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold leading-tight text-gray-100" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
                        {milestone.headerLink ? (
                          <a href={milestone.headerLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors">
                            {milestone.title}
                          </a>
                        ) : (
                          milestone.title
                        )}
                      </h2>
                      {milestone.award && (
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-300 bg-amber-400/15 rounded-md text-xs shrink-0" style={{ padding: "3px 10px" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
                            <path d="M5 3h14a1 1 0 011 1v3a5 5 0 01-3.5 4.77A5.001 5.001 0 0113 15.92V19h3a1 1 0 110 2H8a1 1 0 110-2h3v-3.08A5.001 5.001 0 017.5 11.77 5 5 0 014 7V4a1 1 0 011-1zm1 2v2a3 3 0 002.05 2.84A5.02 5.02 0 018 9V5H6zm12 0h-2v4c0 .36-.04.7-.1 1.03A3 3 0 0018 7V5z"/>
                          </svg>
                          {milestone.award}
                        </span>
                      )}
                      {milestone.link && (
                        <a href={milestone.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors shrink-0">
                          {milestone.link.includes("github.com") ? (
                            <GitHubIcon className="w-5 h-5" />
                          ) : milestone.link.includes("linkedin.com") ? (
                            <LinkedInIcon className="w-5 h-5" />
                          ) : null}
                        </a>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap shrink-0">
                      {milestone.date}
                    </span>
                  </div>
                  {milestone.subtitle && (
                    <p className="text-blue-400/80 italic mb-1" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}>
                      {milestone.subtitle}
                    </p>
                  )}
                  {milestone.description && (
                    <p className="text-gray-400 leading-relaxed mt-1" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}>
                      {milestone.description}
                    </p>
                  )}
                  {milestone.bullets && milestone.bullets.length > 0 && (
                    <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                      {milestone.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-blue-400/60 mt-0.5 shrink-0">&#8226;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {milestone.images ? (
                    <div className="mt-4 flex gap-2 w-full" style={{ height: "clamp(150px, 25vh, 300px)" }}>
                      {milestone.images.map((img, i) => (
                        <img key={i} src={img} alt={`${milestone.title} ${i + 1}`} className="rounded-lg shadow-lg h-full min-w-0 flex-1 object-cover" />
                      ))}
                    </div>
                  ) : milestone.image ? (
                    <div className={`mt-4 ${milestone.imageSize === "sm" ? "w-1/4" : "w-1/2"}`}>
                      <img src={milestone.image} alt={milestone.title} className="rounded-lg shadow-lg w-full h-auto object-contain" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </>
  );
}
