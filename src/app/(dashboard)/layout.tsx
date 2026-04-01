import { DashboardSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <main>
        <div className="relative flex h-dvh w-full">
          <DashboardSidebar />
          <SidebarInset className="flex flex-col" />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
