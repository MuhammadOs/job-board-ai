import Link from "next/link";
import { notFound } from "next/navigation";
import { JOBS } from "@/lib/jobs";

type Props = {
  params: Promise<{ jobId: string }>;
};

async function JobDetailsPage({ params }: Props) {
  const { jobId } = await params;
  const job = JOBS.find((j) => j.id === jobId);
  if (!job) notFound();

  return (
    <div>
      <h1>{job.title}</h1>
      <p>Job ID: {jobId}</p>
      <Link href={`/dashboard/jobs/${jobId}/edit`} className="mt-4 text-blue-500 hover:underline">
        Edit Job
      </Link>
      <Link href="/dashboard/jobs" className="mt-4 text-blue-500 hover:underline">
        Back to Jobs Management
      </Link>
    </div>
  );
}

export default JobDetailsPage;