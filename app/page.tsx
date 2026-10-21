"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, MapPin, Upload, X, Check, ArrowRight, AlertTriangle } from "lucide-react";
import { JOBS, STACKS, salary, type Job } from "@/lib/jobs";
import { BButton, Logo, Pill, TopBar } from "@/components/brut";
import { cn } from "@/lib/utils";


const TICKER = "// 428 LIVE ROLES // AVG SALARY $115K // NO GHOST JOBS // 100% SALARY TRANSPARENCY // 2-CLICK APPLY ";

export default function DiscoverPage() {
  const [q, setQ] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [stacks, setStacks] = useState<string[]>([]);
  const [minSal, setMinSal] = useState(60);
  const [selected, setSelected] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (window.innerWidth >= 1024) setSelected(JOBS[0] ?? null); const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, []);

  const jobs = useMemo(() => JOBS.filter((j) =>
    (!q || `${j.title} ${j.company} ${j.location}`.toLowerCase().includes(q.toLowerCase())) &&
    (!remoteOnly || j.remote) && j.salaryMax >= minSal &&
    (stacks.length === 0 || stacks.some((s) => j.stack.includes(s)))
  ), [q, remoteOnly, stacks, minSal]);

  const toggle = (s: string) => setStacks((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <div className="min-h-screen">
      <TopBar><a href="/applications" className="hidden font-mono text-sm font-bold underline decoration-2 underline-offset-4 sm:block">MY APPLICATIONS</a></TopBar>

      <div className="overflow-hidden border-b-[3px] bg-foreground py-2 text-primary">
        <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-sm font-bold">
          <span>{TICKER.repeat(4)}</span><span>{TICKER.repeat(4)}</span>
        </div>
      </div>

      <section className="border-b-[3px] px-4 py-12 md:px-6 md:py-16">
        <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-tighter md:text-8xl">
          JOBS WITH <span className="bg-primary px-2">SALARIES</span>.<br />NOTHING ELSE.
        </h1>
        <div className="mt-8 flex max-w-4xl flex-col gap-3 md:flex-row">
          <label className="brut-3 flex flex-1 items-center gap-3 bg-card px-4 py-3 shadow-hard-lg">
            <Search className="size-5" strokeWidth={3} />
            <input ref={searchRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search role, company, city…" className="w-full bg-transparent font-mono font-bold outline-none placeholder:text-muted-foreground" />
            <kbd className="brut bg-concrete px-1.5 font-mono text-xs">⌘K</kbd>
          </label>
          <button onClick={() => setRemoteOnly((r) => !r)} className={cn("brut-3 brut-press flex items-center gap-2 px-4 py-3 font-mono font-bold", remoteOnly ? "bg-success" : "bg-card")}>
            <MapPin className="size-4" strokeWidth={3} /> REMOTE: {remoteOnly ? "ON" : "OFF"}
          </button>
        </div>
      </section>

      <div className="grid lg:grid-cols-[260px_1fr_420px]">
        <aside className="border-b-[3px] p-4 lg:sticky lg:top-[66px] lg:h-[calc(100vh-66px)] lg:border-r-[3px] lg:border-b-0">
          <h2 className="mb-3 font-mono text-xs font-bold">// FILTERS</h2>
          <div className="brut bg-card p-3">
            <p className="mb-2 font-mono text-xs font-bold">MIN SALARY: ${minSal}K</p>
            <input type="range" min={60} max={180} step={10} value={minSal} onChange={(e) => setMinSal(+e.target.value)} className="w-full accent-[var(--ink)]" />
          </div>
          <div className="brut mt-3 bg-card p-3">
            <p className="mb-2 font-mono text-xs font-bold">TECH STACK</p>
            <div className="flex flex-wrap gap-1.5">{STACKS.map((s) => <Pill key={s} active={stacks.includes(s)} onClick={() => toggle(s)}>{s}</Pill>)}</div>
          </div>
          <label className="brut mt-3 flex cursor-pointer items-center gap-3 bg-card p-3 font-mono text-xs font-bold">
            <span className={cn("brut grid size-5 place-items-center", remoteOnly && "bg-secondary text-secondary-foreground")}>{remoteOnly && <Check className="size-3" strokeWidth={4} />}</span>
            <input type="checkbox" className="hidden" checked={remoteOnly} onChange={() => setRemoteOnly((r) => !r)} /> REMOTE ONLY
          </label>
        </aside>

        <main className="space-y-4 p-4 md:p-6">
          <p className="font-mono text-xs font-bold">{loading ? "LOADING…" : `${jobs.length} RESULTS`}</p>
          {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="brut-3 h-36 animate-pulse bg-concrete" />)
            : jobs.length === 0 ? (
              <div className="brut-3 bg-card p-10 text-center shadow-hard">
                <AlertTriangle className="mx-auto size-10" strokeWidth={3} />
                <p className="mt-3 text-2xl font-black">NO MATCHES.</p>
                <p className="font-mono text-sm">Loosen your filters. We don't invent jobs.</p>
              </div>
            ) : jobs.map((j) => (
              <article key={j.id} onClick={() => setSelected(j)} className={cn("brut-3 cursor-pointer p-4 transition-transform hover:-translate-y-0.5", j.featured ? "bg-primary" : "bg-card", selected?.id === j.id ? "shadow-hard-lg" : "shadow-hard")}>
                <div className="flex gap-4">
                  <Logo text={j.logo} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
                      <span>{j.id}</span><span>·</span><span>{j.posted}</span>
                      {j.featured && <span className="brut bg-foreground px-1.5 text-primary">FEATURED</span>}
                    </div>
                    <h3 className="mt-1 text-xl font-black leading-tight md:text-2xl">{j.title}</h3>
                    <p className="font-mono text-sm">{j.company} — {j.location}{j.remote && " / REMOTE"}</p>
                  </div>
                  <span className="brut hidden h-fit bg-card px-2 py-1 font-mono text-sm font-black sm:block">{salary(j)}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">{j.stack.map((s) => <span key={s} className="brut bg-card px-1.5 font-mono text-xs font-bold">[{s}]</span>)}</div>
                  <BButton variant="ink" onClick={(e) => { e.stopPropagation(); setSelected(j); }}>APPLY NOW <ArrowRight className="size-4" strokeWidth={3} /></BButton>
                </div>
              </article>
            ))}
        </main>

        {selected && <Dossier job={selected} onClose={() => setSelected(null)} />}
      </div>
    </div>
  );
}

