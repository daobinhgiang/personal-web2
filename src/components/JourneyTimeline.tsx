"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export type MilestoneCategory = "work" | "research" | "hackathon" | "sidequest";

export interface Milestone {
  date: string;
  title: string;
  description: string;
  company?: string;
  position?: string;
  bullets?: string[];
  image?: string;
  link?: string;
  category: MilestoneCategory;
}

const milestones: Milestone[] = [
  // --- Work Experience (latest first) ---
  {
    date: "April 2026 — Present",
    title: "Chief AI Officer at GNL VINA",
    description:
      "Digitalized company operations, built GNL VINA's system with NextJS, TypeScript and Neon (Postgres) on Railway. Standardized 5+ processes and benchmarked manufacturing ability for production planning and resource allocation for a $4M PO.",
    company: "GNL VINA., JSC",
    position: "Chief AI Officer",
    bullets: [
      "Digitalized company operation, built GNL VINA's System with NextJS, Typescript and Neon (Postgres); Railway hosting",
      "Standardized 5+ processes and benchmarking GNL's manufacturing ability at each step, therefore estimating manufacturing outputs for production planning and resources allocation for $4 millions PO",
    ],
    image: "/timeline/gnl-vina.jpg",
    category: "work",
  },
  {
    date: "August 2025 — April 2026",
    title: "Co-Founded Kier Therapeutics",
    description:
      "Accepted to The Residency (backed by Sam Altman) as one of 6 out of 600 startups. Built 4 versions of Nurtra with Flutter, SwiftUI, Firebase, Mixpanel & Superwall. Gathered feedback from 600+ users and managed a 70+ member community.",
    company: "Kier Therapeutics, Inc.",
    position: "Co-Founder",
    bullets: [
      "Accepted to The Residency (backed by Sam Altman — CEO of OpenAI, as the advisor) as one of the 6 out of 600 startups",
      "Lead product development, built 4 versions of Nurtra with Flutter & SwiftUI, Firebase, Mixpanel and Superwall",
      "Gathered feedback from 600+ users and manage 70+ members community for insights in product/distribution initiatives",
      "Invited to speak at AI Tinkerers regarding our AI in Healthcare approach and Austria's National TV about Kier's mission",
      "Mentored by clinical advisors from Stanford & The Alliance for Eating Disorders about psychotherapy best practices",
    ],
    image: "/timeline/kier-team.jpg",
    category: "work",
  },
  {
    date: "May 2025 — August 2025",
    title: "AI Engineer Intern at ETC Technology System",
    description:
      "Developed a face tracking/recognition system for 25,000+ employees using YOLOv11 and Kalman filter, achieved 92% accuracy with 350ms latency. Built a RAG pipeline with Pinecone, MedEmbed-large-v0.1, and Qwen3-8B. Built an Android app with Kotlin improving data acquisition speed by 40%.",
    company: "ETC Technology System., JSC",
    position: "AI Engineer Intern",
    bullets: [
      "Developed a face tracking/recognition system for 25,000+ employees using YOLOv11 and Kalman filter, achieved 92% accuracy with 350ms latency; deployed with Docker, Triton serving and JMeter stress testing",
      "Built a RAG pipeline with Pinecone, MedEmbed-large-v0.1 for embeddings, and Qwen3-8B for medical questions",
      "Built an Android app with Kotlin for collecting data on edge cases, improving acquiring speed by 40% with 99% accuracy",
    ],
    image: "/timeline/etc-team.jpg",
    category: "work",
  },
  // --- Research & Certification (latest first) ---
  {
    date: "September 2025 — Present",
    title: "Biomedical Researcher — University of Houston",
    description:
      "Researched the DSPy framework and developed algorithms & models to improve cell tracking with 10+ biomedical datasets at UH's Cullen College of Engineering.",
    company: "Cullen College of Engineering | University of Houston",
    position: "Biomedical Researcher",
    bullets: [
      "Researched DSPy framework & develop algorithms & models to improve cells tracking with 10+ biomedical dataset",
    ],
    category: "research",
  },
  {
    date: "August 2025 — Present",
    title: "AI Researcher — Rice University",
    description:
      "Joined the Computational Wellbeing Group at Rice ECE. Designed 50+ prompts to evaluate proprietary & open-source LLMs on psychotherapy safety for mental health applications.",
    company: "Rice University",
    position: "AI Researcher — Computational Wellbeing Group",
    bullets: [
      "Awarded Best Presentation at the Ken Kennedy Institute's AI in Health Conference for our research",
      "Designed 50+ prompts to evaluate various proprietary & open-source LLMs on psychotherapy safety for mental health applications",
    ],
    image: "/timeline/rice-research.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "research",
  },
  {
    date: "May 2025",
    title: "AI Depression Research at HPE",
    description:
      "Presented original AI depression research at the HPE competition, exploring the intersection of AI and mental health.",
    image: "/timeline/uh-research.jpg",
    category: "research",
  },
  {
    date: "Mar 2025",
    title: "Young AI Leader — AI for Good",
    description:
      "Selected as a Young AI Leader for the AI for Good initiative, advocating for responsible and impactful AI development.",
    category: "sidequest",
  },
  {
    date: "Apr 2024",
    title: "AWS Certified Cloud Practitioner",
    description:
      "Earned the AWS Cloud Practitioner certification, building a strong foundation in cloud infrastructure and services.",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  // --- Hackathon (latest first) ---
  {
    date: "Mar 2025",
    title: "Harvard Rare Diseases Hackathon",
    description:
      "Received a scholarship to compete at the Harvard Rare Diseases Hackathon, applying AI to real-world healthcare challenges.",
    image: "/timeline/harvard-hackathon.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "hackathon",
  },
  {
    date: "Jan 2024",
    title: "Won TAMUHack X",
    description:
      "Competed at TAMUHack X and took home a win, solidifying my love for hackathons and rapid prototyping.",
    image: "/timeline/tamuhack.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "hackathon",
  },
  {
    date: "Jan 2024",
    title: "First Hackathon Win",
    description:
      "Won my very first hackathon, sparking a passion for building under pressure and collaborating with talented people.",
    image: "/timeline/first-hackathon-win.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "hackathon",
  },
  // --- Side-quest (latest first) ---
  {
    date: "Feb 2026",
    title: "My Interview with Austria's National TV",
    description:
      "Featured on Austria's National TV, sharing our story and mission with Kier Therapeutics to a broader audience.",
    image: "/timeline/austria-tv.png",
    category: "sidequest",
  },
  {
    date: "Feb 2026",
    title: "AI in Healthcare Talk @ AI Tinkerers",
    description:
      "Gave a talk about our AI in Healthcare approach at AI Tinkerers, sharing insights from building Kier Therapeutics.",
    image: "/timeline/ai-tinkers-talk.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  {
    date: "Feb 2026",
    title: "Met Peter Steinberger in Vienna",
    description:
      "Traveled to Vienna and met Peter Steinberger, connecting with one of the most influential figures in mobile development.",
    image: "/timeline/peter-steinberger.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  {
    date: "Oct 2025",
    title: "CodeCoogs President",
    description:
      "Elected as President of CodeCoogs, leading one of UH's largest developer communities and shaping its future direction.",
    image: "/timeline/codecoogs.jpg",
    category: "sidequest",
  },
  {
    date: "May 2025",
    title: "CodeCoogs VP of Operations",
    description:
      "Promoted to VP of Operations at CodeCoogs, scaling the organization and driving new initiatives for the developer community.",
    category: "sidequest",
  },
  {
    date: "Feb 2025",
    title: "First CodeCoogs Talk",
    description:
      "Gave my first talk as a CodeCoogs Collab Director, sharing knowledge and stepping into a leadership role in the developer community.",
    image: "/timeline/leadership-talk.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  {
    date: "Jan 2025",
    title: "Switched to CS & Joined CodeCoogs",
    description:
      "Officially switched my major to Computer Science and joined CodeCoogs as Collaboration Director, diving deeper into the tech community.",
    category: "sidequest",
  },
  {
    date: "Sep 2024",
    title: "Founded Ping Pong @ UH",
    description:
      "Founded the Ping Pong club at UH, bringing together students through friendly competition and community.",
    category: "sidequest",
  },
  {
    date: "Aug 2023",
    title: "Joined University of Houston",
    description:
      "Started my college journey at UH, eager to explore technology and find my path in software engineering.",
    category: "sidequest",
  },
];

export { milestones };

interface JourneyTimelineProps {
  onSlideChange?: (index: number) => void;
  onGoToSlide?: (fn: (index: number) => void) => void;
  light?: boolean;
}

// Re-export milestones count for progress bar
export const MILESTONES_COUNT = milestones.length;

// Card dimensions — wide landscape cards, ~3 visible
const CARD_WIDTH_RATIO = 0.48; // each card ~48% of container width
const CARD_HEIGHT_RATIO = 0.46; // card height ~46% of container height → clearly landscape
const CARD_GAP_CSS = "clamp(16px, 2vw, 28px)";
const CARD_PADDING_LEFT_CSS = "clamp(24px, 4vw, 48px)";

function getCardGap() {
  return Math.min(28, Math.max(16, window.innerWidth * 0.02));
}
function getCardPaddingLeft() {
  return Math.min(48, Math.max(24, window.innerWidth * 0.04));
}

export default function JourneyTimeline({ onSlideChange, onGoToSlide, light = false }: JourneyTimelineProps = {}) {
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
    const gap = getCardGap();
    const padL = getCardPaddingLeft();
    return padL + milestones.length * cw + (milestones.length - 1) * gap;
  }, [getCardWidth]);

  // Get the x offset to place card at given index near the left of the viewport
  const getScrollX = useCallback((index: number) => {
    const cw = getCardWidth();
    const gap = getCardGap();
    return -(index * (cw + gap));
  }, [getCardWidth]);

  // Get the x offset to center a focused card in the viewport
  const getCenteredX = useCallback((index: number) => {
    const cw = getCardWidth();
    const gap = getCardGap();
    const padL = getCardPaddingLeft();
    const expandMargin = cw * 0.075; // matches the margin added on focus
    const cardLeft = padL + index * (cw + gap) + expandMargin;
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
        const gap = getCardGap();
        const padL = getCardPaddingLeft();
        const centerWorld = -currentX.current + containerW.current / 2;
        const idx = Math.round((centerWorld - padL - cw / 2) / (cw + gap));
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
    const gap = getCardGap();
    const padL = getCardPaddingLeft();
    const totalWidth = padL + milestones.length * cw + (milestones.length - 1) * gap;
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
          gap: CARD_GAP_CSS,
          paddingLeft: CARD_PADDING_LEFT_CSS,
          height: "100%",
          willChange: "transform",
        }}
      >
        {milestones.map((milestone, i) => {
          const isFocused = focusedIndex === i;
          // Extra margin to push neighbors away when scaled (scale grows 15% → 7.5% each side)
          const expandMargin = isFocused ? cardWidthPx * 0.075 : 0;
          return (
            <div
              key={i}
              className={`relative flex-shrink-0 rounded-2xl border overflow-hidden ${
                light
                  ? "bg-gray-50 border-gray-200"
                  : "bg-[#141414] border-gray-800/60"
              }`}
              style={{
                width: `${cardWidthPx}px`,
                height: `${CARD_HEIGHT_RATIO * 100}%`,
                transform: isFocused ? "scale(1.15)" : "scale(1)",
                marginLeft: `${expandMargin}px`,
                marginRight: `${expandMargin}px`,
                transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease, margin 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                zIndex: isFocused ? 10 : 1,
                boxShadow: isFocused
                  ? (light ? "0 0 40px rgba(59,130,246,0.1), 0 4px 20px rgba(0,0,0,0.08)" : "0 0 40px rgba(59,130,246,0.15)")
                  : "none",
              }}
              onClick={() => handleSlideTap(i)}
            >
              <div className="h-full flex flex-col justify-center" style={{ padding: `clamp(10px, 1.5vh, 12px) clamp(16px, 2.5vw, 24px)` }}>
                <SlideContent milestone={milestone} isFocused={isFocused} light={light} />
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
  light = false,
}: {
  milestone: Milestone;
  isFocused: boolean;
  light?: boolean;
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
      <div style={{ marginBottom: "clamp(8px, 1vh, 12px)" }}>
        <span className="inline-block font-semibold text-blue-400 bg-blue-500/15 rounded-md" style={{ fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)", padding: "clamp(6px, 1vh, 12px) clamp(20px, 2.4vw, 28px)" }}>
          {milestone.date}
        </span>
      </div>

      <h2 className={`font-bold leading-tight ${light ? "text-gray-900" : "text-gray-100"}`} style={{ fontSize: "clamp(2.3rem, 4.4vw, 3.2rem)" }}>
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
        <p className={`leading-relaxed ${light ? "text-gray-600" : "text-gray-400"}`} style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginBottom: "clamp(8px, 1vh, 12px)" }}>
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
