"use client"

import React, { useState } from "react";
import {saveHackathonDetails} from "@/lib/dbConnect";


export default function Organizer() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    lastEnrollDate: "",
    prizePool: "",
    sponsor: "",
    theme: "",
    teamSize: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      if (!data.success) {
        throw new Error(data.error || "Failed to submit hackathon details.");
      }
      setSuccess("Hackathon details submitted!");
      setForm({
        name: "",
        date: "",
        lastEnrollDate: "",
        prizePool: "",
        sponsor: "",
        theme: "",
        teamSize: "",
      });
    } catch (err) {
      setError("Failed to submit hackathon details.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-black shadow-xl rounded-lg p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Post Hackathon Details
        </h2>
        {success && <div className="text-green-500 text-center">{success}</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div>
          <label className="block font-semibold mb-1">Hackathon Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Last Date of Enrollment</label>
          <input
            type="date"
            name="lastEnrollDate"
            value={form.lastEnrollDate}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Prize Pool</label>
          <input
            type="text"
            name="prizePool"
            value={form.prizePool}
            onChange={handleChange}
            required
            placeholder="e.g. $5000"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Sponsor</label>
          <input
            type="text"
            name="sponsor"
            value={form.sponsor}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Theme</label>
          <input
            type="text"
            name="theme"
            value={form.theme}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Team Size</label>
          <input
            type="number"
            name="teamSize"
            value={form.teamSize}
            onChange={handleChange}
            required
            min={1}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}