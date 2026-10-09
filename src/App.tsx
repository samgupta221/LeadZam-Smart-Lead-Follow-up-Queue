import { useEffect, useMemo, useState } from "react";
import { Lead, LEADS, SOURCES, Source } from "./data";
import SlaChip from "./SlaChip";
import DispositionDialog from "./DispositionDialog";

const money = (n: number) => `$${n.toLocaleString()}/yr`;
const initials = (n: string) => n.split(" ").map(w => w[0]).join("");

function Row({ l, sel, onSelect, onCall }: { l: Lead; sel: boolean; onSelect(): void; onCall(): void }) {
  return (
    <div className={`card row ${sel ? "sel" : ""} ${l.dueInMin < 0 && !l.done ? "overdue" : ""} ${l.done ? "done" : ""}`}
      onClick={onSelect} role="button" tabIndex={0} aria-pressed={sel}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && e.target === e.currentTarget && (e.preventDefault(), onSelect())}>
      <div className="av" aria-hidden>{initials(l.name)}</div>
      <div className="grow">
        <div className="name">{l.name} <span className="pill src">{l.source}</span></div>
        <div className="meta">{l.role} @ {l.company} · {money(l.value)} · {l.phone}</div>
        <div className="meta">Note: “{l.note}”</div>
      </div>
      {l.done ? <span className="pill ok">{l.done}</span> : (<>
        <SlaChip min={l.dueInMin} />
        <button className="btn ok sm" aria-label={`Call ${l.name}`} onClick={e => { e.stopPropagation(); onSelect(); onCall(); }}>Call now</button>
      </>)}
    </div>
  );
}

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Source | "All">("All");
  const [q, setQ] = useState("");
  const [selId, setSelId] = useState<string>();
  const [dialog, setDialog] = useState(false);

  useEffect(() => { const t = setTimeout(() => { setLeads(LEADS); setLoading(false); }, 700); return () => clearTimeout(t); }, []);

  const visible = useMemo(() => leads
    .filter(l => filter === "All" || l.source === filter)
    .filter(l => !q || `${l.name}${l.phone}${l.company}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => a.dueInMin - b.dueInMin), [leads, filter, q]);

  const pending = visible.filter(l => !l.done);
  const groups = [
    { t: "Overdue", c: "var(--dx)", items: visible.filter(l => !l.done && l.dueInMin < 0) },
    { t: "Scheduled today", c: "var(--skx)", items: visible.filter(l => !l.done && l.dueInMin >= 0 && l.dueInMin < 1440) },
    { t: "Upcoming", c: "var(--sec)", items: visible.filter(l => !l.done && l.dueInMin >= 1440) },
    { t: "Completed", c: "var(--ok-d)", items: visible.filter(l => l.done) },
  ];
  const total = leads.length, done = leads.filter(l => l.done).length;
  const allClear = !loading && total > 0 && done === total;
  const sel = visible.find(l => l.id === selId) ?? pending[0];

  const save = (outcome: string, next: boolean) => {
    const cur = sel!;
    const upcoming = pending.filter(l => l.id !== cur.id);
    setLeads(ls => ls.map(l => l.id === cur.id ? { ...l, done: outcome } : l));
    setDialog(false);
    setSelId(next ? upcoming[0]?.id : cur.id);
  };
  const count = (s: Source | "All") => leads.filter(l => !l.done && (s === "All" || l.source === s)).length;

  return (
    <div className="app">
      <nav className="side" aria-label="Main">
        <div className="logo">Leadzam</div>
        <div className="btn" style={{ textAlign: "center", marginBottom: 8, opacity: .6 }} aria-disabled="true" title="Outside prototype scope">+ Add Lead</div>
        {["Admin Dashboard", "Forms", "All Leads", "Follow-ups", "Calls", "Reports", "WhatsApp", "Integrations", "Automations", "Settings"].map(n => {
          const on = n === "Follow-ups";
          return (
            <div key={n} className={`nav ${on ? "on" : "stub"}`} aria-current={on ? "page" : undefined}
              title={on ? undefined : "Outside prototype scope"}>
              {n}{on && <b>{count("All")}</b>}
            </div>);
        })}
      </nav>

      <main className="main">
        <header className="card head">
          <div>
            <h1>Follow-up Queue</h1>
            <p className="sub">{allClear ? "Daily quota reconciled." : `${count("All")} warm leads need a call today`}</p>
          </div>
          <div>
            <div className="meta" id="pg">Dialed {done}/{total}</div>
            <div className="progress" role="progressbar" aria-labelledby="pg" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
              <i style={{ width: total ? `${(done / total) * 100}%` : 0 }} />
            </div>
          </div>
          <button className="btn" disabled={!pending.length} onClick={() => { setSelId(pending[0].id); setDialog(true); }}>⚡ Start Power Dialer</button>
        </header>

        {allClear ? (
          <div className="card empty" role="status">
            <div style={{ fontSize: 40 }}>✅</div>
            <h2>You're all caught up for today!</h2>
            <p className="sub">All {total} follow-ups completed with zero overdue leads.</p>
            <button className="btn" onClick={() => setLeads(LEADS)}>Reset demo</button>
          </div>
        ) : (<>
          <div className="tools">
            {(["All", ...SOURCES] as const).map(s => (
              <button key={s} className="tab" aria-pressed={filter === s} onClick={() => setFilter(s)}>{s} ({count(s)})</button>))}
            <input className="input" style={{ marginLeft: "auto" }} type="search" placeholder="Filter lead or phone…" aria-label="Filter leads" value={q} onChange={e => setQ(e.target.value)} />
          </div>

          <div className="cols">
            <section aria-label="Lead queue" aria-busy={loading}>
              {loading && [1, 2, 3, 4].map(i => <div key={i} className="skel" />)}
              {!loading && !visible.length && <div className="card empty"><p className="sub">No leads match this filter.</p><button className="btn out" onClick={() => { setFilter("All"); setQ(""); }}>Clear filters</button></div>}
              {groups.filter(g => g.items.length).map(g => (
                <div key={g.t}>
                  <div className="grp" style={{ color: g.c }}><span>{g.t} ({g.items.length})</span></div>
                  {g.items.map(l => <Row key={l.id} l={l} sel={sel?.id === l.id} onSelect={() => setSelId(l.id)} onCall={() => setDialog(true)} />)}
                </div>))}
            </section>

            {sel && (
              <aside className="card detail" aria-label="Lead details">
                <h2>{sel.name}</h2>
                <p className="sub">{sel.role} @ {sel.company}</p>
                <p style={{ color: "var(--ind)", fontWeight: 600, margin: "4px 0" }}>{money(sel.value)} · Intent {sel.score}/100</p>
                {!sel.done && <SlaChip min={sel.dueInMin} />}
                <div className="lbl">Immediate action</div>
                <button className="btn ok" style={{ width: "100%" }} disabled={!!sel.done} onClick={() => setDialog(true)}>Dial {sel.phone}</button>
                <div className="kv">
                  <div><b>Campaign source</b>{sel.source}</div><div><b>Campaign</b>{sel.campaign}</div>
                </div>
                <div className="lbl">Last note</div>
                <p style={{ margin: 0 }}>“{sel.note}”</p>
              </aside>)}
          </div>
        </>)}
      </main>

      {dialog && sel && <DispositionDialog lead={sel} onClose={() => setDialog(false)} onSave={save} />}
    </div>
  );
}
