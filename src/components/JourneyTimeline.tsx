"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

interface Milestone {
  date: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

const milestones: Milestone[] = [
  {
    date: "Aug 2023",
    title: "Joined University of Houston",
    description:
      "Started my college journey at UH, eager to explore technology and find my path in software engineering.",
  },
  {
    date: "Jan 2024",
    title: "First Hackathon Win",
    description:
      "Won my very first hackathon, sparking a passion for building under pressure and collaborating with talented people.",
    image: "/timeline/hackathon-win.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "Jan 2024",
    title: "Won TAMUHack X",
    description:
      "Competed at TAMUHack X and took home a win, solidifying my love for hackathons and rapid prototyping.",
    image: "/timeline/tamuhack.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "Apr 2024",
    title: "AWS Certified Cloud Practitioner",
    description:
      "Earned the AWS Cloud Practitioner certification, building a strong foundation in cloud infrastructure and services.",
    image: "/timeline/aws-cert.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "Sep 2024",
    title: "Founded Ping Pong @ UH",
    description:
      "Founded the Ping Pong club at UH, bringing together students through friendly competition and community.",
  },
  {
    date: "Jan 2025",
    title: "Switched to CS & Joined CodeCoogs",
    description:
      "Officially switched my major to Computer Science and joined CodeCoogs as Collaboration Director, diving deeper into the tech community.",
  },
  {
    date: "Feb 2025",
    title: "First CodeCoogs Talk",
    description:
      "Gave my first talk as a CodeCoogs officer, sharing knowledge and stepping into a leadership role in the developer community.",
    image: "/timeline/codecoogs-talk.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "Mar 2025",
    title: "Young AI Leader — AI for Good",
    description:
      "Selected as a Young AI Leader for the AI for Good initiative, advocating for responsible and impactful AI development.",
    image: "/timeline/ai-for-good.jpg",
  },
  {
    date: "Mar 2025",
    title: "Harvard Rare Diseases Hackathon",
    description:
      "Received a scholarship to compete at the Harvard Rare Diseases Hackathon, applying AI to real-world healthcare challenges.",
    image: "/timeline/harvard-hackathon.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "May 2025",
    title: "AI Depression Research at HPE",
    description:
      "Presented original AI depression research at the HPE competition, exploring the intersection of AI and mental health.",
  },
  {
    date: "May 2025",
    title: "CodeCoogs VP of Operations",
    description:
      "Promoted to VP of Operations at CodeCoogs, scaling the organization and driving new initiatives for the developer community.",
  },
  {
    date: "Jun 2025",
    title: "AI Intern at ETC Technology System",
    description:
      "Joined ETC Technology System as an AI intern, gaining hands-on industry experience building AI-powered solutions.",
  },
  {
    date: "Oct 2025",
    title: "CodeCoogs President",
    description:
      "Elected as President of CodeCoogs, leading one of UH's largest developer communities and shaping its future direction.",
  },
  {
    date: "Oct 2025",
    title: "2nd Place — Rice AI in Health Conference",
    description:
      "Won 2nd place at the AI in Health Conference at Rice University, presenting innovative AI applications in healthcare.",
    image: "/timeline/rice-ai-health.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "Jan 2026",
    title: "Joined The Residency",
    description:
      "Accepted into The Residency (backed by Sam Altman), a highly selective program with less than 1% acceptance rate.",
  },
  {
    date: "Feb 2026",
    title: "Met Peter Steinberger in Vienna",
    description:
      "Traveled to Vienna and met Peter Steinberger, connecting with one of the most influential figures in mobile development.",
    image: "/timeline/vienna-peter.jpg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
];

const SCALE_IN = 1;
const SCALE_OUT = 0.35;

export { milestones };

interface JourneyTimelineProps {
  onSlideChange?: (index: number) => void;
  onGoToSlide?: (fn: (index: number) => void) => void;
}

// Re-export milestones count for progress bar
export const MILESTONES_COUNT = milestones.length;

export default function JourneyTimeline({ onSlideChange, onGoToSlide }: JourneyTimelineProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const currentIndexRef = useRef(0);
  const vwRef = useRef(0);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep currentIndexRef in sync
  useEffect(() => {
    currentIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Measure container width
  useEffect(() => {
    const update = () => {
      vwRef.current = containerRef.current?.offsetWidth ?? window.innerWidth;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const applyTransform = useCallback(
    (slideIdx: number, scale: number, panProgress: number, targetIdx: number) => {
      const strip = stripRef.current;
      if (!strip) return;
      const vw = containerRef.current?.offsetWidth ?? vwRef.current;

      // Base translateX centers slideIdx in viewport
      const baseTx = -(slideIdx * vw);
      // Pan interpolation toward targetIdx
      const targetTx = -(targetIdx * vw);
      const tx = baseTx + (targetTx - baseTx) * panProgress;

      // Transform origin: keep scale centered on viewport center
      const originX = vw / 2 - tx;
      strip.style.transformOrigin = `${originX}px 50%`;
      strip.style.transform = `translateX(${tx}px) scale(${scale})`;

      // Labels: visible when zoomed out
      const labelOpacity = 1 - (scale - SCALE_OUT) / (SCALE_IN - SCALE_OUT);
      const clampedOpacity = Math.max(0, Math.min(1, labelOpacity));
      labelsRef.current.forEach((label) => {
        if (label) label.style.opacity = String(clampedOpacity);
      });
    },
    []
  );

  // Set initial transform
  useEffect(() => {
    applyTransform(0, SCALE_IN, 0, 0);
  }, [applyTransform]);

  // 3-phase GSAP animation: zoom out → pan → zoom in (one slide at a time)
  const animateToSlide = useCallback(
    (from: number, to: number) => {
      if (from === to || isAnimating.current) return;
      isAnimating.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          wheelAccum.current = 0;
          currentIndexRef.current = to;
          setActiveIndex(to);
          applyTransform(to, SCALE_IN, 0, to);
        },
      });

      const state = { scale: SCALE_IN, pan: 0 };

      // Phase 1: Zoom out
      tl.to(state, {
        scale: SCALE_OUT,
        duration: 0.4,
        ease: "power2.inOut",
        onUpdate: () => applyTransform(from, state.scale, 0, from),
      });

      // Phase 2: Pan to next slide
      tl.to(state, {
        pan: 1,
        duration: 0.45,
        ease: "power2.inOut",
        onUpdate: () => applyTransform(from, SCALE_OUT, state.pan, to),
      });

      // Phase 3: Zoom back in on the new slide
      tl.to(state, {
        scale: SCALE_IN,
        duration: 0.4,
        ease: "power2.inOut",
        onUpdate: () => applyTransform(to, state.scale, 0, to),
      });
    },
    [applyTransform]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating.current || index === activeIndex) return;
      if (index < 0 || index >= milestones.length) return;
      animateToSlide(activeIndex, index);
    },
    [activeIndex, animateToSlide]
  );

  // Expose goToSlide to parent
  useEffect(() => {
    onGoToSlide?.(goToSlide);
  }, [goToSlide, onGoToSlide]);

  // Notify parent of slide changes
  useEffect(() => {
    onSlideChange?.(activeIndex);
  }, [activeIndex, onSlideChange]);

  // Wheel: accumulate small deltas, trigger ONE slide transition once threshold is met
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const THRESHOLD = 80;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      wheelAccum.current += e.deltaY;

      // Clear accumulator after a pause (prevents stale momentum)
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelAccum.current = 0;
      }, 150);

