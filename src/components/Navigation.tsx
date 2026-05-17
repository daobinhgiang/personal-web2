"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
  ];

  return (
    <nav className="sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-8 py-5">
        <div className="flex justify-center items-center">
          <div className="flex gap-10 text-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-white hover:scale-110 transition-all duration-300 ease-out ${
                  pathname === link.href ? "text-white font-medium" : "text-gray-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
