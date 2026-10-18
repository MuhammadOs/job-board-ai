import Link from "next/link";

function JobsPage() {
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center text-4xl font-bold mb-2">Jobs</h1>
        <div className="flex flex-col items-center *:mt-4 border p-4 rounded">
        <h2 className="text-center text-2xl font-bold">Frontend Developer</h2>
        <p className="text-center text-gray-500">Remote Position</p>
        <Link href="/jobs/1" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Details
        </Link>
      </div>
      </div>
  );
}

export default JobsPage;