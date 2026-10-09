import { useEffect, useMemo, useState } from "react";
import { Lead, LEADS, SOURCES, Source, clock } from "./data";
import SlaChip from "./SlaChip";
import DispositionDialog from "./DispositionDialog";
import AllClear from "./AllClear";

const money = (n: number) => `$${n.toLocaleString()}/yr`;
const ini = (n: string) => n.split(" ").map(w => w[0]).join("");
const DOT: Record<Source, string> = { "Meta Ads": "#0ea5e9", "Google Ads": "#4f46e5", WhatsApp: "#10b981", Website: "#94a3b8" };
const BASE_DIALED = 14, GOAL = 32, EOD = 795; // minutes until end of day from 10:45 AM
type Sort = "due" | "score" | "value";

function Row({ l, sel, onSelect, onCall }: { l: Lead; sel: boolean; onSelect(): void; onCall(): void }) {
  const upcoming = l.dueInMin >= EOD && !l.done;
  const btn = l.dueInMin < 0 ? "Call Now" : `Call (${clock(l.dueInMin).split(", ")[1]})`;
  return (
    <div className={`card row ${sel ? "sel" : ""} ${l.dueInMin < 0 && !l.done ? "overdue" : ""} ${l.done ? "done" : ""}`}
      onClick={onSelect} role="button" tabIndex={0} aria-pressed={sel}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && e.target === e.currentTarget && (e.preventDefault(), onSelect())}>
      <div className="av" aria-hidden>{ini(l.name)}</div>
      <div className="grow">
        <div className="name">{l.name} <span className="pill src">{l.source}: {l.campaign}</span>{sel && !l.done && <span className="pill act">Active Card</span>}</div>
        <div className="meta">{l.role} @ {l.company} • <b>{money(l.value)}</b></div>
        {upcoming
          ? <div className="meta">Scheduled for {clock(l.dueInMin)} • {l.campaign}</div>
          : <><div className="due"><SlaChip min={l.dueInMin} /> <span>{clock(l.dueInMin)}</span> • {l.phone}</div>
            <div className="meta">Note: “{l.note}”</div></>}
      </div>
      {l.done ? <span className="pill ok">{l.done}</span>
        : upcoming ? <button className="btn out sm" onClick={e => e.stopPropagation()}>Reschedule</button>
        : (<div className="acts">
            <button className="btn ok sm" aria-label={`Call ${l.name}`} onClick={e => { e.stopPropagation(); onSelect(); onCall(); }}>{btn}</button>
            <button className="btn out sm" aria-label="WhatsApp" onClick={e => e.stopPropagation()}>💬</button>
            <button className="btn out sm" aria-label="More" onClick={e => e.stopPropagation()}>⋮</button>
          </div>)}
    </div>
  );
}

