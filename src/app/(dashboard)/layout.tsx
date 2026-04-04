"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { DashboardSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const session = authClient.useSession();
  if (session.isPending) {
    return null;
  }
  if (!session.data?.user) {
    router.push("/login");
  }

  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex flex-1 flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-y-auto"
            >
              <Suspense fallback="Loading...">{children}</Suspense>
            </motion.main>
          </AnimatePresence>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
