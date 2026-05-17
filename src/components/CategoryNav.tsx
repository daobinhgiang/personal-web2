"use client";

import { MilestoneCategory } from "./JourneyTimeline";

interface CategoryNavProps {
  activeCategory: MilestoneCategory;
  onCategoryClick: (category: MilestoneCategory) => void;
}

const categories: { key: MilestoneCategory; label: string }[] = [
  { key: "work", label: "Work" },
  { key: "research", label: "Research" },
  { key: "hackathon", label: "Hackathon" },
  { key: "leadership", label: "Leadership" },
  { key: "sidequest", label: "Side-quest" },
];

export default function CategoryNav({ activeCategory, onCategoryClick }: CategoryNavProps) {
  return (
    <nav className="flex flex-col justify-center gap-1 w-full">
      {categories.map(({ key, label }) => {
        const isActive = activeCategory === key;
        return (
          <button
            key={key}
            onClick={() => onCategoryClick(key)}
            className={`
              relative text-left font-medium transition-colors duration-200
              border-l-2 px-3 py-2
              ${isActive
                ? "border-blue-400 text-white"
                : "border-transparent text-gray-500 hover:text-gray-200"
              }
            `}
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.5rem)" }}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
