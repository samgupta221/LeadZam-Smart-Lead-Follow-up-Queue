// Follow-up SLA chip per DESIGN.md: <15m → warning, negative → urgent (pulsing).
export function fmt(min: number) {
  const a = Math.abs(min), h = Math.floor(a / 60), m = a % 60;
  return h >= 24 ? `${Math.floor(h / 24)}d` : h ? `${h}h ${m}m` : `${m}m`;
}
export default function SlaChip({ min }: { min: number }) {
  const cls = min < 0 ? "bad pulse" : min < 15 ? "warn" : "ok";
  const text = min < 0 ? `${fmt(min)} overdue` : `Due in ${fmt(min)}`;
  return <span className={`pill ${cls}`}>{text}</span>;
}
