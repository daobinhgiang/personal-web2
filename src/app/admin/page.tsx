"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("7days");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    totalPosts: 0,
    avgReadTime: "0 min",
    viewsChange: "+0%",
    visitorsChange: "+0%",
    postsChange: "+0",
    readTimeChange: "+0 min",
  });

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();

      if (data.authenticated && data.user) {
        setUser(data.user);
        setIsLoading(false);
      } else {
        router.push('/adminlogin');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/adminlogin');
    }
  }, [router]);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/adminlogin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedPosts([]);
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPosts((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedPosts.length === 0) {
      alert("Please select at least one post to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedPosts.length} post(s)? This action cannot be undone.`
    );

    if (confirmDelete) {
      try {
        // Use batch delete endpoint for better performance
        const response = await fetch('/api/posts/batch-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postIds: selectedPosts }),
        });

        const data = await response.json();

        if (data.success) {
          alert(`Successfully deleted ${data.deletedCount} post(s)`);
          // Refresh posts list
          await fetchPosts();
        } else {
          alert(`Failed to delete posts: ${data.error}`);
        }

        setIsDeleteMode(false);
        setSelectedPosts([]);
      } catch (error) {
        console.error('Error deleting posts:', error);
        alert('Failed to delete posts. Please try again.');
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === recentPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(recentPosts.map((post) => post._id));
    }
  };

  // Fetch posts from database
  useEffect(() => {
    if (!isLoading && user) {
      fetchPosts();
    }
  }, [isLoading, user]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      
      if (data.success) {
        setRecentPosts(data.posts);
        setStats(prev => ({
          ...prev,
          totalPosts: data.posts.length,
        }));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const recentActivity = [
    { action: "New comment on 'Getting Started with Next.js 14'", time: "2 hours ago" },
    { action: "Post 'The Power of TypeScript' reached 1,000 views", time: "5 hours ago" },
    { action: "New subscriber: john@example.com", time: "1 day ago" },
    { action: "Post published: 'Building Beautiful UIs'", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {user?.name || user?.email}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              >
                <option value="24hours">Last 24 hours</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
              <Link
                href="/"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Views</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</h3>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {stats.viewsChange}
              </span>
            </div>
            <p className="text-xs text-gray-500">vs. previous period</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unique Visitors</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.uniqueVisitors.toLocaleString()}</h3>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {stats.visitorsChange}
              </span>
            </div>
            <p className="text-xs text-gray-500">vs. previous period</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Posts</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalPosts}</h3>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {stats.postsChange}
              </span>
            </div>
            <p className="text-xs text-gray-500">vs. previous period</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Read Time</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.avgReadTime}</h3>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                {stats.readTimeChange}
              </span>
            </div>
            <p className="text-xs text-gray-500">vs. previous period</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
                  <div className="flex gap-3">
                    {isDeleteMode && (
                      <>
                        <button
                          onClick={handleSelectAll}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                          {selectedPosts.length === recentPosts.length ? "Deselect All" : "Select All"}
                        </button>
                        <button
                          onClick={handleDeleteSelected}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          disabled={selectedPosts.length === 0}
                        >
                          Delete ({selectedPosts.length})
                        </button>
                        <button
                          onClick={handleDeleteMode}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {!isDeleteMode && (
                      <>
                        <button
                          onClick={handleDeleteMode}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Delete Posts
                        </button>
                        <Link
                          href="/admin/new-post"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          + New Post
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => {
                    const calculateReadTime = (content: string) => {
                      const wordsPerMinute = 200;
                      const wordCount = content.trim().split(/\s+/).length;
                      const minutes = Math.ceil(wordCount / wordsPerMinute);
                      return `${minutes} min`;
                    };

                    return (
                      <div 
                        key={post._id} 
                        className={`p-6 transition-colors ${
                          isDeleteMode 
                            ? selectedPosts.includes(post._id)
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex gap-4 items-start mb-3">
                          {isDeleteMode && (
                            <div className="flex items-center mt-1">
                              <input
                                type="checkbox"
                                checked={selectedPosts.includes(post._id)}
                                onChange={() => handleSelectPost(post._id)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                            </div>
                          )}
                          <div className="flex justify-between items-start flex-1">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {post.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                <span>•</span>
                                <span>{calculateReadTime(post.content)} read</span>
                                <span>•</span>
                                <span>by {post.author}</span>
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              Published
                            </span>
                          </div>
                        </div>
                        {!isDeleteMode && (
                          <div className="flex gap-3 ml-0">
                            <Link href={`/blog/${post._id}`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              View
                            </Link>
                            <button 
                              onClick={async () => {
                                const confirmDelete = window.confirm(`Are you sure you want to delete "${post.title}"?`);
                                if (confirmDelete) {
                                  try {
                                    const response = await fetch(`/api/posts/${post._id}`, { method: 'DELETE' });
                                    if (response.ok) {
                                      alert('Post deleted successfully');
                                      await fetchPosts();
                                    } else {
                                      alert('Failed to delete post');
                                    }
                                  } catch (error) {
                                    console.error('Error deleting post:', error);
                                    alert('Failed to delete post');
                                  }
                                }
                              }}
                              className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <p className="mb-4">No posts yet. Create your first post!</p>
                    <Link
                      href="/admin/new-post"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Create Post
                    </Link>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Posts →
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/admin/new-post"
                  className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium block"
                >
                  📝 Create New Post
                </Link>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  📊 View Analytics
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  💬 Manage Comments
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  ⚙️ Settings
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Website Health */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Website Health</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Load Time</span>
                  <span className="text-sm font-medium text-gray-900">1.2s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium text-gray-900">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
