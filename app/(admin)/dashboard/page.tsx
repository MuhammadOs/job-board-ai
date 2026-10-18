import Link from "next/link";

const navigationLinks = [
  { href: "/dashboard/jobs", label: "Jobs" },
  { href: "/dashboard/applications", label: "Applications" },
];

function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      {navigationLinks.map(({ href, label }) => (
        <Link key={href} href={href} className="mt-4 text-blue-500 hover:underline">
          {label}
        </Link>
      ))}
    </div>
  );
}

export default DashboardPage;