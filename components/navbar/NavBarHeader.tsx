import Link from "next/link";

const NavBarHeader = ({ children }: { children?: React.ReactNode }) => {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b-[3px] bg-background px-4 py-3 md:px-6">
            <Link href="/" className="text-2xl font-black tracking-tighter">WAZIFA<span className="bg-primary px-1">_</span></Link>
            <div className="flex items-center gap-3">{children}</div>
        </header>
    )
}

export default NavBarHeader;
