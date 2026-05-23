import BackButton from "@/components/BackButton";

export default function Resume() {
  return (
    <>
      <BackButton />
      <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16 fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-5xl font-bold mb-3 text-gray-100">Resume</h1>
        <p className="text-lg text-gray-500">
          My professional experience and skills
        </p>
      </div>

      {/* Experience Section */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.2s" }}>
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
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Built product and gathered feedback, built 4 versions of Nurtra with Flutter & SwiftUI, Firebase, Mixpanel and Superwall</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Grew to 600+ users, managed 70+ members community; achieved 200k+ views/300+ followers across all platforms</li>
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
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.35s" }}>
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
                <p className="text-sm text-gray-500">Rice University</p>
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
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.5s" }}>
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

      {/* Certifications Section */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.65s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Certifications</h2>
        <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
          <div className="flex flex-wrap gap-2">
            {["AWS Certified Cloud Practitioner (May 2024)", "Microsoft Office Specialist (MOS) in Excel (2022)"].map((cert) => (
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

      {/* Skills Section */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Skills</h2>
        <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "C++", "HTML/CSS", "JavaScript", "TypeScript", "SwiftUI"].map((skill) => (
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
              <h3 className="text-sm font-medium text-gray-300 mb-3">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {["Flask", "React", "React Native", "Next.js", "Flutter", "Kotlin", "Bootstrap", "Tailwind CSS", "Node.js", "Express.js"].map((skill) => (
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
              <h3 className="text-sm font-medium text-gray-300 mb-3">AI/ML & Data</h3>
              <div className="flex flex-wrap gap-2">
                {["TensorFlow", "PyTorch", "HuggingFace (BERT)", "Pandas", "NumPy", "Matplotlib", "Seaborn"].map((skill) => (
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

      {/* Projects Section */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "0.95s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Projects</h2>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Harvard Rare Diseases Hackathon</h3>
                <p className="text-sm text-gray-500">Software Engineer | Flask, Python, Google AI Studio</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">March 2025</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Created a Flask app that monitors rare disease patients&apos; health and provides personalized support for nutritional analysis</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Constructed 6+ functions, including voice interaction using Google Speech Recognition, achieving wake-word detection with a 25% improvement in navigation speed, rare disease search, and tracking of 50+ distinct nutrients</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Received scholarship from Harvard that covered travel and living expenses for the 2-day hackathon</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">TAMUhack X — 1st Place Winner</h3>
                <p className="text-sm text-gray-500">Front-end Engineer | HTML/CSS, JavaScript</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">January 2024</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Engineered a Chrome Extension with SafeBrowsing API to detect phishing links with 95% accuracy; won 1st place</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Rice Datathon 2024 — Best Visiting Team</h3>
                <p className="text-sm text-gray-500">Data Scientist | Python, Excel</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">January 2024</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Competed in a team of 2 against over 550+ students across Houston, received recognition as &quot;The Best Visiting Team&quot;</li>
              <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Processed a dataset of 100,000+ examples, removed 5,000+ outliers to weight different harmful substances</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="mb-14 fade-in-up" style={{ animationDelay: "1.1s" }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Leadership</h2>
        <div className="rounded-xl border border-gray-800/60 bg-[#141414] p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-100">President</h3>
              <p className="text-sm text-gray-500">Code[Coogs]</p>
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">December 2025 — Present</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Coordinated with 40+ officers on 30+ Workshops and Social events to promote culture and engagement within the CS community, resulting in a 30% increase in member counts and a 40% rise in member retention</li>
            <li className="flex gap-2"><span className="text-blue-400/60 mt-1 shrink-0">&#8226;</span>Facilitated 3 projects and 10+ large-scale events such as Professional Development workshops, Hackathon, and Team Projects with Fortune 500 Companies, secured $5,000+ in annual sponsorship for club&apos;s operation</li>
          </ul>
        </div>
      </section>
    </div>
    </>
  );
}
