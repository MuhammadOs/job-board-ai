import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-4xl font-black tracking-tighter md:text-6xl">
        JOBS WITH <span className="bg-primary px-2">SALARIES</span>.
      </h1>
      <p className="font-mono text-sm">Find your next career opportunity. No ghost jobs.</p>
      <Link href="/jobs" className="brut brut-press bg-primary px-4 py-2 font-mono text-sm font-bold uppercase">
        Browse Jobs
      </Link>
    </div>
  );
}
