"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";

type OrganizerForm = {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  workEmail: string;
  phone: string;
  hackathonName: string;
  hackathonAbout: string;
  startDate: string;
  lastEnrollDate: string;
  prizePool: string;
  sponsor: string;
  theme: string;
  teamSize: string;
};

const initialForm: OrganizerForm = {
  firstName: "",
  lastName: "",
  company: "",
  jobTitle: "",
  workEmail: "",
  phone: "",
  hackathonName: "",
  hackathonAbout: "",
  startDate: "",
  lastEnrollDate: "",
  prizePool: "",
  sponsor: "",
  theme: "",
  teamSize: "",
};

export default function Organizer() {
  const [form, setForm] = useState<OrganizerForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/organizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Submit failed");
      setSuccess("Submitted!");
      setForm(initialForm);
    } catch {
      setError("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#1e2736_0%,#090c13_55%,#05070b_100%)] text-gray-200">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 w-[60rem] sm:w-[70rem] h-[60rem] sm:h-[70rem] rounded-full bg-indigo-500/[0.08] blur-3xl" />
          <div className="absolute bottom-[-15rem] right-[-8rem] w-[40rem] sm:w-[55rem] h-[40rem] sm:h-[55rem] rounded-full bg-emerald-500/[0.07] blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff05,#ffffff00_18%,#ffffff03_60%,#ffffff00)]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-28 pb-28 sm:pb-32">
          <header className="text-center mb-14 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Run your next great online hackathon
            </h1>
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-sm sm:text-base font-medium">
              <p>
                <span className="text-gray-300">For companies:</span>{" "}
                <span className="text-gray-400">
                  Fill out the form below to speak with our team today.
                </span>
              </p>
              <p>
                <span className="text-gray-300">For students:</span>{" "}
                <span className="text-gray-400">
                  <a href="#" className="underline decoration-dotted hover:text-gray-200">
                    Click here
                  </a>{" "}
                  to begin hosting your hackathon.
                </span>
              </p>
            </div>
          </header>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_70px_-20px_rgba(0,0,0,0.6)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required autoComplete="given-name" />
                <Field label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required autoComplete="family-name" />
                <Field label="Company" name="company" value={form.company} onChange={handleChange} required autoComplete="organization" />
                <Field label="Job Title" name="jobTitle" value={form.jobTitle} onChange={handleChange} required />
                <Field label="Work Email" name="workEmail" type="email" value={form.workEmail} onChange={handleChange} required autoComplete="email" />
                <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" />
                <Field label="Hackathon Name" name="hackathonName" value={form.hackathonName} onChange={handleChange} required />
                <Field label="Theme" name="theme" value={form.theme} onChange={handleChange} required />
                <Field label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
                <Field label="Last Enrollment Date" name="lastEnrollDate" type="date" value={form.lastEnrollDate} onChange={handleChange} required />
                <Field label="Prize Pool" name="prizePool" value={form.prizePool} onChange={handleChange} placeholder="$5000" required />
                <Field label="Sponsor" name="sponsor" value={form.sponsor} onChange={handleChange} required />
                <Field label="Team Size" name="teamSize" type="number" min={1} value={form.teamSize} onChange={handleChange} required />
                <TextArea
                  className="md:col-span-2"
                  label="What is your online hackathon about?"
                  name="hackathonAbout"
                  value={form.hackathonAbout}
                  onChange={handleChange}
                  required
                  placeholder="Brief description, goals, target participants..."
                />
              </div>

              <div className="mt-10 flex flex-col items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600 px-10 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-950/40 transition enabled:hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader /> Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
                {success && <p className="mt-4 text-sm text-emerald-400 font-medium text-center">{success}</p>}
                {error && <p className="mt-4 text-sm text-rose-400 font-medium text-center">{error}</p>}
              </div>

              <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="mt-6 text-[11px] leading-relaxed text-gray-500 text-center sm:text-left">
                By submitting, you agree to be contacted regarding hosting opportunities. We respect your inbox.
              </p>
            </form>
        </div>
      </main>
    </>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};
function Field({ label, name, className, ...rest }: FieldProps) {
  return (
    <label className={`flex flex-col gap-1 ${className || ""}`}>
      <span className="text-[11px] font-medium tracking-wide text-gray-400">
        {label}{rest.required && <span className="text-rose-400"> *</span>}
      </span>
      <input
        name={name}
        className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30 transition"
        {...rest}
      />
    </label>
  );
}

type TAProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string; };
function TextArea({ label, name, className, ...rest }: TAProps) {
  return (
    <label className={`flex flex-col gap-1 ${className || ""}`}>
      <span className="text-[11px] font-medium tracking-wide text-gray-400">
        {label}{rest.required && <span className="text-rose-400"> *</span>}
      </span>
      <textarea
        name={name}
        rows={4}
        className="resize-y rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30 transition"
        {...rest}
      />
    </label>
  );
}

function Loader() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-[2px] border-white/40 border-t-white"
      aria-hidden="true"
    />
  );
}