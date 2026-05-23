import BackButton from "@/components/BackButton";

interface ResumeCardProps {
  title: string;
  subtitle: string;
  date: string;
  bullets: string[];
}

function ResumeCard({ title, subtitle, date, bullets }: ResumeCardProps) {
  return (
    <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap">{date}</span>
      </div>
      {bullets.length > 0 && (
        <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>{b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const experience = [
  {
    title: "Chief AI Officer",
    subtitle: "GNL VINA., JSC",
    date: "April 2026 — Present",
    bullets: [
      "Digitalized company operations, built GNL VINA's System with NextJS, TypeScript and Neon (Postgres); Railway hosting",
      "Standardized 5+ processes and benchmarked manufacturing ability at each step, estimating manufacturing outputs for production planning and resource allocation for a $4M PO",
    ],
  },
  {
    title: "Co-Founder",
    subtitle: "Kier Therapeutics, Inc.",
    date: "August 2025 — April 2026",
    bullets: [
      "Accepted to The Residency (backed by Sam Altman — CEO of OpenAI) as one of 6 out of 600 startups",
      "Built product and gathered feedback, built 4 versions of Nurtra with Flutter & SwiftUI, Firebase, Mixpanel and Superwall",
      "Grew to 600+ users, managed 70+ members community; achieved 200k+ views/300+ followers across all platforms",
      "Invited to speak at AI Tinkerers and Austria's National TV about Kier's mission",
      "Mentored by clinical advisors from Stanford & The Alliance for Eating Disorders",
    ],
  },
  {
    title: "AI Engineer Intern",
    subtitle: "ETC Technology System., JSC",
    date: "May 2025 — August 2025",
    bullets: [
      "Developed a face tracking/recognition system for 25,000+ employees using YOLOv11 and Kalman filter, achieved 92% accuracy with 350ms latency; deployed with Docker, Triton serving and JMeter stress testing",
      "Built a RAG pipeline with Pinecone, MedEmbed-large-v0.1 for embeddings, and Qwen3-8B for medical questions",
      "Built an Android app with Kotlin for collecting edge case data, improving acquisition speed by 40% with 99% accuracy",
    ],
  },
];

const research = [
  {
    title: "Biomedical Researcher",
    subtitle: "Cullen College of Engineering | University of Houston",
    date: "September 2025 — December 2025",
    bullets: [
      "Researched DSPy framework & developed algorithms & models to improve cell tracking with 10+ biomedical datasets",
    ],
  },
  {
    title: "AI Researcher — Computational Wellbeing Group",
    subtitle: "Rice University",
    date: "August 2025 — December 2025",
    bullets: [
      "Awarded Best Presentation at the Ken Kennedy Institute's AI in Health Conference",
      "Designed 50+ prompts to evaluate various proprietary & open-source LLMs on psychotherapy safety for mental health applications",
    ],
  },
];

const projects = [
  {
    title: "Harvard Rare Diseases Hackathon",
    subtitle: "Software Engineer | Flask, Python, Google AI Studio",
    date: "March 2025",
    bullets: [
      "Created a Flask app that monitors rare disease patients' health and provides personalized support for nutritional analysis",
      "Constructed 6+ functions, including voice interaction using Google Speech Recognition, achieving wake-word detection with a 25% improvement in navigation speed, rare disease search, and tracking of 50+ distinct nutrients",
      "Received scholarship from Harvard that covered travel and living expenses for the 2-day hackathon",
    ],
  },
  {
    title: "TAMUhack X — 1st Place Winner",
    subtitle: "Front-end Engineer | HTML/CSS, JavaScript",
    date: "January 2024",
    bullets: [
      "Engineered a Chrome Extension with SafeBrowsing API to detect phishing links with 95% accuracy; won 1st place",
    ],
  },
  {
    title: "Rice Datathon 2024 — Best Visiting Team",
    subtitle: "Data Scientist | Python, Excel",
    date: "January 2024",
    bullets: [
      'Competed in a team of 2 against over 550+ students across Houston, received recognition as "The Best Visiting Team"',
      "Processed a dataset of 100,000+ examples, removed 5,000+ outliers to weight different harmful substances",
    ],
  },
];

const leadership = [
  {
    title: "President",
    subtitle: "Code[Coogs]",
    date: "December 2025 — Present",
    bullets: [
      "Coordinated with 40+ officers on 30+ Workshops and Social events to promote culture and engagement within the CS community, resulting in a 30% increase in member counts and a 40% rise in member retention",
      "Facilitated 3 projects and 10+ large-scale events such as Professional Development workshops, Hackathon, and Team Projects with Fortune 500 Companies, secured $5,000+ in annual sponsorship for club's operation",
    ],
  },
];

const certifications = [
  "AWS Certified Cloud Practitioner (May 2024)",
  "Microsoft Office Specialist (MOS) in Excel (2022)",
];

const skills = [
  {
    label: "Languages",
    items: ["Python", "C++", "HTML/CSS", "JavaScript", "TypeScript", "SwiftUI"],
    color: "blue" as const,
  },
  {
    label: "Frameworks & Libraries",
    items: ["Flask", "React", "React Native", "Next.js", "Flutter", "Kotlin", "Bootstrap", "Tailwind CSS", "Node.js", "Express.js"],
    color: "emerald" as const,
  },
  {
    label: "AI/ML & Data",
    items: ["TensorFlow", "PyTorch", "HuggingFace (BERT)", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    color: "purple" as const,
  },
];

const skillColors = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const sections = [
  { label: "Experience", items: experience },
  { label: "Research", items: research },
] as const;

export default function Resume() {
  return (
    <>
      <BackButton />
      <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16 fade-in-up" style={{ animationDelay: "0.05s" }}>
        <h1 className="text-5xl font-bold mb-3 text-gray-100">Resume</h1>
        <p className="text-lg text-gray-500">
          My professional experience and skills
        </p>
      </div>

      {/* Experience & Research — data-driven */}
      {sections.map(({ label, items }, si) => (
        <section key={label} className="mb-14 fade-in-up" style={{ animationDelay: `${0.1 + si * 0.05}s` }}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">{label}</h2>
          <div className="space-y-6">
            {items.map((card, ci) => (
              <ResumeCard key={ci} {...card} />
            ))}
          </div>
        </section>
      ))}

      {/* Education */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Education</h2>
        <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Bachelor of Science in Computer Science</h3>
              <p className="text-sm text-gray-500">College of Natural Sciences and Mathematics | University of Houston</p>
              <p className="text-sm text-gray-500">Minor in Business Administration</p>
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">Fall 2027</span>
          </div>
          <p className="text-sm text-gray-400">Cumulative GPA: 3.5/4.00</p>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.25s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Certifications</h2>
        <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Skills</h2>
        <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map(({ label, items, color }) => (
              <div key={label}>
                <h3 className="text-sm font-medium text-gray-300 mb-3">{label}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${skillColors[color]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.35s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Projects</h2>
        <div className="space-y-6">
          {projects.map((card, i) => (
            <ResumeCard key={i} {...card} />
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Leadership</h2>
        <div className="space-y-6">
          {leadership.map((card, i) => (
            <ResumeCard key={i} {...card} />
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
