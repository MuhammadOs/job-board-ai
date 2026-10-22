import NavBarFooter from "@/components/navbar/NavBarFooter";
import NavBarHeader from "@/components/navbar/NavBarHeader";
import NavLinks, { type NavItem } from "@/components/navbar/NavLinks";

const NAV_ITEMS: NavItem[] = [
    { href: "/", label: "HOME" },
    { href: "/jobs", label: "BROWSE JOBS" },
];

function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBarHeader>
                <NavLinks items={NAV_ITEMS} />
            </NavBarHeader>
            <main className="flex-1">{children}</main>
            <NavBarFooter />
        </div>
    )
}

export default AppLayout;
