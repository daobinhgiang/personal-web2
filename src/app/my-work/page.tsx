import JourneyTimeline from "@/components/JourneyTimeline";

export default function MyWork() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">My Work</h1>
        <p className="text-xl text-gray-400">
          A timeline of my journey, milestones, and achievements.
        </p>
      </div>

      <JourneyTimeline />
    </div>
  );
}
