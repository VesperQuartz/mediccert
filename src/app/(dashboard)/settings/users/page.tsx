import { Suspense } from "react";
import { CreateUser } from "@/components/settings/create-user";
import { UsersTable } from "@/components/settings/users-table";

const UserSettings = () => {
  return (
    <div className="flex flex-col gap-4">
      <CreateUser />
      <Suspense fallback={<div>Loading...</div>}>
        <UsersTable />
      </Suspense>
    </div>
  );
};

export default UserSettings;
