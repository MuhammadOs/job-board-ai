import Link from "next/link";

const jobIds = [1, 2, 3];

function JobsManagementPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold">Jobs Management</h1>
      <Link href="/dashboard/jobs/new" className="mt-4 text-blue-500 hover:underline">
        Create New Job
      </Link>
      {jobIds.map((jobId) => (
        <Link key={jobId} href={`/dashboard/jobs/${jobId}`} className="mt-4 text-blue-500 hover:underline">
          Job {jobId}
        </Link>
      ))}
    </div>
  );
}

export default JobsManagementPage;