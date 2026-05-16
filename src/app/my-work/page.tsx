import JourneyTimeline from "@/components/JourneyTimeline";
import Navigation from "@/components/Navigation";

export default function MyWork() {
  return (
    <>
      <Navigation />
      <div className="max-w-[75vw] mx-auto px-[5vw] w-full pb-20">
        <div className="mb-[5vw] pt-[6vw]">
          <h1 className="text-[clamp(2.5rem,6.5vw,6rem)] font-bold leading-[1.1]">
            My Work
          </h1>
          <p className="text-[clamp(1.1rem,2vw,2rem)] text-gray-400 mt-[0.8vw]">
            A timeline of my journey, milestones, and achievements.
          </p>
        </div>

        <JourneyTimeline />
      </div>
    </>
  );
}
