export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Resume</h1>
        <p className="text-xl text-gray-600">
          My professional experience and skills
        </p>
      </div>

      {/* Experience Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-gray-200">Experience</h2>
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold">Senior Software Engineer</h3>
                <p className="text-gray-600">Company Name</p>
              </div>
              <span className="text-gray-500">2022 - Present</span>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Led development of key features that improved user engagement by 40%</li>
              <li>Mentored junior developers and conducted code reviews</li>
              <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold">Software Engineer</h3>
                <p className="text-gray-600">Another Company</p>
              </div>
              <span className="text-gray-500">2020 - 2022</span>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Built and maintained multiple web applications using React and Node.js</li>
              <li>Collaborated with design team to implement pixel-perfect UIs</li>
              <li>Optimized application performance and reduced load times by 50%</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold">Junior Developer</h3>
                <p className="text-gray-600">First Company</p>
              </div>
              <span className="text-gray-500">2018 - 2020</span>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Developed responsive web applications using modern JavaScript frameworks</li>
              <li>Participated in agile development process and sprint planning</li>
              <li>Fixed bugs and implemented new features based on user feedback</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-gray-200">Education</h2>
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
              <p className="text-gray-600">University Name</p>
            </div>
            <span className="text-gray-500">2014 - 2018</span>
          </div>
          <p className="text-gray-600 ml-4">GPA: 3.8/4.0</p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-gray-200">Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Tools & Others</h3>
            <div className="flex flex-wrap gap-2">
              {["Git", "Docker", "AWS", "CI/CD", "Agile"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Resume Button */}
      <div className="text-center">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Download PDF Resume
        </button>
      </div>
    </div>
  );
}