function Dossier({ job, onClose }: { job: Job; onClose: () => void }) {
  const [file, setFile] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  useEffect(() => { setFile(null); setSent(false); }, [job.id]);
  return (
    <aside className="fixed inset-0 z-40 overflow-y-auto bg-background p-4 lg:sticky lg:top-[66px] lg:z-0 lg:h-[calc(100vh-66px)] lg:border-l-[3px]">
      <div className="flex items-center justify-between border-b-2 pb-2 font-mono text-xs font-bold">
        <span>DOSSIER // {job.id}</span>
        <button onClick={onClose} className="brut bg-card p-1" aria-label="Close"><X className="size-4" strokeWidth={3} /></button>
      </div>
      <h2 className="mt-4 text-3xl font-black leading-none">{job.title}</h2>
      <p className="mt-2 font-mono text-sm">{job.company} · {job.type}</p>
      <div className="brut-3 mt-4 bg-primary p-3 font-mono text-2xl font-black">{salary(job)}</div>
      <p className="mt-4">{job.summary}</p>
      <h3 className="mt-5 font-mono text-xs font-bold">// REQUIREMENTS</h3>
      <ul className="mt-2 space-y-1.5">{job.requirements.map((r, i) => <li key={r} className="flex gap-2"><span className="font-mono font-bold">{String(i + 1).padStart(2, "0")}</span>{r}</li>)}</ul>
      <h3 className="mt-5 font-mono text-xs font-bold">// STACK</h3>
      <div className="mt-2 flex flex-wrap gap-1.5">{job.stack.map((s) => <span key={s} className="brut bg-secondary px-1.5 font-mono text-xs font-bold text-secondary-foreground">[{s}]</span>)}</div>
      <div className="mt-5 grid grid-cols-3 border-2">
        {Object.entries(job.facts).map(([k, v]) => <div key={k} className="border-r-2 p-2 last:border-r-0"><p className="font-mono text-[10px] font-bold uppercase">{k}</p><p className="font-black">{v}</p></div>)}
      </div>
      <div className="mt-5">
        {sent ? (
          <div className="brut-3 bg-success p-4 text-center font-mono font-black">[SENT] APPLICATION DELIVERED.</div>
        ) : (
          <>
            <label className="brut-3 flex cursor-pointer items-center justify-center gap-2 border-dashed bg-card p-5 font-mono text-sm font-bold">
              <Upload className="size-4" strokeWidth={3} /> {file ?? "1. DROP RESUME (PDF)"}
              <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)} />
            </label>
            <BButton className="mt-3 w-full py-3" disabled={!file} onClick={() => setSent(true)}>2. SEND APPLICATION <ArrowRight className="size-4" strokeWidth={3} /></BButton>
          </>
        )}
      </div>
    </aside>
  );
}
