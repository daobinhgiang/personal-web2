"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function NewPost() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          author: user?.name || user?.email || 'Admin',
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Post created successfully!");
        router.push('/admin');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSaving(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <BackButton />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
              <p className="text-sm text-gray-600">
                Share your thoughts with the world
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Post Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your post title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-lg"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Optional)
              </label>
              <input
                type="text"
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A brief summary of your post..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                This will be shown in post previews and search results
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content here..."
                rows={16}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none font-mono text-sm resize-y"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Supports markdown formatting
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-between items-center">
            <Link
              href="/admin"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </Link>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                onClick={() => {
                  // TODO: Implement save as draft functionality
                  alert("Save as draft functionality coming soon!");
                }}
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSaving ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </div>
        </form>

        {/* Writing Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Writing Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Use clear and descriptive titles to attract readers</li>
            <li>• Write a compelling excerpt that summarizes your post</li>
            <li>• Break up long paragraphs for better readability</li>
            <li>• Use markdown for formatting (headings, lists, code blocks, etc.)</li>
            <li>• Proofread before publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
