import Link from "next/link";

async function getAllPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.success ? data.posts : [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">Blog</h1>
          <p className="text-xl text-gray-600">
            Thoughts, ideas, and insights on web development and technology.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post: any) => (
              <article 
                key={post._id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300 hover:border-blue-200 group"
              >
                <time className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <h2 className="text-3xl font-bold mb-3 mt-3">
                  <Link 
                    href={`/blog/${post._id}`} 
                    className="text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {post.excerpt || post.content.substring(0, 200) + '...'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {post.author?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <span>{calculateReadTime(post.content)}</span>
                  </div>
                  <Link
                    href={`/blog/${post._id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group-hover:translate-x-1 transition-transform"
                  >
                    Read more
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No posts yet</h3>
              <p className="text-gray-600 mb-8">Start creating amazing content from your admin dashboard!</p>
              <Link 
                href="/admin" 
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
