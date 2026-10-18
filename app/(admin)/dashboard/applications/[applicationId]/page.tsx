import Link from "next/link";

type props = {
    params: Promise<{applicationId: string}>;
};

async function ApplicationDetailsPage({ params }: props) {
    const { applicationId } = await params;
    console.log("Application ID: ", applicationId);
    return (
        <div>
            <h1>Job Application Details Page</h1>
            <p>Application ID: {applicationId}</p>
            <Link href={`/dashboard/applications/${applicationId}/review`} className="mt-4 text-blue-500 hover:underline">
                Review Application
            </Link>
        </div>
    );
}

export default ApplicationDetailsPage;