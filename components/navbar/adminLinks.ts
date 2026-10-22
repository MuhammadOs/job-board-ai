import { Briefcase, LayoutGrid, Users, type LucideIcon } from "lucide-react";

export type AdminLink = { to: string; label: string; icon: LucideIcon };

export const DASHBOARD_ROOT = "/dashboard";

export const adminLinks: AdminLink[] = [
    { to: DASHBOARD_ROOT, label: "OVERVIEW", icon: LayoutGrid },
    { to: "/dashboard/jobs", label: "JOB POSTS", icon: Briefcase },
    { to: "/dashboard/applications", label: "APPLICATIONS", icon: Users },
];

export function isAdminLinkActive(pathname: string, to: string) {
    // The overview must match exactly, otherwise it would be active on every dashboard page
    if (to === DASHBOARD_ROOT) return pathname === to;
    return pathname === to || pathname.startsWith(`${to}/`);
}
