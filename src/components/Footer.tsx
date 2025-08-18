"use client";

import { useState } from "react";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");

  const linkGroups = [
    {
      title: "Event",
      links: [
        { href: "/#schedule", label: "Schedule" },
        { href: "/#speakers", label: "Speakers" },
        { href: "/#tracks", label: "Tracks" },
        { href: "/#sponsors", label: "Sponsors" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/about", label: "About" },
        { href: "/achievements", label: "Achievements" },
        { href: "/#faq", label: "FAQ" },
        { href: "/#contact", label: "Contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/terms", label: "Terms" },
        { href: "/privacy", label: "Privacy" },
        { href: "/code-of-conduct", label: "Code of Conduct" },
        { href: "/cookies", label: "Cookies" },
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer
      aria-label="Footer"
      className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-930 to-gray-950 text-gray-300"
    >
      {/* subtle radial accents (no card) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] translate-x-1/3 translate-y-1/3 rounded-full bg-gray-500/10 blur-3xl" />
      </div>

      <div className="relative w-full px-6 md:px-12 lg:px-20 py-16">
        <div className="grid w-full gap-14 lg:gap-20 lg:grid-cols-[minmax(260px,340px)_repeat(3,1fr)]">

            <div>
              <Link
                href="/"
                className="text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
              >
                Logo
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-400 max-w-xs">
                Build. Ship. Iterate. A focused space for collaborative innovation.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col sm:flex-row gap-3 max-w-sm"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-md bg-gray-900/70 border border-gray-800 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 px-4 py-2 text-sm placeholder-gray-500 outline-none transition"
                />
                <button
                  type="submit"
                  className="rounded-md bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 px-5 py-2 text-sm font-medium text-white transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex text-sm text-gray-400 hover:text-white transition"
                    >
                      <span className="relative">
                        {l.label}
                        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-gray-500 to-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        {/* Bottom meta */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} Hackathon. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-2 text-[11px]">
            <Link href="/accessibility" className="hover:text-white text-gray-400 transition">Accessibility</Link>
            <Link href="/privacy" className="hover:text-white text-gray-400 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white text-gray-400 transition">Terms</Link>
            <Link href="/status" className="hover:text-white text-gray-400 transition">Status</Link>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] tracking-wide text-gray-600">
          Sleek. Minimal. Performance-focused.
        </p>
      </div>
    </footer>
  );
};

export default Footer;