import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts/${id}`,
      { cache: 'no-store' }
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.success ? data.post : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

function formatInlineMarkdown(text: string): string {
  let formatted = text;
  
  // Inline code (before bold/italic to avoid conflicts)
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-pink-600 px-2 py-0.5 rounded text-base font-mono">$1</code>');
  
  // Bold
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  
  // Italic
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
  
  // Links
  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
  
  return formatted;
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Navigation */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors font-medium group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          <span className="ml-2">Back to Blog</span>
        </Link>

        {/* Post Header */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <header className="px-8 pt-12 pb-8 border-b border-gray-100">
            <time className="text-sm font-medium text-blue-600 mb-4 block uppercase tracking-wide">
              {new Date(post.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-900">{post.author}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span>{calculateReadTime(post.content)}</span>
            </div>
          </header>

          {/* Post Excerpt */}
          {post.excerpt && (
            <div className="mx-8 mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg text-gray-700 italic leading-relaxed">{post.excerpt}</p>
            </div>
          )}

        {/* Post Content */}
        <div className="px-8 py-12 prose prose-lg max-w-none">
          {(() => {
            const lines = post.content.split('\n');
            const elements: JSX.Element[] = [];
            let inCodeBlock = false;
            let codeBlockContent: string[] = [];
            let codeBlockLanguage = '';

            lines.forEach((line: string, index: number) => {
              // Handle code blocks
              if (line.startsWith('```')) {
                if (!inCodeBlock) {
                  inCodeBlock = true;
                  codeBlockLanguage = line.substring(3).trim();
                  codeBlockContent = [];
                } else {
                  inCodeBlock = false;
                  elements.push(
                    <pre key={`code-${index}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm">
                      <code>{codeBlockContent.join('\n')}</code>
                    </pre>
                  );
                  codeBlockContent = [];
                }
                return;
              }

              if (inCodeBlock) {
                codeBlockContent.push(line);
                return;
              }

              // Skip empty lines
              if (!line.trim()) {
                elements.push(<div key={`space-${index}`} className="h-2" />);
                return;
              }

              let formattedLine = line;

              // Headers
              if (formattedLine.startsWith('# ')) {
                elements.push(
                  <h1 key={index} className="text-3xl font-bold mt-10 mb-4 text-gray-900">
                    {formattedLine.substring(2)}
                  </h1>
                );
                return;
              }
              if (formattedLine.startsWith('## ')) {
                elements.push(
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-3 text-gray-900">
                    {formattedLine.substring(3)}
                  </h2>
                );
                return;
              }
              if (formattedLine.startsWith('### ')) {
                elements.push(
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-2 text-gray-900">
                    {formattedLine.substring(4)}
                  </h3>
                );
                return;
              }

              // Blockquotes
              if (formattedLine.startsWith('> ')) {
                elements.push(
                  <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 bg-gray-50">
                    {formattedLine.substring(2)}
                  </blockquote>
                );
                return;
              }

              // Horizontal rule
              if (formattedLine === '---' || formattedLine === '___') {
                elements.push(<hr key={index} className="my-8 border-gray-300" />);
                return;
              }

              // Unordered lists
              if (formattedLine.match(/^[\*\-]\s/)) {
                const content = formattedLine.substring(2);
                elements.push(
                  <li key={index} className="ml-6 mb-2 text-gray-700 list-disc">
                    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(content) }} />
                  </li>
                );
                return;
              }

              // Ordered lists
              if (formattedLine.match(/^\d+\.\s/)) {
                const content = formattedLine.substring(formattedLine.indexOf('.') + 2);
                elements.push(
                  <li key={index} className="ml-6 mb-2 text-gray-700 list-decimal">
                    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(content) }} />
                  </li>
                );
                return;
              }

              // Regular paragraphs
              elements.push(
                <p 
                  key={index} 
                  className="mb-4 text-gray-800 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(formattedLine) }}
                />
              );
            });

            return elements;
          })()}
        </div>

        {/* Post Footer */}
        <footer className="px-8 pb-8 mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-gray-500">
              Last updated: {new Date(post.updatedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <Link 
              href="/blog" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors group inline-flex items-center"
            >
              <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
              <span className="ml-2">Back to all posts</span>
            </Link>
          </div>
        </footer>
      </article>
      </div>
    </div>
  );
}
