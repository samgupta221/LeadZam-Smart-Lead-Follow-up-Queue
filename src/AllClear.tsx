import { Lead } from "./data";
const CARDS = [
  ["🚀", "42 Fresh", "Pull from Inbound Pool", "42 fresh unassigned leads arrived from today's Meta Ads campaign. Claim 5 to 10 contacts to work right now while intent is peak.", "Claim 5 Fresh Leads", true],
  ["📅", "12 Leads Due", "Review Tomorrow's Queue", "Get an early edge on tomorrow's scheduled demos, nurture sequences and decision-maker callbacks.", "Preview Tomorrow", false],
  ["❄️", "18 Stalled", "Re-engage Cold Leads", "18 stalled opportunities haven't had outbound touchpoints in 14+ days. Send a multi-touch WhatsApp blast or quick audit call.", "Launch Re-engagement Batch", false],
] as const;
export default function AllClear({ leads, onReset }: { leads: Lead[]; onReset(): void }) {
  const by = (s: string) => leads.filter(l => l.source === s).length;
  return (<>
    <div className="card empty hero" role="status">
      <div style={{ fontSize: 40 }}>✅</div>
      <div className="lbl" style={{ color: "var(--ind)" }}>Queue cleared</div>
      <h2>You're all caught up for today!</h2>
      <p className="sub">Great job! You've finished all {leads.length} scheduled follow-ups with <b style={{ color: "var(--ok-d)" }}>zero overdue leads</b>.</p>
      <div className="chips" style={{ justifyContent: "center" }}>
        {["Meta Ads", "Google Ads", "WhatsApp"].map(s => <span key={s} className="pill src">{s}: {by(s)} completed</span>)}
      </div>
      <button className="btn out sm" onClick={onReset}>Reset demo</button>
    </div>
    <div className="grp"><span style={{ fontSize: 18, textTransform: "none" }}>Accelerate Pipeline &amp; Next Actions</span><span className="pill src">3 Suggestions Available</span></div>
    <div className="cards3">
      {CARDS.map(([i, b, t, d, cta, pri]) => (
        <div key={t} className="card" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 22 }}>{i}</span><span className="pill src">{b}</span></div>
          <h3 style={{ margin: "8px 0 4px" }}>{t}</h3><p className="sub">{d}</p>
          <button className={`btn ${pri ? "" : "out"}`} style={{ width: "100%" }}>{cta}</button>
        </div>))}
    </div>
    <div className="card" style={{ marginTop: 16, overflowX: "auto" }}>
      <div className="grp" style={{ padding: "0 16px" }}><span>✔ Today's Completed Activity Log ({leads.length} calls)</span></div>
      <table className="log"><thead><tr><th>Contact</th><th>Channel &amp; Source</th><th>Disposition</th><th>Logged</th></tr></thead>
        <tbody>{leads.slice(0, 5).map(l => (
          <tr key={l.id}><td><b>{l.name}</b><div className="meta">{l.phone}</div></td><td><span className="pill src">{l.source} · {l.campaign}</span></td>
            <td><span className="pill ok">{l.done}</span></td><td>Just now</td></tr>))}</tbody></table>
      <div className="meta" style={{ padding: 12 }}>Showing {Math.min(5, leads.length)} of {leads.length} completed items</div>
    </div>
  </>);
}
