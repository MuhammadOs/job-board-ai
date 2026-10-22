import Link from "next/link";

type props = {
    params: Promise<{ applicationId: string }>;
}

async function ApplicationReviewPage({ params }: props) {
    const { applicationId } = await params;
    return (
        <div>
            <h1>Job Application Review Page</h1>
            <p>Application ID: {applicationId}</p>
            <Link href={`/dashboard/applications/${applicationId}`} className="mt-4 text-blue-500 hover:underline">
                Back to Application Details
            </Link>
        </div>
    );
}

export default ApplicationReviewPage;