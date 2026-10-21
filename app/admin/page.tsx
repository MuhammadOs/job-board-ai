"use client";

import { useState } from "react";
import { LayoutGrid, Briefcase, Kanban, Users, CreditCard, Plus, Mail, Eye, X, ChevronRight, AlertTriangle } from "lucide-react";
import { CANDIDATES, JOBS, STAGES, salary, type Candidate, type Stage } from "@/lib/jobs";
import { BButton, Logo, TopBar } from "@/components/brut";
import { cn } from "@/lib/utils";


type Tab = "overview" | "jobs" | "pipeline" | "pool" | "billing" | "builder";
const NAV: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "OVERVIEW", icon: LayoutGrid },
  { id: "jobs", label: "JOBS MANAGER", icon: Briefcase },
  { id: "pipeline", label: "ATS PIPELINE", icon: Kanban },
  { id: "pool", label: "CANDIDATE POOL", icon: Users },
  { id: "billing", label: "BILLING", icon: CreditCard },
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [cands, setCands] = useState(CANDIDATES);
  const [preview, setPreview] = useState<Candidate | null>(null);
  const move = (id: string, stage: Stage) => setCands((c) => c.map((x) => (x.id === id ? { ...x, stage } : x)));

  return (
    <div className="min-h-screen">
      <TopBar><BButton onClick={() => setTab("builder")} className="hidden sm:inline-flex">POST NEW JOB <Plus className="size-4" strokeWidth={3} /></BButton></TopBar>
      <div className="flex">
        <nav className="sticky top-[66px] hidden h-[calc(100vh-66px)] w-56 shrink-0 border-r-[3px] bg-card md:block">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setTab(n.id)} className={cn("flex w-full items-center gap-3 border-b-2 px-4 py-4 font-mono text-sm font-bold", tab === n.id && "bg-secondary text-secondary-foreground")}>
              <n.icon className="size-4" strokeWidth={3} />{n.label}
            </button>
          ))}
        </nav>
        <div className="flex border-b-2 md:hidden" />
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
            {NAV.map((n) => <button key={n.id} onClick={() => setTab(n.id)} className={cn("brut shrink-0 px-2 py-1 font-mono text-xs font-bold", tab === n.id ? "bg-secondary text-secondary-foreground" : "bg-card")}>{n.label}</button>)}
            <button onClick={() => setTab("builder")} className="brut shrink-0 bg-primary px-2 py-1 font-mono text-xs font-bold">+ POST</button>
          </div>
          {tab === "overview" && <Overview cands={cands} />}
          {tab === "pipeline" && <Pipeline cands={cands} move={move} onPreview={setPreview} />}
          {tab === "pool" && <Ledger cands={cands} move={move} onPreview={setPreview} />}
          {tab === "jobs" && <JobsManager />}
          {tab === "billing" && <Billing />}
          {tab === "builder" && <Builder />}
        </main>
      </div>
      {preview && <ResumeDrawer c={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}

function H({ k, t }: { k: string; t: string }) {
  return <div className="mb-5"><p className="font-mono text-xs font-bold">// {k}</p><h1 className="text-4xl font-black tracking-tighter md:text-5xl">{t}</h1></div>;
}

function Overview({ cands }: { cands: Candidate[] }) {
  const kpis = [
    { l: "ACTIVE LISTINGS", v: String(JOBS.length).padStart(2, "0"), c: "bg-primary" },
    { l: "TOTAL APPLICANTS", v: "1,284", c: "bg-secondary text-secondary-foreground" },
    { l: "COST PER HIRE", v: "$2.4K", c: "bg-success" },
    { l: "CONVERSION", v: "6.8%", c: "bg-card" },
  ];
  return (
    <>
      <H k="OVERVIEW" t="COMMAND CENTER" />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((k) => <div key={k.l} className={cn("brut-3 p-4 shadow-hard", k.c)}><p className="font-mono text-xs font-bold">{k.l}</p><p className="mt-2 font-mono text-4xl font-black md:text-5xl">{k.v}</p></div>)}
      </div>
      <div className="brut-3 mt-6 flex items-center gap-3 bg-destructive p-3 font-mono text-sm font-bold">
        <AlertTriangle className="size-5" strokeWidth={3} /> 2 LISTINGS EXPIRE IN 48H — RENEW TO KEEP THEM LIVE.
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {STAGES.map((s) => <div key={s} className="brut bg-card p-4"><p className="font-mono text-xs font-bold">{s}</p><p className="font-mono text-3xl font-black">{cands.filter((c) => c.stage === s).length}</p></div>)}
      </div>
    </>
  );
}

function MatchBadge({ m }: { m: number }) {
  return <span className={cn("brut px-1.5 font-mono text-xs font-black", m >= 90 ? "bg-success" : m >= 80 ? "bg-primary" : "bg-card")}>{m}% MATCH</span>;
}

