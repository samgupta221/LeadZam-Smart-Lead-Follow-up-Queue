export type Source = "Meta Ads" | "Google Ads" | "WhatsApp" | "Website";
export interface Lead {
  id: string; name: string; role: string; company: string; value: number;
  source: Source; campaign: string; phone: string;
  dueInMin: number; // minutes from "now"; negative = overdue
  note: string; score: number; done?: string; // done = outcome label
}
export const SOURCES: Source[] = ["Meta Ads", "Google Ads", "WhatsApp", "Website"];
export const LEADS: Lead[] = [
  { id: "1", name: "Marcus Vance", role: "VP Ops", company: "CloudScale", value: 12500, source: "Meta Ads", campaign: "Summer Retargeting", phone: "+1 (415) 892-0043", dueInMin: -1080, note: "Requested custom pricing tiers breakdown", score: 88 },
  { id: "2", name: "Sarah Lin", role: "Head of Sales", company: "LogisticsOne", value: 9200, source: "Google Ads", campaign: "Brand Search", phone: "+1 (650) 334-1192", dueInMin: -120, note: "Wants demo with IT security officer", score: 76 },
  { id: "3", name: "David Chen", role: "Director of Growth", company: "Apex Retail", value: 18000, source: "WhatsApp", campaign: "Click-to-WhatsApp", phone: "+1 (555) 382-9012", dueInMin: 12, note: "Confirm demo with CTO & team pricing", score: 94 },
  { id: "4", name: "Priya Sharma", role: "Procurement Lead", company: "Zenith Corp", value: 24000, source: "Google Ads", campaign: "High Intent CRM", phone: "+1 (408) 771-9920", dueInMin: 165, note: "Review security compliance & SSO", score: 81 },
  { id: "5", name: "Elena Rostova", role: "Ops Architect", company: "NorthFin", value: 15000, source: "Website", campaign: "Contact Form", phone: "+1 (212) 440-8819", dueInMin: 255, note: "Requested Zapier & webhook setup", score: 67 },
  { id: "6", name: "Julian Morales", role: "COO", company: "FinTech Global", value: 8000, source: "Meta Ads", campaign: "Retargeting", phone: "+1 (310) 220-4410", dueInMin: 1440, note: "Scheduled for tomorrow 10:00 AM", score: 59 },
];
export interface Outcome { key: string; label: string; sub: string; schedule: boolean; notes: boolean }
export const OUTCOMES: Outcome[] = [
  { key: "1", label: "Meeting Booked", sub: "Connected & Qualified", schedule: true, notes: true },
  { key: "2", label: "Follow-up Needed", sub: "Callback requested", schedule: true, notes: true },
  { key: "3", label: "Not Interested", sub: "Nurture / Archive", schedule: false, notes: true },
  { key: "4", label: "Voicemail / No Ans", sub: "Re-queue 4 hrs", schedule: false, notes: false },
  { key: "5", label: "Busy / Dropped", sub: "Immediate re-try", schedule: false, notes: false },
  { key: "6", label: "Wrong Number", sub: "Mark invalid", schedule: false, notes: false },
];
export const PRESETS = ["Today (+2h)", "Tomorrow morning", "In 2 days", "Next week"];
