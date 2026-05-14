import Link from "next/link";
import Image from "next/image";
import JourneyTimeline from "@/components/JourneyTimeline";
import ThemeTransition from "@/components/ThemeTransition";
import { getDatabase } from "@/lib/mongodb";

async function getRecentPosts() {
  try {
    const db = await getDatabase();
    const posts = await db
      .collection('posts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const recentPosts = await getRecentPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <ThemeTransition />

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center -mt-20 pb-20 snap-start">
        <div className="flex items-start justify-between gap-[3vw]">
          <div>
            <div className="mb-[3vh]">
              <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-bold text-balance">
                Giang Dao
              </h1>
              <p className="text-[clamp(1rem,2vw,1.5rem)] text-gray-500 mt-2">
                AI Engineer & Technologist
              </p>
            </div>
            <p className="text-gray-600 text-[clamp(1rem,1.8vw,1.25rem)] max-w-xl mb-[4vh] leading-relaxed">
              <br />
              Currently learning about manufacturing processes and automation.
            </p>
          </div>
          <Image
            src="/profile.jpg"
            alt="Giang Dao"
            width={240}
            height={240}
            className="rounded-full object-cover w-[clamp(120px,15vw,240px)] h-[clamp(120px,15vw,240px)] ring-2 ring-gray-200 flex-shrink-0"
            priority
          />
        </div>
      </section>

      {/* Transition zone: hero → dark */}
      <div id="theme-transition-zone" className="h-[40vh] snap-start" />

      {/* Journey Timeline */}
      <JourneyTimeline />

      {/* Transition zone: dark → light */}
      <div id="theme-transition-end" className="h-[20vh]" />

      {/* Recent Blog Posts */}
      <section className="snap-start">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Blogs</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            View all blogs →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="space-y-8">
            {recentPosts.map((post: any) => (
              <article key={post._id.toString()} className="border-b border-gray-200 pb-8 last:border-b-0">
                <time className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <h3 className="text-xl font-semibold mb-2 mt-1">
                  <Link href={`/blog/${post._id.toString()}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600">
                  {post.excerpt || post.content.substring(0, 150) + '...'}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">No blogs yet. Create your first blog from the admin dashboard!</p>
            <Link 
              href="/admin" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Go to Admin Dashboard →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
