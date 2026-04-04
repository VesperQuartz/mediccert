import { LucideBookDown, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentActivity } from "@/components/recent-activity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Overview",
};

const Home = async () => {
  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your certificates.
          </p>
        </div>
        <Link href="/generate">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Generate Certificate
          </Button>
        </Link>
      </div>

      <DashboardStats />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity />
        <Card className="col-span-4 lg:col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/generate" className="block">
              <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted transition-colors cursor-pointer">
                <div className="rounded-full bg-primary/10 p-2">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">New Certificate</p>
                  <p className="text-sm text-muted-foreground">
                    Create a new medical certificate for a contractor.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/history" className="block">
              <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted transition-colors cursor-pointer">
                <div className="rounded-full bg-chart-2/10 p-2">
                  <LucideBookDown className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="font-medium">View History</p>
                  <p className="text-sm text-muted-foreground">
                    Browse and search through all generated documents.
                  </p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
