import Link from "next/link";
import { JOBS } from "@/lib/jobs";

function JobsManagementPage() {
  return (
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-4xl font-bold">Jobs Management</h1>
      <Link href="/dashboard/jobs/new" className="mt-4 text-blue-500 hover:underline">
        Create New Job
      </Link>
      {JOBS.map((job) => (
        <Link key={job.id} href={`/dashboard/jobs/${job.id}`} className="mt-4 text-blue-500 hover:underline">
          {job.id} — {job.title}
        </Link>
      ))}
    </div>
  );
}

export default JobsManagementPage;