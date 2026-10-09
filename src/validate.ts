import { OUTCOMES } from "./data";
export function validate(key?: string, preset?: string, notes = ""): string[] {
  const out = OUTCOMES.find(o => o.key === key);
  if (!out) return ["Choose a call outcome."];
  const e: string[] = [];
  if (out.schedule && !preset) e.push("Pick when to follow up.");
  if (out.notes && notes.trim().length < 5) e.push("Add a short note (5+ characters).");
  return e;
}
