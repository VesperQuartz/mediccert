"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/settings/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { orpc } from "@/lib/orpc";
import { columns } from "./columns";

export const HistoryTable = () => {
  const { data, isLoading, error } = useQuery(orpc.listHistory.queryOptions());

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-4">
        <Skeleton className="h-10 w-[250px]" />
        <div className="border rounded-md">
          <div className="h-10 border-b px-4 flex items-center gap-4">
            {[...Array(5)].map((_) => (
              <Skeleton key={crypto.randomUUID()} className="h-4 flex-1" />
            ))}
          </div>
          {[...Array(5)].map((_) => (
            <div
              key={crypto.randomUUID()}
              className="h-12 border-b px-4 flex items-center gap-4 last:border-0"
            >
              {[...Array(5)].map((_) => (
                <Skeleton key={crypto.randomUUID()} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-destructive">
        Failed to load history.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data || []} filterColumn="certNo" />
    </div>
  );
};
