import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Job Board</h1>
      <p>Find your dream job</p>
      <Button variant="destructive">Browse Jobs</Button>
    </div>
  );
}
