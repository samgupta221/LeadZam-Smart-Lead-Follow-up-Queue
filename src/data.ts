export type Source = "Meta Ads" | "Google Ads" | "WhatsApp" | "Website";
export interface Lead {
  id: string; name: string; role: string; company: string; value: number;
  source: Source; campaign: string; phone: string;
  dueInMin: number; // minutes from "now" (10:45 AM); negative = overdue
  note: string; score: number; done?: string;
}
export const NOW_MIN = 10 * 60 + 45;
export function clock(d: number) {
  const t = NOW_MIN + d, day = Math.floor(t / 1440), m = ((t % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60), mm = String(m % 60).padStart(2, "0");
  const lbl = day < 0 ? "Yesterday" : day === 0 ? "Today" : day === 1 ? "Tomorrow" : `In ${day}d`;
  return `${lbl}, ${h % 12 || 12}:${mm} ${h < 12 ? "AM" : "PM"}`;
}
export const SOURCES: Source[] = ["Meta Ads", "Google Ads", "WhatsApp", "Website"];
type R = [string, string, string, number, Source, string, number, string];
const rows: R[] = [
  ["Marcus Vance", "VP Ops", "CloudScale", 12500, "Meta Ads", "Summer Retargeting", -1095, "Requested custom pricing tiers breakdown"],
  ["Sarah Lin", "Head of Sales", "LogisticsOne", 9200, "Google Ads", "Brand Search", -105, "Wants demo with IT security officer"],
  ["Tom Reyes", "Ops Manager", "BrightPath", 6400, "WhatsApp", "Click-to-WhatsApp", -300, "Asked for callback after pricing PDF"],
  ["Anita Desai", "Sales Head", "Kiran Logistics", 7800, "Website", "Pricing Page", -60, "Wants onboarding timeline"],
  ["David Chen", "Director of Growth", "Apex Retail", 18000, "WhatsApp", "Inbound", 30, "Confirm demo with CTO & team pricing"],
  ["Kevin Brooks", "Founder", "Orbit Labs", 11000, "Meta Ads", "Lookalike #4", 75, "Compare plan limits"],
  ["Mei Tan", "Growth Lead", "Lumen Retail", 9500, "Google Ads", "Enterprise", 120, "Needs Shopify integration details"],
  ["Rahul Verma", "CRO", "Finlytics", 21000, "Meta Ads", "Q3 Retarget", 200, "Budget approved, wants contract"],
  ["Priya Sharma", "Procurement Lead", "Zenith Corp", 24000, "Google Ads", "High Intent CRM", 165, "Review security compliance & SSO"],
  ["Elena Rostova", "Operations Architect", "NorthFin", 15000, "Website", "Contact Form", 255, "Requested Zapier & webhook setup"],
  ["Nora Quinn", "Head of CX", "Helio", 5600, "WhatsApp", "Opt-in Campaign", 330, "Asked about WhatsApp chatbot"],
  ["Luis Ortega", "VP Sales", "Vantage Co", 13200, "Google Ads", "High Intent CRM", 450, "Team of 12 reps"],
  ["Hana Kim", "COO", "Pixel & Co", 7200, "Website", "Demo Request", 610, "Prefers afternoon calls"],
  ["Julian Morales", "COO", "FinTech Global", 8000, "Meta Ads", "Retargeting", 1395, "Scheduled for tomorrow 10:00 AM"],
  ["Omar Haddad", "Director", "SwiftPay", 10400, "Meta Ads", "Summer Retargeting", 1500, "Wants API docs"],
  ["Chloe Martin", "Ops Lead", "GreenGrid", 6900, "Google Ads", "Brand Search", 1900, "Comparing two vendors"],
  ["Ben Carter", "CEO", "Nimbus HR", 16000, "WhatsApp", "Click-to-WhatsApp", 2800, "Asked for pilot terms"],
  ["Isha Kapoor", "Marketing Head", "Rangoli", 8800, "Meta Ads", "Lead Form", 3600, "Needs CAPI setup help"],
];
export const LEADS: Lead[] = rows.map((r, i) => ({
  id: String(i + 1), name: r[0], role: r[1], company: r[2], value: r[3], source: r[4], campaign: r[5],
  phone: `+1 (${415 + (i * 37) % 300}) ${300 + (i * 53) % 600}-${String(1000 + (i * 997) % 9000)}`,
  dueInMin: r[6], note: r[7], score: 60 + ((i * 7) % 36),
}));
export interface Outcome { key: string; label: string; sub: string; schedule: boolean; notes: boolean; stage: string }
export const OUTCOMES: Outcome[] = [
  { key: "1", label: "Meeting Booked", sub: "Connected & Qualified", schedule: true, notes: true, stage: "Demo Scheduled" },
  { key: "2", label: "Follow-up Needed", sub: "Callback requested", schedule: true, notes: true, stage: "Follow-up Scheduled" },
  { key: "3", label: "Not Interested", sub: "Nurture / Archive", schedule: false, notes: true, stage: "Nurture / Archive" },
  { key: "4", label: "Voicemail / No Ans", sub: "Re-queue 4 hrs", schedule: false, notes: false, stage: "Contacted" },
  { key: "5", label: "Busy / Dropped", sub: "Immediate re-try", schedule: false, notes: false, stage: "Contacted" },
  { key: "6", label: "Wrong Number", sub: "Mark invalid", schedule: false, notes: false, stage: "Invalid" },
];
export const PRESETS: Record<string, [string, string]> = {
  "Today (+2h)": ["Today", "01:00 PM"], "Tomorrow morning": ["Tomorrow", "10:00 AM"], "In 2 days": ["In 2 days", "10:00 AM"], "Next week": ["Next Monday", "10:00 AM"],
};
