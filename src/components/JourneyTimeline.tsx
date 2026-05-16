"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export default function JourneyTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!timeline || !line) return;

    // Line draws from top to bottom via clipPath
    gsap.set(line, { clipPath: "inset(0 0 100% 0)" });

    const lineTween = gsap.to(line, {
      clipPath: "inset(0 0 0% 0)",
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Blur/focus: only the item closest to viewport center is sharp
    let activeIndex = -1;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const dot = dotRefs.current[i];
      gsap.set(el, { filter: "blur(6px)", opacity: 0.15 });
      if (dot) gsap.set(dot, { scale: 0.5, opacity: 0.3 });
    });

    function updateFocus() {
      const center = window.innerHeight / 2;
      let closest = -1;
      let closestDist = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      // Require the new item to be significantly closer before switching
      if (closest !== activeIndex) {
        if (activeIndex >= 0) {
          const currEl = itemRefs.current[activeIndex];
          if (currEl) {
            const currRect = currEl.getBoundingClientRect();
            const currDist = Math.abs(currRect.top + currRect.height / 2 - center);
            // Only switch if new item is at least 30% closer (hysteresis)
            if (closestDist > currDist * 0.2) return;
          }
        }
        // Blur previous
        if (activeIndex >= 0) {
          const prev = itemRefs.current[activeIndex];
          const prevDot = dotRefs.current[activeIndex];
          if (prev) snapTo(prev, prevDot, false);
        }
        // Focus new
        activeIndex = closest;
        if (activeIndex >= 0) {
          const curr = itemRefs.current[activeIndex];
          const currDot = dotRefs.current[activeIndex];
          if (curr) snapTo(curr, currDot, true);
        }
      }
    }

    // Run on scroll via ScrollTrigger
    const focusTrigger = ScrollTrigger.create({
      trigger: timeline,
      start: "top bottom",
      end: "bottom top",
      onUpdate: updateFocus,
    });

    // Initial check
    updateFocus();

    return () => {
      lineTween.scrollTrigger?.kill();
      lineTween.kill();
      focusTrigger.kill();
    };
  }, []);

  return (
    <section id="journey-timeline" data-theme="dark" className="relative z-[2] mb-20">
      <div ref={timelineRef} className="relative">
        {/* Static gray track */}
        <div className="tl-track absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-700" />
        {/* Animated blue line */}
        <div
          ref={lineRef}
          className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-violet-500"
        />

        {milestones.map((milestone, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              className="min-h-[35vh] flex items-center snap-start cursor-pointer"
              onClick={() => {
                const el = itemRefs.current[i];
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2;
                const viewCenter = window.innerHeight / 2;
                window.scrollBy({
                  top: elCenter - viewCenter,
                  behavior: "smooth",
                });
              }}
            >
              <div className="relative flex items-start md:items-center w-full">
                {/* Desktop left side */}
                <div
                  className="hidden md:block w-[calc(50%-24px)]"
                >
                  <div
                    ref={(el) => {
                      if (isLeft) itemRefs.current[i] = el;
                    }}
                    className="text-right pr-8"
                  >
                    {isLeft && (
                      <MilestoneContent
                        milestone={milestone}
                        align="right"
                      />
                    )}
                  </div>
                </div>

                {/* Center dot */}
                <div className="flex-shrink-0 md:mx-0 mr-4 z-10">
                  <div
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="tl-dot w-4 h-4 rounded-full bg-blue-500 border-4 border-[#0a0a0a] shadow-lg ring-2 ring-blue-500/30"
                  />
                </div>

                {/* Desktop right side */}
                <div
                  className="hidden md:block w-[calc(50%-24px)]"
                >
                  <div
                    ref={(el) => {
                      if (!isLeft) itemRefs.current[i] = el;
                    }}
                    className="text-left pl-8"
                  >
                    {!isLeft && (
                      <MilestoneContent
                        milestone={milestone}
                        align="left"
                      />
                    )}
                  </div>
                </div>

                {/* Mobile */}
                <div
                  ref={(el) => {
                    if (
                      typeof window !== "undefined" &&
                      window.innerWidth < 768
                    ) {
                      itemRefs.current[i] = el;
                    }
                  }}
                  className="md:hidden flex-1"
                >
                  <MilestoneContent milestone={milestone} small align="left" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MilestoneContent({
  milestone,
  small,
  align = "left",
}: {
  milestone: Milestone;
  small?: boolean;
  align?: "left" | "right";
}) {
  const title = milestone.link ? (
    <a
      href={milestone.link}
      target="_blank"
      rel="noopener noreferrer"
      className="tl-link hover:text-blue-400 hover:underline transition-colors"
    >
      {milestone.title}
    </a>
  ) : (
    milestone.title
  );

  return (
    <>
      <span className="tl-pill inline-block text-sm font-semibold text-blue-400 bg-blue-500/15 px-3 py-1 rounded-lg mb-3">
        {milestone.date}
      </span>
      <h3
        className={`tl-title ${
          small ? "text-lg" : "text-xl"
        } font-bold mb-2 text-gray-100`}
      >
        {title}
      </h3>
      <p
        className={`tl-desc text-gray-400 leading-relaxed ${small ? "text-sm" : ""}`}
      >
        {milestone.description}
      </p>
      {milestone.image && (
        <div className={`mt-3 ${align === "right" ? "ml-auto" : ""}`}>
          <Image
            src={milestone.image}
            alt={milestone.title}
            width={280}
            height={210}
            className={`tl-img shadow-sm rounded-2xl ${
              small ? "max-w-[200px]" : "max-w-[280px]"
            } h-auto`}
          />
        </div>
      )}
    </>
  );
}

function snapTo(
  el: HTMLDivElement,
  dot: HTMLDivElement | null,
  inView: boolean
) {
  gsap.to(el, {
    filter: inView ? "blur(0px)" : "blur(6px)",
    opacity: inView ? 1 : 0.15,
    duration: inView ? 0.8 : 0.6,
    ease: inView ? "power3.out" : "power3.in",
  });
  if (dot) {
    gsap.to(dot, {
      scale: inView ? 1 : 0.5,
      opacity: inView ? 1 : 0.3,
      duration: inView ? 0.6 : 0.4,
      ease: inView ? "back.out(2)" : "power3.in",
    });
  }
}
