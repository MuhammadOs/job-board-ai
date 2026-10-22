"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLinks, DASHBOARD_ROOT, isAdminLinkActive } from "./adminLinks";

/** Mobile replacement for AdminSidebar (hidden on md+) */
const AdminTabs = () => {
    const pathname = usePathname() ?? "";

    return (
        <div className="border-b-[3px] bg-foreground px-4 py-3 text-background md:hidden">
            <Link href={DASHBOARD_ROOT} className="text-xl font-black tracking-tighter">
                WAZIFA<span className="text-primary">_</span>
            </Link>
            <nav aria-label="Admin" className="mt-3 flex gap-2 overflow-x-auto">
                {adminLinks.map(({ to, label }) => {
                    const active = isAdminLinkActive(pathname, to);
                    return (
                        <Link
                            key={to}
                            href={to}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                                "brut shrink-0 border-background px-2 py-1 font-mono text-xs font-bold",
                                active ? "bg-primary text-primary-foreground" : "bg-foreground"
                            )}
                        >
                            {label}
                        </Link>
                    );
                })}
                <Link href="/dashboard/jobs/new" className="brut shrink-0 border-background bg-primary px-2 py-1 font-mono text-xs font-bold text-primary-foreground">
                    + POST
                </Link>
            </nav>
        </div>
    );
};

export default AdminTabs;
