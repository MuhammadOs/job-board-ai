import { notFound } from "next/navigation";
import { JOBS, salary } from "@/lib/jobs";

type props = {
  params: Promise<{ id: string }>;
};

async function JobDetailsPage({ params }: props) {
  const { id } = await params;
  const job = JOBS.find((j) => j.id === id);
  if (!job) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4 md:p-6">
      <p className="font-mono text-xs font-bold">{"// "}{job.id} · {job.posted}</p>
      <h1 className="text-4xl font-black tracking-tighter">{job.title}</h1>
      <p className="font-mono text-sm">
        {job.company} — {job.location}{job.remote && " / REMOTE"} · {job.type}
      </p>
      <div className="brut-3 w-fit bg-primary px-3 py-2 font-mono text-2xl font-black">{salary(job)}</div>
      <p>{job.summary}</p>
      <ul className="list-inside list-disc">
        {job.requirements.map((r) => <li key={r}>{r}</li>)}
      </ul>
    </div>
  );
}
export default JobDetailsPage;
