"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export type MilestoneCategory = "work" | "research" | "hackathon" | "leadership" | "sidequest";

export interface Milestone {
  date: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  category: MilestoneCategory;
}

const milestones: Milestone[] = [
  // --- Work Experience ---
  {
    date: "Jun 2025",
    title: "AI Intern at ETC Technology System",
    description:
      "Joined ETC Technology System as an AI intern, gaining hands-on industry experience building AI-powered solutions.",
    category: "work",
  },
  {
    date: "Jan 2026",
    title: "Joined The Residency",
    description:
      "Accepted into The Residency (backed by Sam Altman), a highly selective program with less than 1% acceptance rate.",
    category: "work",
  },
  // --- Research & Certification ---
  {
    date: "Apr 2024",
    title: "AWS Certified Cloud Practitioner",
    description:
      "Earned the AWS Cloud Practitioner certification, building a strong foundation in cloud infrastructure and services.",
    image: "/timeline/aws-cert.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "research",
  },
  {
    date: "Mar 2025",
    title: "Young AI Leader — AI for Good",
    description:
      "Selected as a Young AI Leader for the AI for Good initiative, advocating for responsible and impactful AI development.",
    image: "/timeline/ai-for-good.svg",
    category: "research",
  },
  {
    date: "May 2025",
    title: "AI Depression Research at HPE",
    description:
      "Presented original AI depression research at the HPE competition, exploring the intersection of AI and mental health.",
    category: "research",
  },
  {
    date: "Oct 2025",
    title: "2nd Place — Rice AI in Health Conference",
    description:
      "Won 2nd place at the AI in Health Conference at Rice University, presenting innovative AI applications in healthcare.",
    image: "/timeline/rice-ai-health.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "research",
  },
  // --- Hackathon ---
  {
    date: "Jan 2024",
    title: "First Hackathon Win",
    description:
      "Won my very first hackathon, sparking a passion for building under pressure and collaborating with talented people.",
    image: "/timeline/hackathon-win.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "hackathon",
  },
  {
    date: "Jan 2024",
    title: "Won TAMUHack X",
    description:
      "Competed at TAMUHack X and took home a win, solidifying my love for hackathons and rapid prototyping.",
    image: "/timeline/tamuhack.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "hackathon",
  },
  {
    date: "Mar 2025",
    title: "Harvard Rare Diseases Hackathon",
    description:
      "Received a scholarship to compete at the Harvard Rare Diseases Hackathon, applying AI to real-world healthcare challenges.",
    image: "/timeline/harvard-hackathon.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "hackathon",
  },
  // --- Leadership ---
  {
    date: "Sep 2024",
    title: "Founded Ping Pong @ UH",
    description:
      "Founded the Ping Pong club at UH, bringing together students through friendly competition and community.",
    category: "leadership",
  },
  {
    date: "Jan 2025",
    title: "Switched to CS & Joined CodeCoogs",
    description:
      "Officially switched my major to Computer Science and joined CodeCoogs as Collaboration Director, diving deeper into the tech community.",
    category: "leadership",
  },
  {
    date: "Feb 2025",
    title: "First CodeCoogs Talk",
    description:
      "Gave my first talk as a CodeCoogs officer, sharing knowledge and stepping into a leadership role in the developer community.",
    image: "/timeline/codecoogs-talk.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "leadership",
  },
  {
    date: "May 2025",
    title: "CodeCoogs VP of Operations",
    description:
      "Promoted to VP of Operations at CodeCoogs, scaling the organization and driving new initiatives for the developer community.",
    category: "leadership",
  },
  {
    date: "Oct 2025",
    title: "CodeCoogs President",
    description:
      "Elected as President of CodeCoogs, leading one of UH's largest developer communities and shaping its future direction.",
    category: "leadership",
  },
  // --- Side-quest ---
  {
    date: "Aug 2023",
    title: "Joined University of Houston",
    description:
      "Started my college journey at UH, eager to explore technology and find my path in software engineering.",
    category: "sidequest",
  },
  {
    date: "Feb 2026",
    title: "Met Peter Steinberger in Vienna",
    description:
      "Traveled to Vienna and met Peter Steinberger, connecting with one of the most influential figures in mobile development.",
    image: "/timeline/vienna-peter.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
];

export { milestones };

interface JourneyTimelineProps {
  onSlideChange?: (index: number) => void;
  onGoToSlide?: (fn: (index: number) => void) => void;
}

// Re-export milestones count for progress bar
export const MILESTONES_COUNT = milestones.length;

// Card dimensions — wide landscape cards, ~3.5 visible
const CARD_WIDTH_RATIO = 0.30; // each card ~30% of container width
const CARD_HEIGHT_RATIO = 0.32; // card height ~32% of container height → clearly landscape
const CARD_GAP = 28; // px gap between cards
const CARD_PADDING_LEFT = 20; // px left padding for first card

export default function JourneyTimeline({ onSlideChange, onGoToSlide }: JourneyTimelineProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const currentIndexRef = useRef(0);
  const containerW = useRef(0);
  const containerH = useRef(0);

  // Smooth scroll state
  const targetX = useRef(0);
  const currentX = useRef(0);
  const rafRef = useRef<number | null>(null);

  const isAnimating = useRef(false);

  const LERP = 0.1;
  const SCROLL_SPEED = 1.2; // multiplier for wheel delta

  // Compute card width in px
  const getCardWidth = useCallback(() => containerW.current * CARD_WIDTH_RATIO, []);

  // Total strip width
  const getStripWidth = useCallback(() => {
    const cw = getCardWidth();
    return CARD_PADDING_LEFT + milestones.length * cw + (milestones.length - 1) * CARD_GAP;
  }, [getCardWidth]);

  // Get the x offset to place card at given index near the left of the viewport
  const getScrollX = useCallback((index: number) => {
    const cw = getCardWidth();
    return -(index * (cw + CARD_GAP));
  }, [getCardWidth]);

  // Get the x offset to center a card in the viewport
  const getCenteredX = useCallback((index: number) => {
    const cw = getCardWidth();
    const cardLeft = CARD_PADDING_LEFT + index * (cw + CARD_GAP);
    const cardCenter = cardLeft + cw / 2;
    return -(cardCenter - containerW.current / 2);
  }, [getCardWidth]);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      containerW.current = el.offsetWidth;
      containerH.current = el.offsetHeight;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Apply translateX
  const applyPosition = useCallback((x: number) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.style.transform = `translateX(${x}px)`;
  }, []);

  // Set initial position (start from left)
  useEffect(() => {
    targetX.current = 0;
    currentX.current = 0;
    applyPosition(0);
  }, [applyPosition]);

  // rAF render loop
  useEffect(() => {
    const tick = () => {
      const diff = targetX.current - currentX.current;

      if (Math.abs(diff) > 0.5) {
        currentX.current += diff * LERP;
      } else {
        currentX.current = targetX.current;
      }

      applyPosition(currentX.current);

      // Update active index: find card closest to center
      const cw = getCardWidth();
      if (cw > 0) {
        const centerWorld = -currentX.current + containerW.current / 2;
        const idx = Math.round((centerWorld - CARD_PADDING_LEFT - cw / 2) / (cw + CARD_GAP));
        const clamped = Math.max(0, Math.min(milestones.length - 1, idx));
        if (clamped !== currentIndexRef.current) {
          currentIndexRef.current = clamped;
          setActiveIndex(clamped);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyPosition, getCardWidth]);

  // Clamp target within bounds
  const clampTarget = useCallback((x: number) => {
    const cw = getCardWidth();
    const totalWidth = CARD_PADDING_LEFT + milestones.length * cw + (milestones.length - 1) * CARD_GAP;
    const minX = -(totalWidth - containerW.current);
    return Math.max(minX, Math.min(0, x));
  }, [getCardWidth]);

  // Wheel input — continuous linear scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      // Dismiss focused card on scroll — unfocus and start scrolling in one motion
      if (focusedIndex !== null) {
        setFocusedIndex(null);
      }

      const delta = e.deltaY * SCROLL_SPEED;
      targetX.current = clampTarget(targetX.current - delta);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [focusedIndex, clampTarget]);

  // Navigate to slide (for category nav clicks)
  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      if (index < 0 || index >= milestones.length) return;
      if (focusedIndex !== null) setFocusedIndex(null);

      targetX.current = getScrollX(index);
      currentIndexRef.current = index;
      setActiveIndex(index);
    },
    [focusedIndex, getScrollX]
  );

  // Expose goToSlide to parent
  useEffect(() => {
    onGoToSlide?.(goToSlide);
  }, [goToSlide, onGoToSlide]);

  // Notify parent of slide changes
  useEffect(() => {
    onSlideChange?.(activeIndex);
  }, [activeIndex, onSlideChange]);

  // Handle slide tap to zoom in / out
  const handleSlideTap = useCallback((index: number) => {
    if (focusedIndex === index) {
      setFocusedIndex(null);
    } else {
      setFocusedIndex(index);
      targetX.current = getCenteredX(index);
      currentIndexRef.current = index;
      setActiveIndex(index);
    }
  }, [focusedIndex, getCenteredX]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return;

      if (e.key === "Escape" && focusedIndex !== null) {
        setFocusedIndex(null);
        return;
      }

      if (focusedIndex !== null) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = currentIndexRef.current + 1;
        if (next < milestones.length) goToSlide(next);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = currentIndexRef.current - 1;
        if (prev >= 0) goToSlide(prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToSlide, focusedIndex]);

  const [cardWidthPx, setCardWidthPx] = useState(0);

  // Keep cardWidthPx in sync with container size
  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      setCardWidthPx(el.offsetWidth * CARD_WIDTH_RATIO);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex items-center"
    >
      {/* Horizontal strip of cards */}
      <div
        ref={stripRef}
        className="flex items-center"
        style={{
          gap: `${CARD_GAP}px`,
          paddingLeft: `${CARD_PADDING_LEFT}px`,
          height: "100%",
          willChange: "transform",
        }}
      >
        {milestones.map((milestone, i) => {
          const isFocused = focusedIndex === i;
          return (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-2xl bg-[#141414] border border-gray-800/60 cursor-pointer overflow-hidden"
              style={{
                width: `${cardWidthPx}px`,
                height: `${CARD_HEIGHT_RATIO * 100}%`,
                transform: isFocused ? "scale(1.15)" : "scale(1)",
                transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease",
                zIndex: isFocused ? 10 : 1,
                boxShadow: isFocused ? "0 0 40px rgba(59,130,246,0.15)" : "none",
              }}
              onClick={() => handleSlideTap(i)}
            >
              <div className="h-full flex flex-col justify-center px-5 md:px-6 py-2.5 md:py-3">
                <SlideContent milestone={milestone} isFocused={isFocused} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SlideContent({
  milestone,
  isFocused,
}: {
  milestone: Milestone;
  isFocused: boolean;
}) {
  const title = milestone.link ? (
    <a
      href={milestone.link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-400 hover:underline transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {milestone.title}
    </a>
  ) : (
    milestone.title
  );

  return (
    <div className="flex flex-col justify-center h-full overflow-hidden">
      <div className="mb-3">
        <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/15 px-3 py-1 rounded-md">
          {milestone.date}
        </span>
      </div>

      <h2 className="text-lg md:text-xl font-bold text-gray-100 leading-tight">
        {title}
      </h2>

      {/* Description & image only visible when focused */}
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: isFocused ? "400px" : "0px",
          opacity: isFocused ? 1 : 0,
          marginTop: isFocused ? "12px" : "0px",
        }}
      >
        <p className="text-gray-400 text-sm leading-relaxed mb-3">
          {milestone.description}
        </p>

        {milestone.image && (
          <Image
            src={milestone.image}
            alt={milestone.title}
            width={400}
            height={200}
            unoptimized
            className="rounded-lg shadow-lg max-w-full h-auto max-h-[20vh] object-cover"
          />
        )}
      </div>
    </div>
  );
}
