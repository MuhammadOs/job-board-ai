type props = {
  params: Promise<{ id: string }>;
};

async function JobDetailsPage({ params }: props) {
  const { id } = await params;
  console.log(id);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center text-4xl font-bold mb-2">Job Details</h1>
        <div className="flex flex-col items-center *:mt-4 border p-4 rounded">
        <h2 className="text-center text-2xl font-bold">Frontend Developer</h2>
        <p className="text-center text-gray-500">Remote Position</p>
        <p className="text-center">We are looking for a skilled frontend developer with experience in React and TypeScript to join our team.</p>
      </div>
      </div>
  );
}
export default JobDetailsPage;