function Pipeline({ cands, move, onPreview }: { cands: Candidate[]; move: (id: string, s: Stage) => void; onPreview: (c: Candidate) => void }) {
  const [over, setOver] = useState<Stage | null>(null);
  return (
    <>
      <H k="ATS PIPELINE" t="KANBAN" />
      <div className="brut-3 grid min-w-0 overflow-x-auto bg-card md:grid-cols-4">
        {STAGES.map((s, i) => (
          <div key={s} onDragOver={(e) => { e.preventDefault(); setOver(s); }} onDragLeave={() => setOver(null)}
            onDrop={(e) => { move(e.dataTransfer.getData("id"), s); setOver(null); }}
            className={cn("min-h-[420px] border-b-[3px] p-3 md:border-b-0", i < 3 && "md:border-r-[3px]", over === s && "bg-primary")}>
            <p className="mb-3 flex justify-between font-mono text-sm font-black">{s}<span>{cands.filter((c) => c.stage === s).length}</span></p>
            <div className="space-y-3">
              {cands.filter((c) => c.stage === s).map((c) => (
                <div key={c.id} draggable onDragStart={(e) => e.dataTransfer.setData("id", c.id)} className="brut cursor-grab bg-background p-3 shadow-hard active:cursor-grabbing">
                  <div className="flex items-start justify-between gap-2"><p className="font-black leading-tight">{c.name}</p><MatchBadge m={c.match} /></div>
                  <p className="mt-1 font-mono text-xs">{c.role}</p>
                  <div className="mt-3 flex gap-1.5">
                    <button onClick={() => onPreview(c)} className="brut bg-card p-1" aria-label="Preview resume"><Eye className="size-3.5" strokeWidth={3} /></button>
                    <a href={`mailto:${c.email}`} className="brut bg-card p-1" aria-label="Email"><Mail className="size-3.5" strokeWidth={3} /></a>
                    {i < 3 && <button onClick={() => move(c.id, STAGES[i + 1]!)} className="brut bg-primary p-1" aria-label="Advance"><ChevronRight className="size-3.5" strokeWidth={3} /></button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Ledger({ cands, move, onPreview }: { cands: Candidate[]; move: (id: string, s: Stage) => void; onPreview: (c: Candidate) => void }) {
  const [sel, setSel] = useState<string[]>([]);
  const all = sel.length === cands.length;
  const cell = "border-2 px-3 py-2";
  return (
    <>
      <H k="CANDIDATE POOL" t="RAW LEDGER" />
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold">
        <span>{sel.length} SELECTED</span>
        <BButton variant="plain" disabled={!sel.length} onClick={() => { sel.forEach((id) => move(id, "SCREENING")); setSel([]); }} className="px-2 py-1 text-xs">MOVE TO SCREENING</BButton>
      </div>
      <div className="overflow-x-auto">
        <table className="brut-3 w-full border-collapse bg-card font-mono text-sm">
          <thead className="bg-foreground text-background"><tr>
            <th className={cell}><input type="checkbox" checked={all} onChange={() => setSel(all ? [] : cands.map((c) => c.id))} /></th>
            {["ID", "NAME", "ROLE", "EXP", "MATCH", "STAGE", ""].map((h) => <th key={h} className={cn(cell, "text-left")}>{h}</th>)}
          </tr></thead>
          <tbody>{cands.map((c) => (
            <tr key={c.id} className={cn(sel.includes(c.id) && "bg-primary")}>
              <td className={cell}><input type="checkbox" checked={sel.includes(c.id)} onChange={() => setSel((s) => s.includes(c.id) ? s.filter((x) => x !== c.id) : [...s, c.id])} /></td>
              <td className={cell}>{c.id}</td><td className={cn(cell, "font-sans font-bold")}>{c.name}</td><td className={cell}>{c.role}</td><td className={cell}>{c.exp}</td>
              <td className={cell}><MatchBadge m={c.match} /></td>
              <td className={cell}><select value={c.stage} onChange={(e) => move(c.id, e.target.value as Stage)} className="brut bg-secondary px-1 text-xs font-bold text-secondary-foreground">{STAGES.map((s) => <option key={s}>{s}</option>)}</select></td>
              <td className={cell}><button onClick={() => onPreview(c)} className="underline decoration-2">RESUME</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}

function ResumeDrawer({ c, onClose }: { c: Candidate; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="h-full w-full max-w-md overflow-y-auto border-l-[3px] bg-background p-5">
        <div className="flex justify-between font-mono text-xs font-bold"><span>RESUME // {c.id}</span><button onClick={onClose} className="brut bg-card p-1" aria-label="Close"><X className="size-4" strokeWidth={3} /></button></div>
        <h2 className="mt-4 text-3xl font-black">{c.name}</h2>
        <p className="font-mono text-sm">{c.role} · {c.exp}</p>
        <div className="mt-3"><MatchBadge m={c.match} /></div>
        <div className="brut mt-5 space-y-2 bg-card p-4">
          {Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-3 bg-concrete" style={{ width: `${60 + ((i * 37) % 40)}%` }} />)}
        </div>
        <BButton className="mt-5 w-full">ADVANCE CANDIDATE</BButton>
      </div>
    </div>
  );
}

function JobsManager() {
  return (
    <>
      <H k="JOBS MANAGER" t="LISTINGS" />
      <div className="grid gap-3">{JOBS.map((j) => (
        <div key={j.id} className="brut flex flex-wrap items-center gap-4 bg-card p-3">
          <Logo text={j.logo} className="size-10 text-sm" />
          <div className="flex-1"><p className="font-black">{j.title}</p><p className="font-mono text-xs">{j.id} · {j.posted}</p></div>
          <span className="font-mono text-sm font-bold">{salary(j)}</span>
          <span className="brut bg-success px-2 font-mono text-xs font-bold">HIRING</span>
        </div>
      ))}</div>
    </>
  );
}

function Billing() {
  return (
    <>
      <H k="BILLING" t="PLAN & INVOICES" />
      <div className="brut-3 max-w-md bg-primary p-5 shadow-hard"><p className="font-mono text-xs font-bold">CURRENT PLAN</p><p className="text-4xl font-black">SCALE</p><p className="font-mono">$499 / MONTH · 10 LISTINGS</p></div>
      <div className="brut mt-6 max-w-md bg-card p-6 text-center font-mono text-sm">NO INVOICES YET. YOUR FIRST ONE ARRIVES NOV 01.</div>
    </>
  );
}

function Builder() {
  const [f, setF] = useState({ title: "Senior Product Designer", company: "Your Company", location: "Remote", min: 110, max: 140, stack: "FIGMA, REACT", featured: true });
  const set = (k: keyof typeof f, v: string | number | boolean) => setF((p) => ({ ...p, [k]: v }));
  const input = "brut-3 w-full bg-card px-3 py-2 font-mono font-bold outline-none focus:bg-primary";
  return (
    <>
      <H k="JOB POST BUILDER" t="NEW LISTING" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {(["title", "company", "location"] as const).map((k) => (
            <label key={k} className="block"><span className="font-mono text-xs font-bold uppercase">{k}</span><input className={input} value={f[k]} onChange={(e) => set(k, e.target.value)} /></label>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <label><span className="font-mono text-xs font-bold">SALARY MIN ($K)</span><input type="number" className={input} value={f.min} onChange={(e) => set("min", +e.target.value)} /></label>
            <label><span className="font-mono text-xs font-bold">SALARY MAX ($K)</span><input type="number" className={input} value={f.max} onChange={(e) => set("max", +e.target.value)} /></label>
          </div>
          {f.min > f.max && <p className="brut bg-destructive p-2 font-mono text-xs font-bold">MIN SALARY CANNOT EXCEED MAX.</p>}
          <label className="block"><span className="font-mono text-xs font-bold">STACK (COMMA SEPARATED)</span><input className={input} value={f.stack} onChange={(e) => set("stack", e.target.value)} /></label>
          <label className="flex items-center gap-2 font-mono text-sm font-bold"><input type="checkbox" checked={f.featured} onChange={(e) => set("featured", e.target.checked)} /> FEATURED (+$99)</label>
          <BButton disabled={!f.title || f.min > f.max} className="w-full py-3">PUBLISH LISTING</BButton>
        </div>
        <div>
          <p className="mb-2 font-mono text-xs font-bold">// LIVE PREVIEW</p>
          <article className={cn("brut-3 p-4 shadow-hard-lg", f.featured ? "bg-primary" : "bg-card")}>
            <div className="flex gap-4">
              <Logo text={(f.company || "??").slice(0, 2).toUpperCase()} />
              <div className="flex-1">
                <p className="font-mono text-xs font-bold">JB-NEW · JUST NOW {f.featured && <span className="brut ml-1 bg-foreground px-1.5 text-primary">FEATURED</span>}</p>
                <h3 className="mt-1 text-2xl font-black leading-tight">{f.title || "Untitled role"}</h3>
                <p className="font-mono text-sm">{f.company} — {f.location}</p>
              </div>
            </div>
            <div className="brut mt-4 inline-block bg-card px-2 py-1 font-mono font-black">{salary({ salaryMin: f.min, salaryMax: f.max })}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">{f.stack.split(",").map((s) => s.trim()).filter(Boolean).map((s) => <span key={s} className="brut bg-card px-1.5 font-mono text-xs font-bold">[{s.toUpperCase()}]</span>)}</div>
          </article>
        </div>
      </div>
    </>
  );
}
