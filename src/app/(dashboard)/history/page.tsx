import type { Metadata } from "next";
import { HistoryTable } from "@/components/history/history-table";

export const metadata: Metadata = {
  title: "History",
  description: "Certificate Generation History",
};

const HistoryPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold px-4 pt-4">Generation History</h1>
      <HistoryTable />
    </div>
  );
};

export default HistoryPage;