      if (Math.abs(wheelAccum.current) >= THRESHOLD) {
        const direction = wheelAccum.current > 0 ? 1 : -1;
        const from = currentIndexRef.current;
        const to = from + direction;
        wheelAccum.current = 0;

        if (to >= 0 && to < milestones.length) {
          animateToSlide(from, to);
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [animateToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = currentIndexRef.current + 1;
        if (next < milestones.length)
          animateToSlide(currentIndexRef.current, next);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = currentIndexRef.current - 1;
        if (prev >= 0) animateToSlide(currentIndexRef.current, prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [animateToSlide]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Horizontal strip */}
      <div
        ref={stripRef}
        className="flex h-full"
        style={{ width: `${milestones.length * 100}%`, willChange: "transform" }}
      >
        {milestones.map((milestone, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 flex flex-col justify-center"
            style={{ width: `${100 / milestones.length}%`, height: "100%", padding: "clamp(2rem, 3vw, 3.5rem)" }}
          >
            {/* Label above slide - visible when zoomed out */}
            <div
              ref={(el) => { labelsRef.current[i] = el; }}
              className="absolute top-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10"
              style={{ opacity: 0 }}
            >
              <div className="text-blue-400 text-xs font-semibold tracking-wide mb-1">
                {milestone.date}
              </div>
              <div className="text-gray-300 text-sm font-medium whitespace-nowrap max-w-[90vw] truncate">
                {milestone.title}
              </div>
            </div>

            <SlideContent
              milestone={milestone}
              index={i}
              total={milestones.length}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

function SlideContent({
  milestone,
  index,
  total,
}: {
  milestone: Milestone;
  index: number;
  total: number;
}) {
  const title = milestone.link ? (
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
  );

  return (
    <div className="h-full flex flex-col justify-center max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-block text-sm font-semibold text-blue-400 bg-blue-500/15 px-4 py-1.5 rounded-lg">
          {milestone.date}
        </span>
        <span className="text-gray-600 text-sm font-mono">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-4 leading-tight">
        {title}
      </h2>

      <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-6">
        {milestone.description}
      </p>

      {milestone.image && (
        <div className="mt-2">
          <Image
            src={milestone.image}
            alt={milestone.title}
            width={500}
            height={350}
            className="rounded-2xl shadow-lg max-w-full h-auto max-h-[35vh] object-cover"
          />
        </div>
      )}
    </div>
  );
}
