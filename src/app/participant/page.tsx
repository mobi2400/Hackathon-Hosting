"use client";

import {useState, useEffect} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  saveParticipant,
  getParticipant,
  logoutParticipant,
  Participant,
} from "@/lib/participant";

export default function ParticipantRegister() {
  const existing = getParticipant();
  const [user, setUser] = useState<Participant | null>(existing);
  const search = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
    fullName: "",
    email: "",
    github: "",
    portfolio: "",
  });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        username: user.username,
        fullName: user.fullName || "",
        email: user.email || "",
        github: user.github || "",
        portfolio: user.portfolio || "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((f) => ({...f, [name]: value}));
    setError("");
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      if (!form.username || !form.password) {
        setError("Username & password required.");
        return;
      }
      if (form.password !== form.confirm) {
        setError("Passwords do not match.");
        return;
      }
    }
    const participant: Participant = {
      username: form.username,
      password: user ? user.password : form.password,
      fullName: form.fullName || undefined,
      email: form.email || undefined,
      github: form.github || undefined,
      portfolio: form.portfolio || undefined,
    };
    saveParticipant(participant);
    setUser(participant);
    setSaved(true);
    const ret = search.get("return");
    if (ret) {
      setTimeout(() => router.replace(ret), 400);
    }
  };

  const handleLogout = () => {
    logoutParticipant();
    setUser(null);
    setForm({
      username: "",
      password: "",
      confirm: "",
      fullName: "",
      email: "",
      github: "",
      portfolio: "",
    });
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#1e2736_0%,#090c13_55%,#05070b_100%)] text-gray-200">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-12rem] left-1/2 -translate-x-1/2 w-[55rem] h-[55rem] rounded-full bg-fuchsia-500/[0.07] blur-3xl" />
          <div className="absolute bottom-[-15rem] right-[-8rem] w-[45rem] h-[45rem] rounded-full bg-indigo-500/[0.06] blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-xl px-5 pt-24 pb-32">
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Participant {user ? "Profile" : "Registration"}
            </h1>
            <p className="mt-4 text-sm text-gray-400">
              Local demo credentials (not secure). Used to enable quick
              participation in hackathons.
            </p>
          </header>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_70px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                disabled={!!user}
                required
              />
              <Field
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <Field
                label="GitHub"
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="githubuser"
              />
              <Field
                label="Portfolio"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="https://..."
              />
              {!user && (
                <>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Confirm Password"
                    name="confirm"
                    type="password"
                    value={form.confirm}
                    onChange={handleChange}
                    required
                  />
                </>
              )}
            </div>
            {error && (
              <p className="text-xs font-medium text-rose-400">{error}</p>
            )}
            {saved && (
              <p className="text-xs font-medium text-emerald-400">
                Saved locally.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-950/40 transition hover:brightness-110"
              >
                {user ? "Update" : "Register"}
              </button>
              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-white/15 px-8 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 transition"
                >
                  Logout
                </button>
              )}
            </div>
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
