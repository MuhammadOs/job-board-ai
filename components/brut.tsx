"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { AppStatus } from "@/lib/jobs";

type BtnVariant = "primary" | "plain" | "ink" | "violet";
const btnV: Record<BtnVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  plain: "bg-card text-foreground",
  ink: "bg-foreground text-background",
  violet: "bg-secondary text-secondary-foreground",
};
export function BButton({ variant = "primary", className, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return <button {...p} className={cn("brut brut-press inline-flex items-center justify-center gap-2 px-4 py-2 font-mono text-sm font-bold uppercase disabled:opacity-50", btnV[variant], className)} />;
}

export function Pill({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={cn("brut px-2 py-0.5 font-mono text-xs font-bold", active ? "bg-secondary text-secondary-foreground" : "bg-card")}>
      [{children}]
    </button>
  );
}

const stampColor: Record<AppStatus, string> = {
  SENT: "bg-card", REVIEWING: "bg-primary", INTERVIEW: "bg-secondary text-secondary-foreground", OFFER: "bg-success", REJECTED: "bg-destructive",
};
export function Stamp({ status }: { status: AppStatus }) {
  return <span className={cn("brut-3 animate-stamp inline-block px-3 py-1 font-mono text-sm font-black", stampColor[status])}>[{status}]</span>;
}

export function Logo({ text, className }: { text: string; className?: string }) {
  return <div className={cn("brut-3 grid size-12 shrink-0 place-items-center bg-foreground font-mono font-black text-primary", className)}>{text}</div>;
}

export function ViewToggle() {
  const pathname = usePathname() ?? "/";
  const admin = pathname.startsWith("/dashboard");
  return (
    <div className="brut flex bg-card font-mono text-xs font-bold shadow-hard">
      <Link href="/" className={cn("px-3 py-2", !admin && "bg-primary")}>Dashboard</Link>
      <Link href="/dashboard" className={cn("border-l-2 px-3 py-2", admin && "bg-secondary text-secondary-foreground")}>ADMIN</Link>
    </div>
  );
}

export function TopBar({ children }: { children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b-3 border-b-[3px] bg-background px-4 py-3 md:px-6">
      <Link href="/" className="text-2xl font-black tracking-tighter">RAWJOBS<span className="bg-primary px-1">_</span></Link>
      <div className="flex items-center gap-3">{children}<ViewToggle /></div>
    </header>
  );
}
