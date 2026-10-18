import Link from "next/link";

function NewJobPage() {
  return (
    <div>
      <h1>New Job Page</h1>
      <Link href="/dashboard/jobs" className="mt-4 text-blue-500 hover:underline">
        Back to Jobs Management
      </Link>
    </div>
  );
}

export default NewJobPage;