import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Job Board</h1>
      <p>Find your dream job</p>
      <div className="flex flex-col items-center justify-center">
        <input type="text" placeholder="Search for a job" />
        <button>Search</button>
      </div>
    </div>
  );
}
