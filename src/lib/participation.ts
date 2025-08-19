export type Participation = {
  id: string;
  hackathonId: string;
  username: string;
  projectName?: string;
  repoUrl?: string;
  demoUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

let participations: Participation[] = [];

export function listParticipations(hackathonId?: string) {
  return hackathonId
    ? participations.filter(p => p.hackathonId === hackathonId)
    : participations;
}

export function getParticipation(hackathonId: string, username: string) {
  return participations.find(
    p => p.hackathonId === hackathonId && p.username === username
  );
}

export function upsertParticipation(input: Omit<Participation,"id"|"createdAt"|"updatedAt"> & {id?: string}) {
  const existing = input.id
    ? participations.find(p => p.id === input.id)
    : getParticipation(input.hackathonId, input.username);
  if (existing) {
    existing.projectName = input.projectName;
    existing.repoUrl = input.repoUrl;
    existing.demoUrl = input.demoUrl;
    existing.description = input.description;
    existing.updatedAt = new Date().toISOString();
    return existing;
  }
  const record: Participation = {
    id: crypto.randomUUID(),
    hackathonId: input.hackathonId,
    username: input.username,
    projectName: input.projectName,
    repoUrl: input.repoUrl,
    demoUrl: input.demoUrl,
    description: input.description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  participations.push(record);
  return record;
}