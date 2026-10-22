import Link from "next/link";
import { JOBS, salary } from "@/lib/jobs";

function JobsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 md:p-6">
      <h1 className="text-4xl font-black tracking-tighter">Jobs</h1>
      {JOBS.map((job) => (
        <div key={job.id} className="brut-3 flex flex-col gap-2 bg-card p-4 shadow-hard">
          <h2 className="text-2xl font-black">{job.title}</h2>
          <p className="font-mono text-sm">
            {job.company} — {job.location}{job.remote && " / REMOTE"} · {salary(job)}
          </p>
          <Link href={`/jobs/${job.id}`} className="brut brut-press w-fit bg-primary px-4 py-2 font-mono text-sm font-bold uppercase">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default JobsPage;
