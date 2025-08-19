export type Participant = {
  username: string;
  password: string; // plain text demo only
  fullName?: string;
  email?: string;
  github?: string;
  portfolio?: string;
};

const USER_KEY = "participantUser";

export function saveParticipant(p: Participant) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(p));
}

export function getParticipant(): Participant | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logoutParticipant() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
}
