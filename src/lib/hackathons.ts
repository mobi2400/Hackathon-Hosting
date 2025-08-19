// In-memory hackathon store (replace with database integration later)
export type Hackathon = {
  id: string;
  name: string;
  theme: string;
  startDate: string; // ISO date
  lastEnrollDate: string; // ISO date
  prizePool: string;
  sponsor: string;
  teamSize: string;
  about: string;
  createdAt: string;
};

let hackathons: Hackathon[] = [];

export function addHackathon(
  data: Omit<Hackathon, "id" | "createdAt">
): Hackathon {
  const h: Hackathon = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  hackathons.push(h);
  return h;
}

export function listHackathons(): Hackathon[] {
  // newest first
  return [...hackathons].sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
}

export function getHackathon(id: string): Hackathon | undefined {
  return hackathons.find((h) => h.id === id);
}
