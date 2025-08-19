"use client";
import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type {Hackathon} from "@/lib/hackathons";
import {getParticipant} from "@/lib/participant";
import {useRouter} from "next/navigation";

interface Participation {
  hackathonId: string;
  username: string;
  projectTitle?: string;
}

export default function HackathonsPage() {
  const [data, setData] = useState<Hackathon[]>([]);
  const [participations, setParticipations] = useState<Participation[]>([]);
  const participant = typeof window !== "undefined" ? getParticipant() : null;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const hackRes = await fetch("/api/hackathons");
        const hackJson = await hackRes.json();
        if (!cancelled) setData(hackJson.hackathons || hackJson.data || []);
        if (participant) {
          try {
            const partRes = await fetch("/api/participations");
            const partJson = await partRes.json();
            if (!cancelled)
              setParticipations(partJson.participations || partJson.data || []);
          } catch {}
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [participant]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 text-gray-200 pt-20 pb-28 px-6 md:px-10">
        <header className="max-w-5xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Explore Hackathons
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-400">
            Discover active & upcoming events submitted by organizers.
          </p>
        </header>

        {loading && (
          <p className="text-center text-sm text-gray-400">
            Loading hackathons...
          </p>
        )}
        {error && <p className="text-center text-sm text-rose-400">{error}</p>}

        {!loading &&
          !error &&
          (data.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              No hackathons yet.{" "}
              <a
                href="/organizer"
                className="underline decoration-dotted hover:text-gray-300"
              >
                Be the first to add one
              </a>
              .
            </p>
          ) : (
            <div className="max-w-6xl mx-auto grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {data.map((h) => {
                const mine =
                  participant &&
                  participations.find(
                    (p) =>
                      p.hackathonId === h.id &&
                      p.username === participant.username
                  );
                return (
                  <article
                    key={h.id}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.035] hover:bg-white/[0.07] backdrop-blur-md p-5 md:p-6 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-lg font-medium text-white leading-snug group-hover:text-gray-100">
                        {h.name}
                      </h2>
                      <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-gray-300 tracking-wide uppercase">
                        {h.theme}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-3 text-xs md:text-sm text-gray-400 leading-relaxed">
                      {h.about}
                    </p>
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] md:text-xs text-gray-400">
                      <div>
                        <dt className="font-medium text-gray-300">Starts</dt>
                        <dd>{new Date(h.startDate).toLocaleDateString()}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-300">Enroll By</dt>
                        <dd>
                          {new Date(h.lastEnrollDate).toLocaleDateString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-300">Prize</dt>
                        <dd>{h.prizePool}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-300">Team Size</dt>
                        <dd>{h.teamSize}</dd>
                      </div>
                    </dl>
                    <div className="mt-5 flex items-center justify-between text-[11px] text-gray-500">
                      <span>
                        Sponsor:{" "}
                        <span className="text-gray-300">{h.sponsor}</span>
                      </span>
                      <span className="text-gray-500">
                        Added {new Date(h.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-6 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          if (!participant) {
                            router.push(
                              `/participant?return=${encodeURIComponent(
                                `/hackathons/${h.id}/participate`
                              )}`
                            );
                          } else {
                            router.push(`/hackathons/${h.id}/participate`);
                          }
                        }}
                        className="w-full rounded-md px-4 py-2 text-xs font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600 text-white shadow hover:brightness-110 transition"
                      >
                        {!participant
                          ? "Login to Participate"
                          : mine
                          ? "Edit Submission"
                          : "Participate"}
                      </button>
                      {mine && (
                        <span className="inline-block w-full text-center text-[10px] px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                          Submitted{mine.projectTitle ? ": " : ""}
                          {mine.projectTitle || ""}
                        </span>
                      )}
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-white/0 group-hover:ring-1 group-hover:ring-white/20 transition" />
                  </article>
                );
              })}
            </div>
          ))}
      </main>
      <Footer />
    </>
  );
}
