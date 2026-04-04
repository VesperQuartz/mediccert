"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { orpc } from "@/lib/orpc";

export const RecentActivity = () => {
  const { data, isLoading } = useQuery(orpc.listHistory.queryOptions());

  if (isLoading) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_) => (
              <div
                key={crypto.randomUUID()}
                className="flex items-center gap-4"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recent = data?.slice(0, 5) || [];

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Certificates</CardTitle>
        <Link
          href="/history"
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No certificates generated yet.
            </p>
          ) : (
            recent.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {item.firstName} {item.surname}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.certNo} • {item.contractorCompanyName}
                  </p>
                </div>
                <div className="ml-auto font-medium text-xs text-muted-foreground">
                  {format(new Date(item.generatedAt), "MMM d, h:mm a")}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
