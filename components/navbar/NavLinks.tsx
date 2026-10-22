"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string };

function isActive(pathname: string, href: string) {
    // "/" must match exactly, otherwise it would be active on every page
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ items }: { items: NavItem[] }) {
    const pathname = usePathname() ?? "/";

    return (
        <nav aria-label="Main" className="brut flex bg-card font-mono text-xs font-bold shadow-hard">
            {items.map(({ href, label }, i) => {
                const active = isActive(pathname, href);
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={cn("px-3 py-2 transition-colors hover:bg-primary", i > 0 && "border-l-2", active && "bg-primary")}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}

export default NavLinks;
