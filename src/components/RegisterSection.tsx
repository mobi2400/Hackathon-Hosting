"use client";
import Link from "next/link";
import {JSX} from "react";

type Card = {
  id: string;
  title: string;
  description: string;
  accent: string;
  icon: JSX.Element;
  href: string;
};

const cards: Card[] = [
  {
    id: "participant",
    title: "Participant",
    description:
      "Build innovative solutions, collaborate with peers, iterate fast, and ship a polished project.",
    accent: "from-indigo-400/30 via-indigo-400/10 to-transparent",
    href: "/apply/participant",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-indigo-300">
        <path
          fill="currentColor"
          d="M12 12.75a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5Zm0 2.25c-4.97 0-9 2.455-9 5.483C3 22.09 3.91 23 5.034 23h13.932A2.034 2.034 0 0 0 21 20.483C21 17.455 16.97 15 12 15Z"
        />
      </svg>
    ),
  },
  {
    id: "organizer",
    title: "Organizer",
    description:
      "Design tracks, manage logistics, curate mentors, and keep the energy flowing smoothly.",
    accent: "from-emerald-400/30 via-emerald-400/10 to-transparent",
    href: "/organizer",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-300">
        <path
          fill="currentColor"
          d="M6 3h12a2 2 0 0 1 2 2v4H4V5a2 2 0 0 1 2-2Zm14 8v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8h16Zm-9 2H7v6h4v-6Zm2 0v6h4v-6h-4Z"
        />
      </svg>
    ),
  },
  {
    id: "judge",
    title: "Judge",
    description:
      "Evaluate submissions, give actionable feedback, and help surface projects with real impact.",
    accent: "from-amber-400/40 via-amber-400/10 to-transparent",
    href: "/apply/judge",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-amber-300">
        <path
          fill="currentColor"
          d="M12 2 3 7l9 5 9-5-9-5Zm7 8.236-7 3.889-7-3.89V17l7 5 7-5v-6.764Z"
        />
      </svg>
    ),
  },
];

const RegisterSection = () => {
  return (
    <section
      id="register"
      className="relative w-full py-24 px-6 md:px-12 lg:px-20 scroll-mt-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full bg-gradient-to-b from-gray-700/15 via-gray-900/0 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-gray-600/10 to-transparent blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="relative mb-2 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
            <span className="inline-block bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent [-webkit-text-fill-color:transparent] antialiased">
              Register
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-gray-400">
            Choose how you want to be part of the experience. Each path unlocks
            a different layer of impact.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md transition-all duration-400 ease-out p-[1.5px]"
            >
              <div className="relative h-full w-full rounded-[1.05rem] bg-gradient-to-br from-gray-950/60 via-gray-900/40 to-gray-950/60 p-6 flex flex-col">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute -top-10 -right-10 w-52 h-52 rounded-full blur-3xl bg-gradient-to-br ${card.accent}`}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800/70 to-gray-900/60 ring-1 ring-white/10 shadow-inner">
                      {card.icon}
                    </div>
                  </div>
                  <h2 className="text-xl font-medium text-white">
                    {card.title}
                  </h2>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-gray-400 flex-1">
                  {card.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-gray-500 group-hover:text-gray-300 transition">
                    Learn more
                  </span>
                  <span className="relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md px-4 text-xs font-medium text-white">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition" />
                    <span className="relative">Apply</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-2 w-4 h-4 text-gray-400 group-hover:text-white transition"
                    >
                      <path
                        fill="currentColor"
                        d="M5 12h11.17l-3.58-3.59L14 7l6 6-6 6-1.41-1.41 3.58-3.59H5z"
                      />
                    </svg>
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-white/0 group-hover:ring-1 group-hover:ring-white/20 transition" />
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -inset-px rounded-2xl bg-[linear-gradient(120deg,rgba(255,255,255,0.15),rgba(255,255,255,0)_40%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.15))] animate-[spin_6s_linear_infinite]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
