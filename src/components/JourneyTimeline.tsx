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
    image: "/timeline/hackathon-win.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "Jan 2024",
    title: "Won TAMUHack X",
    description:
      "Competed at TAMUHack X and took home a win, solidifying my love for hackathons and rapid prototyping.",
    image: "/timeline/tamuhack.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "Apr 2024",
    title: "AWS Certified Cloud Practitioner",
    description:
      "Earned the AWS Cloud Practitioner certification, building a strong foundation in cloud infrastructure and services.",
    image: "/timeline/aws-cert.svg",
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
    image: "/timeline/codecoogs-talk.svg",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
  },
  {
    date: "Mar 2025",
    title: "Young AI Leader — AI for Good",
    description:
      "Selected as a Young AI Leader for the AI for Good initiative, advocating for responsible and impactful AI development.",
    image: "/timeline/ai-for-good.svg",
  },
  {
    date: "Mar 2025",
    title: "Harvard Rare Diseases Hackathon",
    description:
      "Received a scholarship to compete at the Harvard Rare Diseases Hackathon, applying AI to real-world healthcare challenges.",
    image: "/timeline/harvard-hackathon.svg",
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
    image: "/timeline/rice-ai-health.svg",
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
    image: "/timeline/vienna-peter.svg",
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
  const currentIndexRef = useRef(0);
  const vwRef = useRef(0);

  // Scroll-driven state
  const targetProgress = useRef(0);   // raw target from wheel input (0–1 per transition)
  const smoothProgress = useRef(0);   // lerped display value
  const directionRef = useRef(1);     // 1 = forward, -1 = backward
  /** After a slide commits, mute wheel briefly. Fixed deadline (never extended by momentum). */
  const WHEEL_MUTE_AFTER_SLIDE_MS = 140;
  const wheelMutedUntilRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // GSAP animation lock (for click nav)
  const isAnimating = useRef(false);

  // Scroll amount needed per slide transition (in wheel delta px)
  const SCROLL_PER_SLIDE = 600;
  // Below this, treat scroll transition as idle (eligible to flip neighbour direction).
  const PROG_EPS = 1e-5;
  // Lerp factor — lower = smoother/more inertia
  const LERP = 0.08;

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

      const baseTx = -(slideIdx * vw);
      const targetTx = -(targetIdx * vw);
      const tx = baseTx + (targetTx - baseTx) * panProgress;

      const originX = vw / 2 - tx;
      strip.style.transformOrigin = `${originX}px 50%`;
      strip.style.transform = `translateX(${tx}px) scale(${scale})`;

      const labelOpacity = 1 - (scale - SCALE_OUT) / (SCALE_IN - SCALE_OUT);
      const clampedOpacity = Math.max(0, Math.min(1, labelOpacity));
      labelsRef.current.forEach((label) => {
        if (label) label.style.opacity = String(clampedOpacity);
      });
    },
    []
  );

  // Map progress (0–1) through 3 phases and apply transform
  const applyProgress = useCallback(
    (progress: number, fromIdx: number, dir: number) => {
      const toIdx = fromIdx + dir;
      if (toIdx < 0 || toIdx >= milestones.length) return;

      // Ease the progress for a more natural feel
      const p = progress;

      if (p <= 0.3) {
        // Phase 1: Zoom out
        const t = p / 0.3;
        const scale = SCALE_IN + (SCALE_OUT - SCALE_IN) * t;
        applyTransform(fromIdx, scale, 0, fromIdx);
      } else if (p <= 0.7) {
        // Phase 2: Pan
        const t = (p - 0.3) / 0.4;
        applyTransform(fromIdx, SCALE_OUT, t, toIdx);
      } else {
        // Phase 3: Zoom in
        const t = (p - 0.7) / 0.3;
        const scale = SCALE_OUT + (SCALE_IN - SCALE_OUT) * t;
        applyTransform(toIdx, scale, 0, toIdx);
      }
    },
    [applyTransform]
  );

  // Set initial transform
  useEffect(() => {
    applyTransform(0, SCALE_IN, 0, 0);
  }, [applyTransform]);

  // rAF render loop — smoothly interpolates toward target
  useEffect(() => {
    const tick = () => {
      if (isAnimating.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const tgt = targetProgress.current;
      const prevS = smoothProgress.current;
      const diff = tgt - prevS;

      // Lerp
      if (Math.abs(diff) > 0.001) {
        smoothProgress.current = prevS + diff * LERP;
      } else {
        smoothProgress.current = tgt;
      }

      const p = smoothProgress.current;
      const idx = currentIndexRef.current;
      const dir = directionRef.current;
      const nextIdx = idx + dir;

      // Only render if there's meaningful progress
      if (Math.abs(p) > 0.001 && nextIdx >= 0 && nextIdx < milestones.length) {
        applyProgress(Math.abs(p), idx, dir);

        // Update active index at halfway
        if (Math.abs(p) > 0.5) {
          setActiveIndex(nextIdx);
        } else {
          setActiveIndex(idx);
        }
      }

      // Completed transition — snap to next slide
      if (tgt >= 1 && smoothProgress.current >= 0.995) {
        const nextI = idx + dir;
        if (nextI >= 0 && nextI < milestones.length) {
          currentIndexRef.current = nextI;
          setActiveIndex(nextI);
          applyTransform(nextI, SCALE_IN, 0, nextI);
          wheelMutedUntilRef.current = performance.now() + WHEEL_MUTE_AFTER_SLIDE_MS;
        }
        targetProgress.current = 0;
        smoothProgress.current = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyProgress, applyTransform]);

  // Wheel input — feeds targetProgress
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      const now = performance.now();
      if (now < wheelMutedUntilRef.current) return;

      const delta = e.deltaY;
      const tentative = delta > 0 ? 1 : -1;
      const committed = currentIndexRef.current;
      const step = Math.abs(delta) / SCROLL_PER_SLIDE;
      const tgtAtStart = targetProgress.current;

      // --- Opposing scroll while mid-transition: shrink progress smoothly (reverse along same path).
      // --- Idle + opposing: start transitioning toward neighbour in tentative direction.

      if (tentative !== directionRef.current) {
        const curMag = Math.max(targetProgress.current, smoothProgress.current);

        if (curMag <= PROG_EPS) {
          const toward = committed + tentative;
          if (toward < 0 || toward >= milestones.length) return;

          directionRef.current = tentative;
          const s0 = Math.min(1, step);
          targetProgress.current = s0;
          smoothProgress.current = s0;
        } else {
          const nw = Math.max(0, curMag - step);
          targetProgress.current = nw;
          smoothProgress.current = nw;

          if (nw <= PROG_EPS) {
            targetProgress.current = 0;
            smoothProgress.current = 0;
            applyTransform(committed, SCALE_IN, 0, committed);
            setActiveIndex(committed);
          }
        }
      } else {
        const toward = committed + directionRef.current;
        if (toward < 0 || toward >= milestones.length) return;

        targetProgress.current = Math.min(1, tgtAtStart + step);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [applyTransform]);

  // Snappy GSAP animation for progress bar clicks
  const animateToSlide = useCallback(
    (from: number, to: number) => {
      if (from === to || isAnimating.current) return;
      isAnimating.current = true;
      // Reset scroll state
      targetProgress.current = 0;
      smoothProgress.current = 0;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          currentIndexRef.current = to;
          setActiveIndex(to);
          applyTransform(to, SCALE_IN, 0, to);
          wheelMutedUntilRef.current = performance.now() + WHEEL_MUTE_AFTER_SLIDE_MS;
        },
      });

      const state = { scale: SCALE_IN, pan: 0 };

      tl.to(state, {
        scale: SCALE_OUT,
        duration: 0.25,
        ease: "power2.inOut",
        onUpdate: () => applyTransform(from, state.scale, 0, from),
      });

      tl.to(state, {
        pan: 1,
        duration: 0.2,
        ease: "power2.inOut",
        onUpdate: () => applyTransform(from, SCALE_OUT, state.pan, to),
      });

      tl.to(state, {
        scale: SCALE_IN,
        duration: 0.25,
        ease: "power2.inOut",
        onUpdate: () => applyTransform(to, state.scale, 0, to),
      });
    },
    [applyTransform]
  );

  const goToSlide = useCallback(
    (index: number) => {
      const committed = currentIndexRef.current;
      if (isAnimating.current || index === committed) return;
      if (index < 0 || index >= milestones.length) return;
      animateToSlide(committed, index);
    },
    [animateToSlide]
  );

  // Expose goToSlide to parent
  useEffect(() => {
    onGoToSlide?.(goToSlide);
  }, [goToSlide, onGoToSlide]);

  // Notify parent of slide changes
  useEffect(() => {
    onSlideChange?.(activeIndex);
  }, [activeIndex, onSlideChange]);

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
            unoptimized
            className="rounded-2xl shadow-lg max-w-full h-auto max-h-[35vh] object-cover"
          />
        </div>
      )}
    </div>
  );
}
