import BackButton from "@/components/BackButton";

export default function Resume() {
  return (
    <>
      <BackButton />
      <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-5xl font-bold mb-3 text-gray-100">Resume</h1>
        <p className="text-lg text-gray-500">
          My professional experience and skills
        </p>
      </div>

      {/* Experience Section */}
      <section className="mb-14">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Experience</h2>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Chief AI Officer</h3>
                <p className="text-sm text-gray-500">GNL VINA., JSC</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">April 2026 — Present</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Digitalized company operations, built GNL VINA&apos;s System with NextJS, TypeScript and Neon (Postgres); Railway hosting</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Standardized 5+ processes and benchmarked manufacturing ability at each step, estimating manufacturing outputs for production planning and resource allocation for a $4M PO</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Co-Founder</h3>
                <p className="text-sm text-gray-500">Kier Therapeutics, Inc.</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">August 2025 — April 2026</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Accepted to The Residency (backed by Sam Altman — CEO of OpenAI) as one of 6 out of 600 startups</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Led product development, built 4 versions of the app with Flutter & SwiftUI, Firebase, Mixpanel and Superwall</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Gathered feedback from 600+ users and managed 70+ member community for product/distribution insights</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Invited to speak at AI Tinkerers and Austria&apos;s National TV about Kier&apos;s mission</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Mentored by clinical advisors from Stanford & The Alliance for Eating Disorders</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">AI Engineer Intern</h3>
                <p className="text-sm text-gray-500">ETC Technology System., JSC</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">May 2025 — August 2025</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Developed a face tracking/recognition system for 25,000+ employees using YOLOv11 and Kalman filter, achieved 92% accuracy with 350ms latency; deployed with Docker, Triton serving and JMeter stress testing</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Built a RAG pipeline with Pinecone, MedEmbed-large-v0.1 for embeddings, and Qwen3-8B for medical questions</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Built an Android app with Kotlin for collecting edge case data, improving acquisition speed by 40% with 99% accuracy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="mb-14">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Research</h2>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Biomedical Researcher</h3>
                <p className="text-sm text-gray-500">Cullen College of Engineering | University of Houston</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">September 2025 — Present</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Researched DSPy framework & developed algorithms & models to improve cell tracking with 10+ biomedical datasets</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">AI Researcher — Computational Wellbeing Group</h3>
                <p className="text-sm text-gray-500">Rice University Electrical & Computer Engineering</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">August 2025 — Present</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Awarded Best Presentation at the Ken Kennedy Institute&apos;s AI in Health Conference</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Designed 50+ prompts to evaluate various proprietary & open-source LLMs on psychotherapy safety for mental health applications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-14">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Education</h2>
        <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
            <div>
              <h3 className="text-lg font-semibold text-gray-100">Bachelor of Science in Computer Science</h3>
              <p className="text-sm text-gray-500">University of Houston</p>
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">August 2023 — Present</span>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-14">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Skills</h2>
        <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Backend & AI</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "Node.js", "PostgreSQL", "Firebase", "Docker", "YOLOv11", "RAG", "DSPy"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Mobile & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {["Flutter", "SwiftUI", "Kotlin", "Git", "AWS", "Mixpanel"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
