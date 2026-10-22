import AdminSidebar from "@/components/navbar/AdminSidebar";
import AdminTabs from "@/components/navbar/AdminTabs";

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        // Full-height shell: sidebar and main content scroll independently
        <div className="flex h-dvh flex-col md:flex-row">
            <AdminSidebar />
            <AdminTabs />
            <main className="min-h-0 min-w-0 flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
    )
}

export default DashboardLayout;
