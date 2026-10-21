"use client";

import { APPLICATIONS, JOBS, salary } from "@/lib/jobs";
import { Logo, Stamp, TopBar } from "@/components/brut";


export default function ApplicationsPage() {
  return (
    <div className="min-h-screen">
      <TopBar><a href="/" className="hidden font-mono text-sm font-bold underline decoration-2 underline-offset-4 sm:block">BROWSE JOBS</a></TopBar>
      <section className="border-b-[3px] px-4 py-10 md:px-6">
        <p className="font-mono text-xs font-bold">// STATUS BOARD</p>
        <h1 className="text-5xl font-black tracking-tighter md:text-7xl">YOUR TICKETS.</h1>
      </section>
      <div className="grid gap-5 p-4 md:grid-cols-2 md:p-6 xl:grid-cols-3">
        {APPLICATIONS.map((a) => {
          const j = JOBS.find((x) => x.id === a.jobId)!;
          return (
            <div key={a.jobId} className="brut-3 flex bg-card shadow-hard">
              <div className="flex-1 p-4">
                <div className="flex items-center gap-3"><Logo text={j.logo} className="size-10 text-sm" /><div><p className="font-black leading-tight">{j.title}</p><p className="font-mono text-xs">{j.company}</p></div></div>
                <div className="mt-6"><Stamp status={a.status} /></div>
              </div>
              <div className="flex w-28 flex-col justify-between border-l-[3px] border-dashed bg-concrete p-3 font-mono text-xs font-bold">
                <span>{j.id}</span><span>{a.date}</span><span>{salary(j)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
