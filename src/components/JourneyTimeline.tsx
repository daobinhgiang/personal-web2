"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export type MilestoneCategory = "work" | "research" | "hackathon" | "sidequest";

export interface Milestone {
  date: string;
  startDate: string; // YYYY-MM
  endDate?: string; // YYYY-MM; omit for ongoing roles
  title: string;
  description: string;
  company?: string;
  position?: string;
  bullets?: string[];
  image?: string;
  images?: string[];
  link?: string;
  headerLink?: string;
  category: MilestoneCategory;
  award?: string;
}

// Category display order — items within each category are auto-sorted by date (latest first)
const CATEGORY_ORDER: MilestoneCategory[] = ["work", "research", "hackathon", "sidequest"];

function compareMilestones(a: Milestone, b: Milestone): number {
  const aEnd = a.endDate ?? "9999-12";
  const bEnd = b.endDate ?? "9999-12";
  if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
  return b.startDate.localeCompare(a.startDate);
}

const rawMilestones: Milestone[] = [
  // --- Work Experience ---
  {
    date: "April 2026 — Present",
    startDate: "2026-04",
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
    startDate: "2025-08",
    endDate: "2026-04",
    title: "Co-Founded Kier Therapeutics",
    description:
      "Accepted to The Residency (backed by Sam Altman) as one of 6 out of 600 startups. Built 4 versions of Nurtra with Flutter, SwiftUI, Firebase, Mixpanel & Superwall. Gathered feedback from 600+ users and managed a 70+ member community.",
    company: "Kier Therapeutics, Inc.",
    position: "Co-Founder",
    bullets: [
      "Accepted to The Residency (backed by Sam Altman — CEO of OpenAI, as the advisor) as one of the 6 out of 600 startups",
      "Built product and gather feedback, built 4 versions of Nurtra with Flutter & SwiftUI, Firebase, Mixpanel and Superwall",
      "Grew to 600+ users, managed 70+ members community; achieved 200k+ views/300+ followers across all platforms",
      "Invited to speak at AI Tinkerers regarding our AI in Healthcare approach and Austria's National TV about Kier's mission",
      "Mentored by clinical advisors from Stanford & The Alliance for Eating Disorders about psychotherapy best practices",
    ],
    image: "/timeline/kier-team.jpg",
    category: "work",
  },
  {
    date: "May 2025 — August 2025",
    startDate: "2025-05",
    endDate: "2025-08",
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
  // --- Research ---
  {
    date: "September 2025 — December 2025",
    startDate: "2025-09",
    endDate: "2025-12",
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
    date: "August 2025 — December 2025",
    startDate: "2025-08",
    endDate: "2025-12",
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
    award: "Best Presentation Award",
  },
  {
    date: "May 2025",
    startDate: "2025-05",
    endDate: "2025-05",
    title: "AI Depression Research at HPE",
    description:
      "Presented original AI depression research at the HPE competition, exploring the intersection of AI and mental health.",
    image: "/timeline/uh-research.jpg",
    category: "research",
  },
  // --- Hackathon ---
  {
    date: "Mar 2025",
    startDate: "2025-03",
    endDate: "2025-03",
    title: "Harvard Rare Diseases Hackathon",
    position: "Software Engineer",
    company: "Harvard Rare Diseases Hackathon",
    description:
      "Received a scholarship to compete at the Harvard Rare Diseases Hackathon, built an all-in-one web app for symptoms management",
    bullets: [
      "Created a Flask app that monitors rare disease patients' health and provides personalized support for nutritional analysis",
      "Constructed 6+ functions, including voice interaction using Google Speech Recognition, achieving wake-word detection with a 25% improvement in navigation speed",
      "Received scholarship from Harvard that covered travel and living expenses for the 2-day hackathon",
    ],
    image: "/timeline/harvard-hackathon.jpg",
    link: "https://github.com/daobinhgiang/HackRareOhana",
    category: "hackathon",
  },
  {
    date: "Jan 2024",
    startDate: "2024-01",
    endDate: "2024-01",
    title: "TAMUHack - 1st Place",
    position: "Front-end Engineer",
    company: "TAMUHack X",
    description:
      "Built a Chrome Extension to detect phishing emails.",
    bullets: [
      "Engineered a Chrome Extension with SafeBrowsing API to detect phishing links with 95% accuracy; won 1st place",
    ],
    image: "/timeline/tamuhack.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "hackathon",
    award: "First Place",
  },
  {
    date: "Jan 2024",
    startDate: "2024-01",
    endDate: "2024-01",
    title: "Rice Datathon 2024 - Best Visiting Team",
    position: "Data Scientist",
    company: "Rice Datathon 2024",
    description:
      "Analyzed FDA data and identified alcohol as the top contributor to long-term disease and early death, proposing reduction strategies.",
    bullets: [
      'Competed in a team of 2 against over 550+ students across Houston, received recognition as "The Best Visiting Team"',
      "Processed a dataset of 100,000+ examples, removed 5,000+ outliers to weight different harmful substances",
    ],
    image: "/timeline/first-hackathon-win.jpg",
    link: "https://github.com/daobinhgiang/Rice-Datathon-2024",
    category: "hackathon",
    award: "Best Visiting Team",
  },
  // --- Side-quest ---
  {
    date: "Feb 2026",
    startDate: "2026-02",
    endDate: "2026-02",
    title: "My Interview with Austria's National TV",
    company: "Kier Therapeutics",
    description:
      "Featured on Austria's National TV, sharing our story and mission with Kier Therapeutics to a broader audience.",
    bullets: [
      "Featured on Austria's National TV, sharing our story and mission with Kier Therapeutics to a broader audience.",
    ],
    images: ["/timeline/austria-tv.png", "/timeline/austria-tv-2.jpg"],
    link: "https://www.linkedin.com/posts/giang-mdao_national-tv-of-europe-interviewed-us-about-activity-7438246610373083136-zg7v?utm_source=share&utm_medium=member_desktop&rcm=ACoAAENiUkgBbc6bFq4yrTBZeiQ6aGcmhlOf1jQ",
    category: "sidequest",
  },
  {
    date: "Feb 2026",
    startDate: "2026-02",
    endDate: "2026-02",
    title: "AI in Healthcare Talk @ AI Tinkerers",
    company: "AI Tinkerers",
    headerLink: "https://aitinkerers.org/",
    description:
      "Gave a talk about our AI in Healthcare approach at AI Tinkerers, sharing insights from building Kier Therapeutics.",
    bullets: [
      "Gave a talk about our AI in Healthcare approach at AI Tinkerers, sharing insights from building Kier Therapeutics.",
    ],
    images: ["/timeline/ai-tinkerers-talk-2.jpg", "/timeline/ai-tinkers-talk.jpg"],
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  {
    date: "Feb 2026",
    startDate: "2026-02",
    endDate: "2026-02",
    title: "Met Peter Steinberger",
    company: "Met Peter Steinberger ",
    description:
      "Met Peter, the creator of OpenClaw, during The Residency Vienna.",
    bullets: [
      "Met Peter, the creator of OpenClaw, during The Residency Vienna.",
    ],
    image: "/timeline/peter-steinberger.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  {
    date: "Dec 2025",
    startDate: "2025-12",
    endDate: "2025-12",
    title: "CodeCoogs President",
    position: "President",
    company: "Code[Coogs]",
    description:
      "Elected as President of CodeCoogs, leading Houston's largest developer communities @ 300 members",
    bullets: [
      "Coordinated with 40+ officers on 30+ Workshops and Social events, resulting in a 30% increase in member counts and 40% rise in retention",
      "Facilitated 3 projects and 10+ large-scale events, secured $5,000+ in annual sponsorship",
    ],
    image: "/timeline/codecoogs.jpg",
    category: "sidequest",
  },
  {
    date: "May 2025",
    startDate: "2025-05",
    endDate: "2025-05",
    title: "CodeCoogs VP of Operations",
    position: "VP of Operations",
    company: "Code[Coogs]",
    description:
      "Promoted to VP of Operations at CodeCoogs.",
    bullets: [
      "Promoted to VP of Operations at CodeCoogs.",
    ],
    category: "sidequest",
  },
  {
    date: "Mar 2025",
    startDate: "2025-03",
    endDate: "2025-03",
    title: "Young AI Leader — AI for Good",
    company: "AI for Good",
    description:
      "Selected as a Young AI Leader for the AI for Good initiative, advocating for responsible and impactful AI development.",
    bullets: [
      "Selected as a Young AI Leader for the AI for Good initiative, advocating for responsible and impactful AI development.",
    ],
    category: "sidequest",
  },
  {
    date: "Feb 2025",
    startDate: "2025-02",
    endDate: "2025-02",
    title: "First CodeCoogs Talk",
    position: "Collab Director",
    company: "Code[Coogs]",
    description:
      "Gave my first talk as a CodeCoogs Collab Director, sharing knowledge and stepping into a leadership role in the developer community.",
    bullets: [
      "Gave my first talk as a CodeCoogs Collab Director, sharing knowledge and stepping into a leadership role in the developer community.",
    ],
    image: "/timeline/leadership-talk.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  {
    date: "Jan 2025",
    startDate: "2025-01",
    endDate: "2025-01",
    title: "Switched to CS & Joined CodeCoogs",
    position: "Collaboration Director",
    company: "Code[Coogs]",
    description:
      "Officially switched my major to Computer Science and joined CodeCoogs as Collaboration Director, diving deeper into the tech community.",
    bullets: [
      "Officially switched my major to Computer Science and joined CodeCoogs as Collaboration Director, diving deeper into the tech community.",
    ],
    category: "sidequest",
  },
  {
    date: "Sep 2024",
    startDate: "2024-09",
    endDate: "2024-09",
    title: "Founded Ping Pong @ UH",
    company: "University of Houston",
    description:
      "Founded the Ping Pong club at UH, bringing together students through friendly competition and community.",
    bullets: [
      "Founded the Ping Pong club at UH, bringing together students through friendly competition and community.",
    ],
    category: "sidequest",
  },
  {
    date: "Apr 2024",
    startDate: "2024-04",
    endDate: "2024-04",
    title: "AWS Certified Cloud Practitioner",
    company: "Amazon Web Services",
    description:
      "Earned the AWS Cloud Practitioner certification, building a strong foundation in cloud infrastructure and services.",
    bullets: [
      "Earned the AWS Cloud Practitioner certification, building a strong foundation in cloud infrastructure and services.",
    ],
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  {
    date: "Aug 2023",
    startDate: "2023-08",
    endDate: "2023-08",
    title: "Joined University of Houston",
    company: "University of Houston",
    description:
      "Started my college journey at UH, eager to explore technology and find my path in software engineering.",
    bullets: [
      "Started my college journey at UH, eager to explore technology and find my path in software engineering.",
    ],
    category: "sidequest",
  },
];

// Auto-sort: group by category order, then sort within each category by date descending
const milestones: Milestone[] = CATEGORY_ORDER.flatMap((cat) =>
  rawMilestones
    .filter((m) => m.category === cat)
    .sort(compareMilestones)
);

export { milestones, CATEGORY_ORDER };

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

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: "clamp(18px, 2.5vw, 24px)", height: "clamp(18px, 2.5vw, 24px)" }}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
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
  const isGitHubLink = milestone.link?.includes("github.com");
  const nonGitHubLink = milestone.link && !isGitHubLink ? milestone.link : undefined;

  return (
    <div className="flex flex-col justify-center h-full overflow-hidden">
      {/* Header row: title left, date right */}
      <div className="flex items-start justify-between gap-4" style={{ marginBottom: "clamp(4px, 0.6vh, 8px)" }}>
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="font-bold leading-tight text-blue-400" style={{ fontSize: "clamp(2.3rem, 4.4vw, 3.2rem)" }}>
            {nonGitHubLink ? (
              <a
                href={nonGitHubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 hover:underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {milestone.title}
              </a>
            ) : (
              milestone.title
            )}
          </h2>
          {isGitHubLink && (
            <a
              href={milestone.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 transition-colors ${light ? "text-gray-400 hover:text-gray-600" : "text-gray-500 hover:text-gray-300"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubIcon />
            </a>
          )}
        </div>
        <span className={`shrink-0 whitespace-nowrap ${light ? "text-gray-400" : "text-gray-500"}`} style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)", paddingTop: "clamp(4px, 0.5vh, 8px)" }}>
          {milestone.date}
        </span>
      </div>

      {/* Position / Company subtitle */}
      {(milestone.position || milestone.company) && (
        <p className={`${light ? "text-gray-500" : "text-gray-500"}`} style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.8rem)", marginBottom: "clamp(4px, 0.5vh, 6px)" }}>
          {milestone.position}{milestone.position && milestone.company ? " · " : ""}{milestone.company}
        </p>
      )}

      {/* Award badge */}
      {milestone.award && (
        <div style={{ marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300 bg-amber-400/15 rounded-md" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)", padding: "clamp(5px, 0.8vh, 10px) clamp(14px, 1.8vw, 20px)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" style={{ width: "clamp(14px, 2vw, 18px)", height: "clamp(14px, 2vw, 18px)" }}>
              <path d="M5 3h14a1 1 0 011 1v3a5 5 0 01-3.5 4.77A5.001 5.001 0 0113 15.92V19h3a1 1 0 110 2H8a1 1 0 110-2h3v-3.08A5.001 5.001 0 017.5 11.77 5 5 0 014 7V4a1 1 0 011-1zm1 2v2a3 3 0 002.05 2.84A5.02 5.02 0 018 9V5H6zm12 0h-2v4c0 .36-.04.7-.1 1.03A3 3 0 0018 7V5z"/>
            </svg>
            {milestone.award}
          </span>
        </div>
      )}

      {/* Description — always visible */}
      {milestone.description && (
        <p className={`leading-relaxed ${light ? "text-gray-600" : "text-gray-400"}`} style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginTop: "clamp(4px, 0.5vh, 8px)" }}>
          {milestone.description}
        </p>
      )}

      {/* Bullets & image — only visible when focused */}
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: isFocused ? "600px" : "0px",
          opacity: isFocused ? 1 : 0,
          marginTop: isFocused ? "8px" : "0px",
        }}
      >
        {milestone.bullets && milestone.bullets.length > 0 && (
          <ul className={`space-y-1 leading-relaxed ${light ? "text-gray-600" : "text-gray-400"}`} style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.8rem)", marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
            {milestone.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-blue-400/60 mt-0.5 shrink-0">&#8226;</span>{b}
              </li>
            ))}
          </ul>
        )}

        {milestone.images ? (
          <div className="flex gap-2 flex-wrap">
            {milestone.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`${milestone.title} ${i + 1}`}
                width={200}
                height={100}
                unoptimized
                className="rounded-lg shadow-lg h-auto max-h-[20vh] object-cover"
              />
            ))}
          </div>
        ) : milestone.image ? (
          <Image
            src={milestone.image}
            alt={milestone.title}
            width={400}
            height={200}
            unoptimized
            className="rounded-lg shadow-lg max-w-full h-auto max-h-[20vh] object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}
