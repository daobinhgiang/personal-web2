import Link from "next/link";

async function getRecentPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    const data = await response.json();
    return data.success ? data.posts.slice(0, 3) : [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const recentPosts = await getRecentPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Hi, I&apos;m <span className="text-blue-600">Giang Dao</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
          Technologist and mental health advocate
        </p>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-4">
            I&apos;m a interested in the future of technology, particularly AI and biotechnology. Currently advocating for a more open-minded perspective about mental healthcare.
          </p>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Blogs</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            View all blogs →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="space-y-8">
            {recentPosts.map((post: any) => (
              <article key={post._id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <time className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <h3 className="text-xl font-semibold mb-2 mt-1">
                  <Link href={`/blog/${post._id}`} className="hover:text-blue-600">
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
