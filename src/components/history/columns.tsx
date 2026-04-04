"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type CertificateHistory = {
  id: string;
  certNo: string;
  firstName: string;
  surname: string;
  contractorCompanyName: string;
  position: string;
  location: string;
  generatedAt: string | Date;
};

export const columns: ColumnDef<CertificateHistory>[] = [
  {
    accessorKey: "certNo",
    header: "Cert No",
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      return `${row.original.firstName} ${row.original.surname}`;
    },
  },
  {
    accessorKey: "contractorCompanyName",
    header: "Company",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "generatedAt",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.original.generatedAt), "do MMM, yyyy HH:mm");
    },
  },
];
