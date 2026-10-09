import { useEffect, useRef, useState } from "react";
import { Lead, OUTCOMES, PRESETS } from "./data";
import { validate } from "./validate";

interface Props { lead: Lead; onClose(): void; onSave(outcome: string, next: boolean): void }

export default function DispositionDialog({ lead, onClose, onSave }: Props) {
  const [key, setKey] = useState<string>();
  const [preset, setPreset] = useState<string>();
  const [notes, setNotes] = useState("");
  const [tried, setTried] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const out = OUTCOMES.find(o => o.key === key);

  const errors = validate(key, preset, notes);

  const submit = (next: boolean) => {
    setTried(true);
    if (errors.length) return;
    onSave(out!.label, next);
  };

  useEffect(() => { ref.current?.focus(); }, []);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "Enter" && (e.shiftKey || e.metaKey || e.ctrlKey)) { e.preventDefault(); return submit(true); }
    const t = e.target as HTMLElement;
    if (t.tagName !== "TEXTAREA" && OUTCOMES.some(o => o.key === e.key)) setKey(e.key); // hotkeys 1–6
  };

  return (
    <div className="overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="dt" tabIndex={-1} ref={ref} onKeyDown={onKey}>
        <h2 id="dt" style={{ margin: 0, fontSize: 20 }}>Log call · {lead.name}</h2>
        <p className="sub">{lead.phone} · Local time 10:45 AM · press <kbd>1</kbd>–<kbd>6</kbd> to pick an outcome</p>

        <div className="lbl" id="o">1. Call outcome</div>
        <div className="outs" role="radiogroup" aria-labelledby="o">
          {OUTCOMES.map(o => (
            <button key={o.key} role="radio" aria-checked={key === o.key} className="out" onClick={() => setKey(o.key)}>
              <span><b>{o.label}</b><br /><span className="meta">{o.sub}</span></span><kbd>{o.key}</kbd>
            </button>
          ))}
        </div>

        {out?.schedule && (
          <div className="panel">
            <div className="lbl" style={{ marginTop: 0 }}>2. Schedule demo / next interaction · <span style={{ color: "var(--ind)" }}>Synced with Google Cal</span></div>
            <div className="chips">
              <span className="meta">Presets:</span>
              {Object.keys(PRESETS).map(p => <button key={p} className="chip" aria-pressed={preset === p} onClick={() => setPreset(p)}>{p}</button>)}
            </div>
            <div className="trio">
              <div><div className="meta">Scheduled date</div><div className="input">{preset ? PRESETS[preset][0] : "Pick a preset"}</div></div>
              <div><div className="meta">Slot time</div><div className="input">{preset ? PRESETS[preset][1] : "—"}</div></div>
              <div><div className="meta">Host &amp; co-host</div><select className="input" style={{ width: "100%" }} aria-label="Host"><option>Rep Alex + SE</option><option>Sarah Jenkins + SE (Alex)</option></select></div>
            </div>
            <label className="meta" style={{ display: "block", marginTop: 8 }}><input type="checkbox" defaultChecked /> Send Google Calendar / Outlook invite to lead &amp; auto-generate Zoom link</label>
          </div>)}

        <div className="lbl"><label htmlFor="cn">{out?.schedule ? "3." : "2."} Call notes {out?.notes ? "(required)" : "(optional)"}</label></div>
        <textarea id="cn" className="input" value={notes} onChange={e => setNotes(e.target.value)} aria-invalid={tried && !!errors.length} placeholder="What was discussed, objections handled…" />

        <div className="chips" style={{ marginTop: 8 }}>
          {["Proposal Needed", "Send NDA", "High Value Lead", "Request SE Support"].map(t => (
            <button key={t} className="chip" aria-pressed={tags.includes(t)} onClick={() => setTags(x => x.includes(t) ? x.filter(y => y !== t) : [...x, t])}>{tags.includes(t) ? "✓ " : "+ "}{t}</button>))}
          <span className="meta" style={{ marginLeft: "auto" }}>Ctrl+N for bullet list</span>
        </div>
        {out && (
          <div className="panel"><div className="lbl" style={{ marginTop: 0 }}>4. Pipeline progression</div>
            <div className="meta">Current stage <s>Contacted</s> → Advancing to <b style={{ color: "var(--ind)" }}>{out.stage}</b></div></div>)}

        {tried && errors.map(e => <p key={e} className="err" role="alert">{e}</p>)}

        <div className="foot">
          <button className="btn out" style={{ marginRight: "auto", color: "var(--dx)" }} onClick={onClose}>Discard Call Log</button>
          <button className="btn out" onClick={() => submit(false)}>Save &amp; Close</button>
          <button className="btn" onClick={() => submit(true)}>Save &amp; Next in Queue <kbd>⇧↵</kbd></button>
        </div>
      </div>
    </div>
  );
}