function Detail({ l, onCall }: { l: Lead; onCall(): void }) {
  const [note, setNote] = useState(""); const [saved, setSaved] = useState(false);
  useEffect(() => { setNote(""); setSaved(false); }, [l.id]);
  return (
    <aside className="card detail" aria-label="Lead details">
      <div style={{ display: "flex", gap: 12 }}>
        <div className="av" style={{ width: 56, height: 56 }} aria-hidden>{ini(l.name)}</div>
        <div className="grow"><h2>{l.name} ✔</h2><div className="sub">{l.role} @ {l.company}</div><b style={{ color: "var(--ind)" }}>{money(l.value)}</b></div>
        <div><span className="pill bad">🔥 {l.score}/100</span><div className="meta">Hot Intent</div></div>
      </div>
      <div className="panel"><div className="meta" style={{ display: "flex", justifyContent: "space-between" }}><b>IMMEDIATE ACTION</b><span style={{ color: "var(--ok-d)" }}>● Local Time: 10:45 AM (Optimal)</span></div>
        <button className="btn ok" style={{ width: "100%", margin: "8px 0" }} disabled={!!l.done} onClick={onCall}>Dial {l.phone}</button>
        <div className="trio"><button className="btn out sm">WhatsApp</button><button className="btn out sm">Send Email</button><button className="btn out sm">Reschedule</button></div></div>
      <div className="lbl">Attribution &amp; form data</div>
      <div className="kv"><div><b>Campaign source</b>{l.source}</div><div><b>Target ad set</b>{l.campaign}</div><div><b>Inquired plan</b>Enterprise (25 Seats)</div><div><b>Timezone</b>US Eastern (UTC-5)</div></div>
      <div className="panel" style={{ background: "#f5f3ff" }}><b>Today's Follow-up Objective:</b><div style={{ color: "var(--ind)" }}>“{l.note}.”</div></div>
      <div className="lbl">Touchpoint history</div>
      <div className="meta"><b>Call #1 • Connected (4m 12s)</b> · 2 days ago<br />Disposition: Interested / Budget approval needed.</div>
      <div className="meta" style={{ marginTop: 6 }}><b>WhatsApp Inbound</b> · Yesterday, 3:15 PM<br />Sent PDF pricing deck and enterprise SLA terms.</div>
      <div className="lbl">Rapid call notes <span style={{ float: "right", textTransform: "none" }}>Press Ctrl+Enter to save</span></div>
      <textarea className="input" aria-label="Rapid call notes" value={note} placeholder="Log quick call notes or objections handled…"
        onChange={e => { setNote(e.target.value); setSaved(false); }} onKeyDown={e => e.ctrlKey && e.key === "Enter" && note.trim() && setSaved(true)} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="meta" role="status">{saved ? "✓ Note saved" : ""}</span>
        <button className="btn sm" disabled={!note.trim()} onClick={() => setSaved(true)}>Save Note</button></div>
      <div className="chips" style={{ marginTop: 8 }}><span className="chip">#Enterprise</span><span className="chip">#DecisionMaker</span><span className="chip" style={{ background: "var(--okt)" }}>+ Add Tag</span></div>
    </aside>
  );
}

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Source | "All">("All");
  const [q, setQ] = useState(""); const [sort, setSort] = useState<Sort>("due");
  const [selId, setSelId] = useState<string>(); const [dialog, setDialog] = useState(false);
  useEffect(() => { const t = setTimeout(() => { setLeads(LEADS); setLoading(false); }, 700); return () => clearTimeout(t); }, []);

  const visible = useMemo(() => leads
    .filter(l => filter === "All" || l.source === filter)
    .filter(l => !q || `${l.name}${l.phone}${l.company}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === "due" ? a.dueInMin - b.dueInMin : sort === "score" ? b.score - a.score : b.value - a.value), [leads, filter, q, sort]);
  const pending = visible.filter(l => !l.done);
  const all = leads.filter(l => !l.done);
  const overdue = all.filter(l => l.dueInMin < 0).length, today = all.filter(l => l.dueInMin >= 0 && l.dueInMin < EOD).length, upc = all.filter(l => l.dueInMin >= EOD).length;
  const groups = [
    { t: "Overdue follow-ups", c: "var(--dx)", hint: "Action within 30m required", items: visible.filter(l => !l.done && l.dueInMin < 0) },
    { t: "Scheduled today", c: "var(--skx)", hint: "Next: in 30 minutes", items: visible.filter(l => !l.done && l.dueInMin >= 0 && l.dueInMin < EOD) },
    { t: "Upcoming later this week", c: "var(--sec)", hint: "", items: visible.filter(l => !l.done && l.dueInMin >= EOD) },
    { t: "Completed", c: "var(--ok-d)", hint: "", items: visible.filter(l => l.done) },
  ];
  const total = leads.length, done = leads.filter(l => l.done).length, dialed = BASE_DIALED + done;
  const allClear = !loading && total > 0 && done === total;
  const sel = visible.find(l => l.id === selId) ?? pending[0];
  const count = (s: Source | "All") => all.filter(l => s === "All" || l.source === s).length;

  const save = (outcome: string, next: boolean) => {
    const cur = sel!, rest = pending.filter(l => l.id !== cur.id);
    setLeads(ls => ls.map(l => l.id === cur.id ? { ...l, done: outcome } : l));
    setDialog(false); setSelId(next ? rest[0]?.id : cur.id);
  };
  const reset = () => setLeads(LEADS.map(l => ({ ...l })));
  const clearAll = () => setLeads(ls => ls.map(l => l.done ? l : { ...l, done: "Demo Booked" }));

  return (
    <div className="app">
      <nav className="side" aria-label="Main">
        <div className="logo">LeadZam</div>
        <div className="queuepill"><span>ACTIVE QUEUE</span><b>{all.length} Due</b></div>
        {["Dashboard", "Follow-up Queue", "All Leads", "Campaigns", "Call Logs", "Settings"].map(n => {
          const on = n === "Follow-up Queue";
          return <div key={n} className={`nav ${on ? "on" : "stub"}`} aria-current={on ? "page" : undefined} title={on ? undefined : "Outside prototype scope"}>{n}{on && <b>{all.length}</b>}</div>;
        })}
        <div className="slacard"><span className="meta">SLA Pace</span><b>94.2% on time</b></div>
      </nav>

      <div className="rest">
        <header className="top">
          <input className="input grow" type="search" placeholder="Search leads, phone, or tags…" aria-label="Search" value={q} onChange={e => setQ(e.target.value)} />
          <button className="btn ok">⠿ Quick Dialer</button>
          <span className="pill src">Follow-up Queue: {all.length} due</span>
          <span className="pill ok">● Available for calls</span>
          <span aria-label="Notifications">🔔</span>
          <div className="user"><div className="av" style={{ width: 32, height: 32 }}>RA</div><div><b>Rep Alex</b><div className="meta">Outbound Rep</div></div></div>
        </header>

        <main className="main">
          {allClear ? <><div className="card head"><div><h1>Follow-up Queue <span className="pill ok">ALL CLEAR</span></h1><p className="sub">Daily quota reconciled • Outbound dialing sequence complete for today</p></div>
              <div><div className="meta">Daily target SLA {total}/{total} Calls (100%) 🎉</div><div className="progress"><i style={{ width: "100%" }} /></div></div></div>
              <AllClear leads={leads} onReset={reset} /></> : (<>
          <section className="card head" aria-label="Queue summary">
            <div className="grow">
              <h1>Follow-up Queue {overdue > 0 && <span className="pill bad">Critical Actions</span>}</h1>
              <p className="sub">{all.length} warm leads requiring direct telecaller touchpoints today</p>
              <button className="btn" style={{ marginTop: 8 }} disabled={!pending.length} onClick={() => { setSelId(pending[0].id); setDialog(true); }}>⚡ Start Power Dialer</button>
              <button className="btn out sm" style={{ marginLeft: 8 }} onClick={clearAll}>Demo: clear queue</button>
            </div>
            <div className="stats">
              <span className="pill bad">⚠ {overdue} Overdue</span><span className="pill src">📅 {today} Due Today</span><span className="pill src">{upc} Upcoming</span>
              <div className="goal" role="progressbar" aria-valuenow={dialed} aria-valuemin={0} aria-valuemax={GOAL} aria-label="Dialed goal"><span className="meta">DIALED GOAL</span><b>{dialed}/{GOAL} ({Math.round(dialed / GOAL * 100)}%)</b></div>
            </div>
          </section>

          <div className="tools">
            {(["All", ...SOURCES] as const).map(s => (
              <button key={s} className="tab" aria-pressed={filter === s} onClick={() => setFilter(s)}>
                {s !== "All" && <i className="dot" style={{ background: DOT[s] }} />}{s} ({count(s)})</button>))}
            <input className="input" style={{ marginLeft: "auto" }} type="search" placeholder="Filter lead or phone…" aria-label="Filter leads" value={q} onChange={e => setQ(e.target.value)} />
            <select className="input" aria-label="Sort" value={sort} onChange={e => setSort(e.target.value as Sort)}>
              <option value="due">Priority: High First</option><option value="score">Intent score</option><option value="value">Deal value</option></select>
          </div>

          <div className="cols">
            <section aria-label="Lead queue" aria-busy={loading}>
              {loading && [1, 2, 3, 4].map(i => <div key={i} className="skel" />)}
              {!loading && !visible.length && <div className="card empty"><p className="sub">No leads match this filter.</p><button className="btn out" onClick={() => { setFilter("All"); setQ(""); }}>Clear filters</button></div>}
              {groups.filter(g => g.items.length).map(g => (
                <div key={g.t}><div className="grp" style={{ color: g.c }}><span>{g.t} ({g.items.length})</span><span className="meta">{g.hint}</span></div>
                  {g.items.map(l => <Row key={l.id} l={l} sel={sel?.id === l.id} onSelect={() => setSelId(l.id)} onCall={() => setDialog(true)} />)}</div>))}
            </section>
            {sel && <Detail l={sel} onCall={() => setDialog(true)} />}
          </div></>)}
        </main>
      </div>
      {dialog && sel && <DispositionDialog lead={sel} onClose={() => setDialog(false)} onSave={save} />}
    </div>
  );
}
