"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLinks, DASHBOARD_ROOT, isAdminLinkActive } from "./adminLinks";

const AdminSidebar = () => {
    const pathname = usePathname() ?? "";

    return (
        <aside className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r-[3px] bg-foreground text-background md:flex">
            <div className="border-b-[3px] border-background/30 p-6">
                <Link href={DASHBOARD_ROOT} className="text-xl font-black tracking-tighter">
                    WAZIFA<span className="text-primary">_</span>
                </Link>
                <p className="mt-1 font-mono text-xs font-bold text-background/60">{"// ADMIN"}</p>
            </div>

            <nav aria-label="Admin" className="flex-1">
                {adminLinks.map(({ to, label, icon: Icon }) => {
                    const active = isAdminLinkActive(pathname, to);
                    return (
                        <Link
                            key={to}
                            href={to}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                                "flex items-center gap-3 border-b-2 border-background/20 px-6 py-4 font-mono text-sm font-bold transition-colors",
                                active ? "bg-primary text-primary-foreground" : "hover:bg-background/10"
                            )}
                        >
                            <Icon className="size-4" strokeWidth={3} />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6">
                <Link
                    href="/dashboard/jobs/new"
                    className="brut flex items-center justify-center gap-2 border-background bg-primary px-4 py-2 font-mono text-sm font-bold text-primary-foreground"
                >
                    POST NEW JOB <Plus className="size-4" strokeWidth={3} />
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
