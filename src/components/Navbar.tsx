"use client";
import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    {href: "/#register", label: "Register"},
    {href: "/about", label: "About"},
    {href: "/achievements", label: "Achievement"},
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      if (
        (pathname === "/" || pathname === "/#") &&
        typeof window !== "undefined"
      ) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({behavior: "smooth", block: "start"});
          setIsOpen(false);
          return;
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800/80 backdrop-blur text-white p-4 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="text-xl font-bold">
          <Link href="/">Logo</Link>
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-gray-300 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col items-center space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
