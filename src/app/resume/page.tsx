import BackButton from "@/components/BackButton";
import { milestones, type MilestoneCategory } from "@/data/milestones";

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

function getCards(category: MilestoneCategory) {
  return milestones
    .filter((m) => m.category === category)
    .map((m) => ({
      title: m.subtitle || m.title,
      subtitle: m.subtitle ? m.title : "",
      date: m.date,
      bullets: m.bullets ?? [],
    }));
}

const experience = getCards("work");
const research = getCards("research");
const projects = getCards("hackathon");
const sidequest = getCards("sidequest");

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
          {sidequest.map((card, i) => (
            <ResumeCard key={i} {...card} />
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
