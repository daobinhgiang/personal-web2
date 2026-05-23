export type MilestoneCategory = "work" | "research" | "hackathon" | "sidequest";

export interface Milestone {
  date: string;
  startDate: string; // YYYY-MM
  endDate?: string; // YYYY-MM; omit for ongoing roles
  title: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  image?: string;
  imageSize?: "sm" | "md";
  images?: string[];
  link?: string;
  headerLink?: string;
  category: MilestoneCategory;
  award?: string;
}

// Category display order — items within each category are auto-sorted by date (latest first)
export const CATEGORY_ORDER: MilestoneCategory[] = ["work", "research", "hackathon", "sidequest"];

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
    title: "GNL VINA., JSC",
    subtitle: "Chief AI Officer",
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
    title: "Kier Therapeutics, Inc.",
    subtitle: "Co-Founder",
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
    title: "ETC Technology System., JSC",
    subtitle: "AI Engineer Intern",
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
    title: "Cullen College of Engineering | University of Houston",
    subtitle: "Biomedical Researcher",
    bullets: [
      "Researched DSPy framework & develop algorithms & models to improve cells tracking with 10+ biomedical dataset",
    ],
    category: "research",
  },
  {
    date: "August 2025 — December 2025",
    startDate: "2025-08",
    endDate: "2025-12",
    title: "Rice University",
    subtitle: "AI Researcher — Computational Wellbeing Group",
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
    bullets: [
      "Presented original AI depression research at the HPE competition, exploring the intersection of AI and mental health.",
    ],
    image: "/timeline/uh-research.jpg",
    category: "research",
  },
  // --- Hackathon ---
  {
    date: "Mar 2025",
    startDate: "2025-03",
    endDate: "2025-03",
    title: "Harvard Rare Diseases Hackathon",
    subtitle: "Software Engineer",
    bullets: [
      "Created a Flask app that monitors rare disease patients' health and provides personalized support for nutritional analysis",
      "Constructed 6+ functions, including voice interaction using Google Speech Recognition, achieving wake-word detection with a 25% improvement in navigation speed",
      "Received scholarship from Harvard that covered travel and living expenses for the 2-day hackathon",
    ],
    image: "/timeline/harvard-hackathon.jpg",
    imageSize: "sm",
    link: "https://github.com/daobinhgiang/HackRareOhana",
    category: "hackathon",
  },
  {
    date: "Jan 2024",
    startDate: "2024-01",
    endDate: "2024-01",
    title: "TAMUHack X",
    subtitle: "Front-end Engineer",
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
    title: "Rice Datathon 2024",
    subtitle: "Data Scientist",
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
    title: "Kier Therapeutics",
    subtitle: "My Interview with Austria's National TV",
    bullets: [
      "Featured on Austria's National TV, sharing our story and mission with Kier Therapeutics to Europe.",
    ],
    images: ["/timeline/austria-tv.png", "/timeline/austria-tv-2.jpg"],
    link: "https://www.linkedin.com/posts/giang-mdao_national-tv-of-europe-interviewed-us-about-activity-7438246610373083136-zg7v?utm_source=share&utm_medium=member_desktop&rcm=ACoAAENiUkgBbc6bFq4yrTBZeiQ6aGcmhlOf1jQ",
    category: "sidequest",
  },
  {
    date: "Feb 2026",
    startDate: "2026-02",
    endDate: "2026-02",
    title: "AI Tinkerers",
    subtitle: "AI in Healthcare Talk",
    headerLink: "https://aitinkerers.org/",
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
    bullets: [
      "Met Peter, the creator of OpenClaw, during The Residency Vienna.",
    ],
    image: "/timeline/peter-steinberger.jpg",
    imageSize: "sm",
    link: "https://www.linkedin.com/in/giangmichaeldao/",
    category: "sidequest",
  },
  {
    date: "Dec 2025",
    startDate: "2025-12",
    endDate: "2025-12",
    title: "Code[Coogs]",
    subtitle: "President",
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
    title: "Code[Coogs]",
    subtitle: "VP of Operations",
    bullets: [
      "Promoted to VP of Operations at CodeCoogs.",
    ],
    category: "sidequest",
  },
  {
    date: "Mar 2025",
    startDate: "2025-03",
    endDate: "2025-03",
    title: "AI for Good",
    subtitle: "Young AI Leader",
    bullets: [
      "Selected as a Young AI Leader for the AI for Good initiative, advocating for responsible and impactful AI development.",
    ],
    category: "sidequest",
  },
  {
    date: "Feb 2025",
    startDate: "2025-02",
    endDate: "2025-02",
    title: "Code[Coogs]",
    subtitle: "Collab Director",
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
    title: "Code[Coogs]",
    subtitle: "Collaboration Director",
    bullets: [
      "Officially switched my major to Computer Science and joined CodeCoogs as Collaboration Director, diving deeper into the tech community.",
    ],
    category: "sidequest",
  },
  {
    date: "Sep 2024",
    startDate: "2024-09",
    endDate: "2024-09",
    title: "University of Houston",
    subtitle: "Founded Ping Pong Club",
    bullets: [
      "Founded the Ping Pong club at UH, bringing together students through friendly competition and community.",
    ],
    category: "sidequest",
  },
  {
    date: "Apr 2024",
    startDate: "2024-04",
    endDate: "2024-04",
    title: "Amazon Web Services",
    subtitle: "AWS Certified Cloud Practitioner",
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
    title: "University of Houston",
    subtitle: "Joined University of Houston",
    bullets: [
      "Started my college journey at UH, eager to explore technology and find my path in software engineering.",
    ],
    category: "sidequest",
  },
];

// Auto-sort: group by category order, then sort within each category by date descending
export const milestones: Milestone[] = CATEGORY_ORDER.flatMap((cat) =>
  rawMilestones
    .filter((m) => m.category === cat)
    .sort(compareMilestones)
);
