import Link from "next/link";

const applications = [1, 2, 3];

function JobApplicationsPage() {
  return (
    <div className="flex flex-col gap-2 p-6">
      <h1 className="text-3xl font-bold">Job Applications Page</h1>
      {applications.map((applicationId) => (
        <Link
          key={applicationId}
          href={`/dashboard/applications/${applicationId}`}
          className="mt-2 text-blue-500 hover:underline"
        >
          Application {applicationId}
        </Link>
      ))}
    </div>
  );
}

export default JobApplicationsPage;