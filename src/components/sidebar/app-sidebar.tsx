"use client";

import { motion } from "framer-motion";
import {
  Home,
  LucideBookDown,
  Settings,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/sidebar/logo";
import DashboardNavigation from "@/components/sidebar/nav-main";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { Route } from "./nav-main";

const dashboardRoutes: Route[] = [
  {
    id: "home",
    title: "Home",
    icon: <Home className="size-4" />,
    link: "/",
  },
  {
    id: "generate",
    title: "Genarate",
    icon: <LucideBookDown className="size-4" />,
    link: "/generate",
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings className="size-4" />,
    link: "#",
    subs: [
      { title: "Create user", link: "/settings/users" },
      { title: "Change Password", link: "/settings/change-password" },
      { title: "Custom Fields", link: "#" },
    ],
  },
];

const teams = [
  { id: "1", name: "Alpha Inc.", logo: Logo, plan: "Free" },
  { id: "2", name: "Beta Corp.", logo: Logo, plan: "Free" },
  { id: "3", name: "Gamma Tech", logo: Logo, plan: "Free" },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between",
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              Medical Certificate
            </span>
          )}
        </Link>

        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={dashboardRoutes} />
      </SidebarContent>
      <SidebarFooter className="px-2">
        <TeamSwitcher teams={teams} />
      </SidebarFooter>
    </Sidebar>
  );
}
