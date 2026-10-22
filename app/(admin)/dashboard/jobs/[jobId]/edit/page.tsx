import Link from "next/link";
import { notFound } from "next/navigation";
import { JOBS } from "@/lib/jobs";

type props = {
    params: Promise<{ jobId: string }>;
};

async function EditJobPage({ params }: props) {
    const { jobId } = await params;
    if (!JOBS.some((j) => j.id === jobId)) notFound();
    return (
        <div>
            <h1>Edit Job Page</h1>
            <p>Job ID: {jobId}</p>
            <Link href={`/dashboard/jobs/${jobId}`} className="mt-4 text-blue-500 hover:underline">
                Back to Job Details
            </Link>
            {/* Add your form or content for editing a job here */}
        </div>
  );
}

export default EditJobPage;