import Link from "next/link";

type Props = {
  params: Promise<{ jobId: string }>;
};

async function JobDetailsPage({ params }: Props) {
  const { jobId } = await params;

  return (
    <div>
      <h1>Job Page</h1>
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