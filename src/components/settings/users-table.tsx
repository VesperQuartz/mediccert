import { headers } from "next/headers";
import { columns } from "@/components/settings/columns";
import { DataTable } from "@/components/settings/data-table";
import { auth } from "@/lib/auth";

export const UsersTable = async () => {
  const users = await auth.api.listUsers({
    query: {},
    headers: await headers(),
  });
  console.log(users);
  return (
    <div>
      <div className="container mx-auto">
        <DataTable columns={columns} data={users.users} />
      </div>
    </div>
  );
};
