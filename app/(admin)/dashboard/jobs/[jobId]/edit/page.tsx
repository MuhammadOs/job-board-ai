import Link from "next/link";

type props = {
    params: Promise<{ jobId: string }>;
};

async function EditJobPage({ params }: props) {
    const { jobId } = await params;
    console.log("Editing Job ID: ", jobId);
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