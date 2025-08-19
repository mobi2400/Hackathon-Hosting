"use client";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {getParticipant} from "@/lib/participant";
import type {Hackathon} from "@/lib/hackathons";

export default function ParticipatePage() {
  const {id} = useParams<{id: string}>();
  const router = useRouter();
  const user = getParticipant();
  const search = useSearchParams();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    projectName: "",
    repoUrl: "",
    demoUrl: "",
    description: "",
  });

  // redirect to participant with return URL if not logged in
  useEffect(() => {
    if (!user) {
      router.replace(
        `/participant?return=${encodeURIComponent(window.location.pathname)}`
      );
    }
  }, [user, router]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`/api/hackathons/${id}`);
        const json = await res.json();
        if (!json.success)
          throw new Error(json.error || "Hackathon load failed");
        if (active) setHackathon(json.data);
        if (user) {
          const pres = await fetch(`/api/participations?hackathonId=${id}`);
          const pjson = await pres.json();
          if (pjson.success) {
            const existing = pjson.data.find(
              (p: any) => p.username === user.username
            );
            if (existing) {
              setForm({
                projectName: existing.projectName || "",
                repoUrl: existing.repoUrl || "",
                demoUrl: existing.demoUrl || "",
                description: existing.description || "",
              });
              setSaved(true);
            }
          }
        }
      } catch (e: any) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setForm((f) => ({...f, [name]: value}));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/participations", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          hackathonId: id,
          username: user.username,
          ...form,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed");
      setSaved(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[radial-gradient(circle_at_30%_20%,#1e2736_0%,#090c13_55%,#05070b_100%)] text-gray-200 pt-24 pb-32 px-5">
        {loading && !error && (
          <p className="text-center text-sm text-gray-400">Loading...</p>
        )}
        {!loading && !hackathon && (
          <p className="text-center text-sm text-rose-400">
            {error ? error : "Hackathon not found."}
          </p>
        )}
        {!loading && hackathon && user && (
          <div className="max-w-3xl mx-auto">
            <header className="mb-10 text-center">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Participate: {hackathon.name}
              </h1>
              <p className="mt-3 text-sm text-gray-400">
                Submitting as{" "}
                <span className="text-gray-200 font-medium">
                  {user.username}
                </span>
              </p>
            </header>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_70px_-20px_rgba(0,0,0,0.6)]"
            >
              <Field
                label="Project Name"
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
                required
              />
              <Field
                label="Repository URL"
                name="repoUrl"
                value={form.repoUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
              <Field
                label="Demo URL"
                name="demoUrl"
                value={form.demoUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
              <TextArea
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Brief overview of your project..."
              />
              {error && (
                <p className="text-xs font-medium text-rose-400">{error}</p>
              )}
              {saved && (
                <p className="text-xs font-medium text-emerald-400">Saved.</p>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600 px-10 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-950/40 transition enabled:hover:brightness-110 disabled:opacity-50"
                >
                  {saving ? "Saving..." : saved ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};
function Field({label, name, className, ...rest}: FieldProps) {
  return (
    <label className={`flex flex-col gap-1 ${className || ""}`}>
      <span className="text-[11px] font-medium tracking-wide text-gray-400">
        {label}
        {rest.required && <span className="text-rose-400"> *</span>}
      </span>
      <input
        name={name}
        className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30 transition"
        {...rest}
      />
    </label>
  );
}

type TAProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};
function TextArea({label, name, className, ...rest}: TAProps) {
  return (
    <label className={`flex flex-col gap-1 ${className || ""}`}>
      <span className="text-[11px] font-medium tracking-wide text-gray-400">
        {label}
        {rest.required && <span className="text-rose-400"> *</span>}
      </span>
      <textarea
        name={name}
        rows={5}
        className="resize-y rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30 transition"
        {...rest}
      />
    </label>
  );
}
