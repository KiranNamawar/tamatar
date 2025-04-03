import TmtrDashboardNavbar from "@/components/tmtr/dashboard-navbar";

export default function TmtrDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <TmtrDashboardNavbar />
            {children}
        </div>
    );
    
}