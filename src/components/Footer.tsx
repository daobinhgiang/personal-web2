export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-gray-600 text-sm">
              Personal website and blog. Sharing thoughts and projects.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-600 text-sm hover:text-blue-600">
                Home
              </a>
              <a href="/blog" className="block text-gray-600 text-sm hover:text-blue-600">
                Blog
              </a>
              <a href="/contact" className="block text-gray-600 text-sm hover:text-blue-600">
                Contact
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="space-y-2">
              <a
                href="https://linkedin.com/in/giang-mdao"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 text-sm hover:text-blue-600"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/giangm_mdao"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 text-sm hover:text-blue-600"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          © {currentYear} Giang Dao. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
