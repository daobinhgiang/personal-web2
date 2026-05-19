"use client";

import { useRef, useEffect, useCallback } from "react";
import { MilestoneCategory } from "./JourneyTimeline";

interface CategoryNavProps {
  activeCategory: MilestoneCategory;
  onCategoryClick: (category: MilestoneCategory) => void;
  light?: boolean;
}

const categories: { key: MilestoneCategory; label: string }[] = [
  { key: "work", label: "Work" },
  { key: "research", label: "Research" },
  { key: "hackathon", label: "Hackathon" },
  { key: "leadership", label: "Leadership" },
  { key: "sidequest", label: "Side-quest" },
];

export default function CategoryNav({ activeCategory, onCategoryClick, light = false }: CategoryNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<MilestoneCategory, HTMLButtonElement>>(new Map());

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const activeButton = buttonRefs.current.get(activeCategory);
    if (!nav || !indicator || !activeButton) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = activeButton.getBoundingClientRect();

    indicator.style.left = `${btnRect.left - navRect.left}px`;
    indicator.style.width = `${btnRect.width}px`;
  }, [activeCategory]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  return (
    <nav ref={navRef} className="relative flex flex-row items-center justify-center" style={{ gap: "clamp(0px, 1vw, 12px)" }}>
      {/* Sliding blue indicator bar (bottom) */}
      <div
        ref={indicatorRef}
        className="absolute bottom-0 h-[2px] bg-blue-400 transition-all duration-300 ease-in-out"
        style={{ left: 0, width: 0 }}
      />
      {categories.map(({ key, label }) => {
        const isActive = activeCategory === key;
        return (
          <button
            key={key}
            ref={(el) => {
              if (el) buttonRefs.current.set(key, el);
            }}
            onClick={() => onCategoryClick(key)}
            className={`
              relative font-medium transition-colors duration-200
              px-[clamp(10px,1.8vw,24px)] py-[clamp(6px,1vh,14px)]
              ${isActive
                ? (light ? "text-gray-900" : "text-white")
                : (light ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-gray-200")
              }
            `}
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.35rem)" }}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
